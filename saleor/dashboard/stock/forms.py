from typing import TYPE_CHECKING

from django.forms import modelformset_factory

from ...stock.models import Stock

if TYPE_CHECKING:
    from ...product.models import ProductVariant

StockFormset = modelformset_factory(Stock, fields=["warehouse", "quantity"])


def get_stock_formset_for_variant(variant: "ProductVariant", data=None):
    qs = Stock.objects.filter(product_variant_id=variant.pk)
    return StockFormset(data, queryset=qs)
