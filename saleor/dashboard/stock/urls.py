from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^(?P<stock_pk>[0-9]+)/delete/$", views.delete, name="stock-delete")
]
