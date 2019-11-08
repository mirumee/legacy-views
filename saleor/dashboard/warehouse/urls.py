from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^$", views.index, name="warehouse-index"),
    url(r"^create$", views.warehouse_create, name="warehouse-create"),
]
