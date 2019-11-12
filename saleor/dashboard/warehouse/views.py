from typing import TYPE_CHECKING, Optional

from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import permission_required
from django.shortcuts import get_object_or_404, redirect
from django.template.response import TemplateResponse
from django.utils.translation import pgettext_lazy

from saleor.account.models import Address
from saleor.core.utils import get_paginator_items
from saleor.dashboard.views import staff_member_required
from saleor.dashboard.warehouse.forms import WarehouseAddressForm, WarehouseForm
from saleor.warehouse.models import Warehouse

if TYPE_CHECKING:
    from uuid import UUID
    from django.http import HttpRequest, HttpResponse


@staff_member_required
@permission_required("warehouse.manage_warehouses")
def index(request: "HttpRequest") -> "HttpResponse":
    warehouses_qs = Warehouse.objects.all()
    warehouses = get_paginator_items(
        warehouses_qs, settings.DASHBOARD_PAGINATE_BY, request.GET.get("page")
    )
    ctx = {"warehouses": warehouses}
    return TemplateResponse(request, "dashboard/warehouse/list.html", ctx)


@staff_member_required
@permission_required("warehouse.manage_warehouses")
def warehouse_form(
    request: "HttpRequest", uuid: Optional["UUID"] = None
) -> "HttpResponse":
    if uuid is not None:
        qs = Warehouse.objects.select_related("address").prefetch_related(
            "shipping_zones"
        )
        warehouse = get_object_or_404(qs, pk=uuid)
        address = warehouse.address
    else:
        warehouse = Warehouse()
        address = Address()

    warehouse_form = WarehouseForm(request.POST or None, instance=warehouse)
    address_form = WarehouseAddressForm(request.POST or None, instance=address)
    if address_form.is_valid() and warehouse_form.is_valid():
        address = address_form.save()
        warehouse_form.save_with_address(address)

        if uuid is not None:
            msg = pgettext_lazy("Dashboard message", "Warehouse updated")
        else:
            msg = pgettext_lazy("Dashboard message", "Warehouse created")
        messages.success(request, msg)
        return redirect("dashboard:warehouse-detail", uuid=warehouse.uuid)
    ctx = {
        "warehouse": warehouse,
        "warehouse_form": warehouse_form,
        "address_form": address_form,
    }
    return TemplateResponse(request, "dashboard/warehouse/form.html", ctx)


@staff_member_required
@permission_required("warehouse.manage_warehouses")
def warehouse(request: "HttpRequest", uuid: "UUID") -> "HttpResponse":
    qs = Warehouse.objects.select_related("address").prefetch_related("shipping_zones")
    ctx = {"warehouse": get_object_or_404(qs, pk=uuid)}
    return TemplateResponse(request, "dashboard/warehouse/detail.html", ctx)


@staff_member_required
@permission_required("warehouse.manage_warehouses")
def warehouse_delete(request: "HttpRequest", uuid: "UUID") -> "HttpResponse":
    warehouse = get_object_or_404(Warehouse, pk=uuid)
    warehouse.delete()
    msg = pgettext_lazy("Dashboard message", "Warehouse deleted")
    messages.success(request, msg)
    return redirect("dashboard:warehouse-list")
