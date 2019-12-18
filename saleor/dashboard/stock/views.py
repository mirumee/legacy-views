from django.contrib import messages
from django.contrib.auth.decorators import permission_required
from django.shortcuts import get_object_or_404, redirect
from django.utils.translation import pgettext_lazy

from ...stock.models import Stock


@permission_required("stock.manage_stocks")
def delete(request, stock_pk):
    qs = Stock.objects.select_related("product_variant")
    stock = get_object_or_404(qs, pk=stock_pk)
    product_id = stock.product_variant.product_id
    stock.delete()
    msg = pgettext_lazy("Dashboard message", "Stock has been deleted")
    messages.success(request, msg)
    return redirect("dashboard:product-details", pk=product_id)
