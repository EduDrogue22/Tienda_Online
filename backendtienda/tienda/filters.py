from django_filters import rest_framework as filters
from .models import product

# Filtro de busqueda de producto por nombre, para busqueda más exacta
# La clase `ProductFilter` es un Django FilterSet para filtrar productos por nombre.

class ProductFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='exact')

    class Meta:
        model = product
        fields = ['name']