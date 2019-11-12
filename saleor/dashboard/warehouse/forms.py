from django import forms

from saleor.account.models import Address
from saleor.warehouse.models import Warehouse


class WarehouseAddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = [
            "company_name",
            "street_address_1",
            "street_address_2",
            "city",
            "city_area",
            "postal_code",
            "country",
            "country_area",
            "phone",
        ]


class WarehouseForm(forms.ModelForm):
    class Meta:
        model = Warehouse
        fields = ["name", "email", "shipping_zones"]

    def save_with_address(self, address: Address, commit: bool = True):
        self.instance.address = address
        self.save(commit)
        return self.instance
