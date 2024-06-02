from rest_framework import serializers
from .models import *

# Serializador de category

# La clase `CategorySerializer` es un serializador del marco REST de Django para el modelo `category` con
# todos los campos incluidos.

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = category
        fields = '__all__'

# Serializador de product

# Esta clase de Python define un serializador para el modelo de Producto con el campo adicional 'category_name'
# procedente del campo de nombre del modelo de categoría relacionado.

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source = 'category.name', read_only = True)

    class Meta:
        model = product
        fields = ['id', 'name', 'url_image', 'price', 'discount', 'category_name']
        extra_kwarg = {'id': {"read_only": True}}