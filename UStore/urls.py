"""
URL configuration for UStore project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.conf import settings
from django.conf.urls.static import static
from app import views  # Importa views normalmente

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
    path('Usuarios/IniciarSesion/', views.IniciarSesion, name="IniciarSesion"),
    path('Usuarios/cerrar_sesion/', views.cerrar_sesion, name="cerrar_sesion"),
    path('carrito/', views.carrito, name='carrito'),
    path('update_cart/', views.update_cart, name='update_cart'),
    
    # Rutas protegidas con decoradores
    path('producto/Administracion/', 
        views.lider_urban_store_required(views.Administracion), 
        name="Administracion"),
    
    path('producto/agregar_producto/', 
        views.vendedor_urban_store_required(views.agregar_producto), 
        name="agregar_producto"),
    
    path('producto/agrega_marca/', 
        views.lider_urban_store_required(views.agrega_marca), 
        name="agrega_marca"),
    
    path('producto/modificar/', 
        views.lider_marca_required(views.modificar), 
        name="modificar"),
    
    path('producto/eliminar/', 
        views.lider_marca_required(views.eliminar), 
        name="eliminar"),
    
    path('Usuarios/Admin_User/', 
        views.lider_urban_store_required(views.Admin_User), 
        name="Admin_User"),

    path('Ventas/Envio/', views.envio_view, name="Envio"),
    path('Ventas/Pago/', views.pago_view, name="Pago"),
    path('commit-pay/', views.commit_pay_view, name="commit_pay"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)