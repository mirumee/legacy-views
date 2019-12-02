import graphene

from saleor.stock.models import Stock
from tests.api.utils import assert_no_permission, get_graphql_content

MUTATION_CREATE_STOCK = """
mutation createStock($input: StockInput!) {
    createStock(input: $input) {
        errors {
            field
            message
        }
        stock {
            id
            quantity
            quantityAllocated
        }
    }
}
"""


def test_stock_cannot_be_created_without_permission(
    staff_api_client, variant, warehouse
):
    assert not staff_api_client.user.has_perm("stock.manage_stocks")
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    warehouse_id = graphene.Node.to_global_id("Warehouse", warehouse.id)
    variables = {
        "input": {
            "warehouse": warehouse_id,
            "productVariant": variant_id,
            "quantity": 100,
            "quantityAllocated": 23,
        }
    }

    response = staff_api_client.post_graphql(MUTATION_CREATE_STOCK, variables=variables)
    assert_no_permission(response)


def test_create_stock_mutation(
    staff_api_client, variant, warehouse, permission_manage_stocks
):
    staff_api_client.user.user_permissions.add(permission_manage_stocks)
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.pk)
    warehouse_id = graphene.Node.to_global_id("Warehouse", warehouse.id)
    old_stock_count = Stock.objects.count()

    variables = {
        "input": {
            "productVariant": variant_id,
            "warehouse": warehouse_id,
            "quantity": 100,
            "quantityAllocated": 27,
        }
    }
    response = staff_api_client.post_graphql(MUTATION_CREATE_STOCK, variables)
    content = get_graphql_content(response)
    assert Stock.objects.count() == old_stock_count + 1
    content_errors = content["data"]["createStock"]["errors"]
    assert len(content_errors) == 0
