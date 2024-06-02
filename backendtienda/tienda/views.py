from django.shortcuts import render
from .serializer import *
from .models import *
from rest_framework import generics
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProductFilter
from rest_framework.pagination import PageNumberPagination

# Create your views here.

# View para la paginación

# La clase `ProductListPagination` configura la paginación para una lista de productos 
#con un tamaño de página de 1, un parámetro de consulta para el tamaño de página, y 
#un tamaño de página máximo de 100.

class ProductListPagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = 'page_size'
    max_page_size = 100

# View paginación de productos por categoria

# La clase `GrupoProductView` recupera una lista paginada de categorías con sus productos asociados
# usando una clase de paginación personalizada y serializadores en una vista API del marco REST de Django.

class GrupoProductView(APIView):
    pagination_class = ProductListPagination

    def get(self, request):
        categories = category.objects.all().order_by('name')
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(categories, request)

        paginated_data = []

        for cat in page:
            products = product.objects.filter(category = cat).order_by('name')
            serializer = ProductSerializer(products, many = True)
            paginated_data.append({
                'category': cat.name,
                'products': serializer.data
            })

        return paginator.get_paginated_response(paginated_data)
    
# View busqueda de producto por nombre

# Esta clase es Django ListAPIView para mostrar una lista de productos con capacidades de filtrado.
# usando DjangoFilterBackend.

class ProductBusquedaView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = product.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter