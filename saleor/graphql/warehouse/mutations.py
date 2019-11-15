from saleor.account.models import Address
from saleor.graphql.core.mutations import ModelMutation
from saleor.graphql.warehouse.types import WarehouseInput
from saleor.warehouse import models


class WarehouseCreate(ModelMutation):
    class Arguments:
        input = WarehouseInput(
            required=True, description="Fields required to create warehouse."
        )

    class Meta:
        description = "Creates new warehouse."
        model = models.Warehouse
        permissions = ("warehouse.manage_warehouses",)

    @classmethod
    def create_address(cls, clean_data):
        address_fields = [
            "street_address_1",
            "street_address_2",
            "city",
            "city_area",
            "postal_code",
            "country",
            "country_area",
            "phone",
        ]
        address_data = {}
        for field in address_fields:
            field_value = clean_data.get(field)
            if field_value is not None:
                address_data[field] = field_value
        address = Address.objects.create(**address_data)
        return address

    @classmethod
    def clean_input(cls, info, instance, data, input_cls=None):
        cleaned_data = super().clean_input(info, instance, data, input_cls=input_cls)
        cleaned_data["address"] = cls.create_address(cleaned_data)
        return cleaned_data
