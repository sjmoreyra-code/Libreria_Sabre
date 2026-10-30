from django import forms
from .models import Libros, Prestamos
from Usuario.models import PerfilUsuario


class CrearLibrosForm(forms.ModelForm):
    class Meta:
        model = Libros
        fields = [
            'titulo_libro',
            'autor',
            'anio',
            'genero_categoria',
            'editorial',
            'isbn',
            'disponibilidad'
        ]
        labels = {
            'titulo_libro': 'Título del Libro',
            'autor': 'Autor',
            'anio': 'Año de Publicación',
            'genero_categoria': 'Género / Categoría',
            'editorial': 'Editorial',
            'isbn': 'ISBN',
            'disponibilidad': 'Disponible',
        }
        widgets = {
            'titulo_libro': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. Cien años de soledad'}),
            'autor': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. Gabriel García Márquez'}),
            'anio': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Ej. 1967'}),
            'genero_categoria': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. Novela'}),
            'editorial': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. Sudamericana'}),
            'isbn': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. 978-0307474728'}),
            'disponibilidad': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }


class CrearPrestamosForm(forms.ModelForm):
    class Meta:
        model = Prestamos
        fields = [
            'usuario',
            'libro',
            'fecha_prestamo',
            'fecha_devolucion_prevista'
        ]
        labels = {
            'usuario': 'Usuario (Perfil)',
            'libro': 'Libro',
            'fecha_prestamo': 'Fecha de Préstamo',
            'fecha_devolucion_prevista': 'Fecha Prevista de Devolución',
        }
        widgets = {
            'usuario': forms.Select(attrs={'class': 'form-select'}),
            'libro': forms.Select(attrs={'class': 'form-select'}),
            'fecha_prestamo': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'fecha_devolucion_prevista': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        }