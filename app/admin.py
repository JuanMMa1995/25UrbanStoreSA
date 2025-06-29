from django.contrib import admin
from .models import Marca, Tronco, Piernas, Zapatos, Complemento, Contacto, TrabajaConNosotros, SeSocio, Envio

class TroncoAdmin(admin.ModelAdmin):
    list_display = ["modelo", "precio", "cantidad", "nuevo", "marca"]
    list_editable = ["precio", "cantidad", "nuevo", "marca"]
    search_fields = ["modelo"]
    list_filter = ["marca", "nuevo"]
    list_per_page = 10

class PiernasAdmin(admin.ModelAdmin):
    list_display = ["modelo", "precio", "cantidad", "nuevo", "marca"]
    list_editable = ["precio", "cantidad", "nuevo", "marca"]
    search_fields = ["modelo"]
    list_filter = ["marca", "nuevo"]
    list_per_page = 10

class ZapatosAdmin(admin.ModelAdmin):
    list_display = ["modelo", "precio", "cantidad", "nuevo", "marca"]
    list_editable = ["precio", "cantidad", "nuevo", "marca"]
    search_fields = ["modelo"]
    list_filter = ["marca", "nuevo"]
    list_per_page = 10

class ComplementoAdmin(admin.ModelAdmin):
    list_display = ["modelo", "precio", "cantidad", "nuevo", "marca", "tipo"]
    list_editable = ["precio", "cantidad", "nuevo", "marca", "tipo"]
    search_fields = ["modelo"]
    list_filter = ["marca", "nuevo", "tipo"]
    list_per_page = 10

class ContactoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'email', 'fecha', 'leido']
    list_filter = ['leido', 'fecha']
    search_fields = ['nombre', 'email', 'mensaje']
    list_editable = ['leido']
    date_hierarchy = 'fecha'

class TrabajaConNosotrosAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'email', 'puesto', 'fecha', 'leido']
    list_filter = ['puesto', 'leido', 'fecha']
    search_fields = ['nombre', 'email', 'mensaje']
    list_editable = ['leido']
    date_hierarchy = 'fecha'
    readonly_fields = ['fecha']

class SeSocioAdmin(admin.ModelAdmin):
    list_display = ['nombre_marca', 'nombre', 'email', 'rubro', 'fecha', 'contacto']
    list_filter = ['rubro', 'contacto', 'fecha']
    search_fields = ['nombre_marca', 'nombre', 'email']
    list_editable = ['contacto']
    date_hierarchy = 'fecha'

class EnvioAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'ciudad', 'region', 'total_pagar', 'fecha']
    list_filter = ['region', 'fecha']
    search_fields = ['nombre', 'email']

admin.site.register(SeSocio, SeSocioAdmin)
admin.site.register(TrabajaConNosotros, TrabajaConNosotrosAdmin)
admin.site.register(Contacto, ContactoAdmin)
admin.site.register(Marca)
admin.site.register(Tronco, TroncoAdmin)
admin.site.register(Piernas, PiernasAdmin)
admin.site.register(Zapatos, ZapatosAdmin)
admin.site.register(Complemento, ComplementoAdmin)
admin.site.register(Envio, EnvioAdmin)