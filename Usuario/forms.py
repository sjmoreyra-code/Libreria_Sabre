from django import forms
from django.contrib.auth.models import User
from .models import PerfilUsuario


class RegistroUsuarioForm(forms.ModelForm):
    """Formulario para crear un usuario de autenticación en Django."""
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Ingrese contraseña'}),
        label='Contraseña'
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Repita la contraseña'}),
        label='Confirmar Contraseña'
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
        labels = {
            'username': 'Nombre de Usuario',
            'email': 'Correo Electrónico',
            'first_name': 'Nombre',
            'last_name': 'Apellido',
        }
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. sabrina_m'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'ejemplo@correo.com'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Apellido'}),
        }


class EditarPerfilForm(forms.ModelForm):
    """Formulario para actualizar la información del perfil del cliente."""
    class Meta:
        model = PerfilUsuario
        fields = ['alias', 'telefono', 'direccion', 'avatar']
        labels = {
            'alias': 'Alias / Apodo',
            'telefono': 'Teléfono de Contacto',
            'direccion': 'Dirección de Domicilio',
            'avatar': 'URL de Imagen o Avatar',
        }
        widgets = {
            'alias': forms.TextInput(attrs={'class': 'form-control'}),
            'telefono': forms.TextInput(attrs={'class': 'form-control'}),
            'direccion': forms.TextInput(attrs={'class': 'form-control'}),
            'avatar': forms.TextInput(attrs={'class': 'form-control'}),
        }