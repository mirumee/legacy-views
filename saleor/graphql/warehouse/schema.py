import graphene

from saleor.graphql.decorators import permission_required
from saleor.graphql.warehouse.types import Warehouse


class WarehouseQueries(graphene.ObjectType):
    warehouse = graphene.Field(
        Warehouse,
        description="Look up an order by ID",
        id=graphene.Argument(
            graphene.ID, description="ID of an warehouse", required=True
        ),
    )

    @permission_required("warehouse.manage_warehouses")
    def resolve_warehouse(self, _info, **data):
        user = _info.context.user
        warehouse_pk = data.get("id")
        warehouse = graphene.Node.get_node_from_global_id(
            _info, warehouse_pk, Warehouse
        )
        if user.has_perm("warehouse.manage_warehouses"):
            return warehouse
        return None
