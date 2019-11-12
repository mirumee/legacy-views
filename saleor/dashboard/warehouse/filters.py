# from django import forms
# from django.db.models import Q
from django.utils.translation import pgettext_lazy

from ...core.filters import SortedFilterSet

# from django_filters import CharFilter

# from saleor.warehouse.models import Warehouse


SORT_BY_FIELDS = ("name", "name")

SORT_BY_FIELDS_LABELS = {
    "name": pgettext_lazy("Warehouse list sorting option", "warehouse")
}

IS_ACTIVE_CHOICES = (
    ("1", pgettext_lazy("Is active filter choice", "Active")),
    ("0", pgettext_lazy("Is active filter choice", "Not active")),
)


class WarehouseFilter(SortedFilterSet):
    pass
