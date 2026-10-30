from django.contrib import admin
from .models import PerfilUsuario

@admin.register(PerfilUsuario)
class PerfilUsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'alias', 'email', 'telefono')
    search_fields = ('nombre', 'alias', 'email')