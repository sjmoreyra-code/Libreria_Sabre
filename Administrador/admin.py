from django.contrib import admin
from .models import Libros, Prestamos

@admin.register(Libros)
class LibrosAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo_libro', 'autor', 'anio', 'genero_categoria', 'disponibilidad')
    search_fields = ('titulo_libro', 'autor', 'isbn')
    list_filter = ('disponibilidad', 'genero_categoria')

@admin.register(Prestamos)
class PrestamosAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'libro', 'fecha_prestamo', 'fecha_devolucion_prevista', 'fecha_devolucion_real')
    search_fields = ('usuario__alias', 'libro__titulo_libro')
    list_filter = ('fecha_prestamo', 'fecha_devolucion_prevista')

