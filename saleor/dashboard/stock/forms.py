from typing import TYPE_CHECKING

from django import forms

from ...stock.models import Stock

if TYPE_CHECKING:
    from ...product.models import ProductVariant


class StockForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = ["warehouse", "quantity", "id"]

    def __init__(self, *args, **kwargs):
        self.variant = kwargs.pop("variant")
        super().__init__(*args, **kwargs)

    def save(self, commit=True):
        instance = super().save(commit=False)
        instance.product_variant = self.variant
        if commit:
            instance.save()
        return instance


StockFormset = forms.modelformset_factory(Stock, form=StockForm)


def get_stock_formset_for_variant(variant: "ProductVariant", data=None):
    qs = Stock.objects.filter(product_variant_id=variant.pk)
    return StockFormset(data, queryset=qs, form_kwargs={"variant": variant})
