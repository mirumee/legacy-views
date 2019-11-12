import uuid

from django.db import models
from django.utils.translation import pgettext_lazy

from saleor.account.models import Address
from saleor.shipping.models import ShippingZone


class Warehouse(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(
        pgettext_lazy("Warehouse field description", "Warehouse name"), max_length=50
    )
    company_name = models.CharField(
        pgettext_lazy("Warehouse field description", "Legal company name"),
        max_length=100,
    )

    shipping_zones = models.ManyToManyField(ShippingZone)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

    email = models.EmailField(
        pgettext_lazy("Warehouse field description", "Email address"),
        blank=True,
        default="",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("-name",)
        permissions = (
            (
                "manage_warehouses",
                pgettext_lazy("Permission description", "Manage warehouses."),
            ),
        )
