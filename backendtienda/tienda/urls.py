from django.urls import path
from rest_framework.documentation import include_docs_urls
from tienda import views

urlpatterns = [
    # Página de documentación

    # La línea `path('docs/', include_docs_urls(title = "Tienda API")),` define un patrón de URL en
    # una aplicación Django. Cuando un usuario navega a la URL `/docs/`, Django generará el resultado
    # de la documentación generada por la función `include_docs_urls` con el título "Tienda API". Este
    # proporciona una forma de acceder a la documentación de Tienda API a través de la ruta URL especificada.

    path('docs/', include_docs_urls(title = "Tienda API")),

    # Página de productos por categoría

    # Esta línea de código define un patrón de URL para acceder a una vista llamada `GrupoProductView` en
    # la aplicación Django. Cuando un usuario navega a la URL `productos/`, Django renderizará la
    # salida de la vista `GrupoProductView`. El parámetro `name="product"` está asignando un nombre a
    # este patrón de URL, que puede usarse para hacer referencia a este patrón de URL específico en Django
    # plantillas o código.

    path('productos/', views.GrupoProductView.as_view(), name = "product"),

    # Página de busqueda de producto

    # La línea `path('buscar/', views.ProductBusquedaView.as_view(), nombre = "product-busqueda"),` en
    # Django urlpatterns define un patrón de URL para acceder a una vista llamada
    #`ProductoBusquedaView`.

    path('buscar/', views.ProductBusquedaView.as_view(), name = "product-busqueda"),

]