import os

from django.core.exceptions import ImproperlyConfigured

from .settings import *

# Configuración exclusiva para producción
DEBUG = False

# La clave y los hosts se definen en el entorno del servidor.
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "")

if not SECRET_KEY:
    raise ImproperlyConfigured(
        "Falta configurar la variable de entorno DJANGO_SECRET_KEY."
    )

ALLOWED_HOSTS = [
    host.strip()
    for host in os.environ.get("DJANGO_ALLOWED_HOSTS", "").split(",")
    if host.strip()
]

if not ALLOWED_HOSTS:
    raise ImproperlyConfigured(
        "Falta configurar DJANGO_ALLOWED_HOSTS con el dominio del sitio."
    )

# Estas opciones se aplican cuando el sitio ya funciona con HTTPS.
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Activar HSTS después de confirmar que HTTPS funciona correctamente.
# No habilitarlo todavía sin conocer el dominio y el servidor.
SECURE_HSTS_SECONDS = 0
