from django.db import models
from django.contrib.auth.models import User


class PerfilUsuario(models.Model):
    # Relación Uno a Uno para extender el usuario de autenticación de Django
    usuario = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='perfil',
        null=True,
        blank=True
    )
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    alias = models.CharField(max_length=50)
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=150)
    avatar = models.CharField(max_length=200, blank=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.alias} ({self.nombre})"