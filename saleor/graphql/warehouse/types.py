from graphene import relay

from saleor.graphql.core.connection import CountableDjangoObjectType
from saleor.warehouse import models


class Warehouse(CountableDjangoObjectType):
    class Meta:
        description = "Represents warehouse."
        model = models.Warehouse
        interfaces = [relay.Node]

    @staticmethod
    def resolve_shipping_zones(root: models.Warehouse, _info):
        return root.shipping_zones.all()
