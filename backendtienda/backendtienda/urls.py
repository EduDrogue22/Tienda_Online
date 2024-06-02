"""
URL configuration for backendtienda project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from tienda.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Páginas de la API

    # La línea `path('api/', include("tienda.urls"))` en la lista de urlpatterns incluye la URL
    # patrones definidos en el módulo `tienda.urls` bajo la ruta `/api/`. Esto significa que cualquier URL
    # patrones definidos en el módulo `tienda.urls` serán accesibles bajo la ruta `/api/` en el
    # proyecto. Esta es una forma de organizar y modularizar el enrutamiento de URL en proyectos de Django.

    path('api/', include("tienda.urls")),
]
