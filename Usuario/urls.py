from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_usuario, name='index_usuario'),
    path('catalogo/', views.catalogo_usuario, name='usuario_catalogo'),
    path('prestamos/', views.prestamos_usuario, name='usuario_prestamos'),
    path('historial/', views.historial_usuario, name='usuario_historial'),
    path('comunidad/', views.comunidad_usuario, name='usuario_comunidad'),
    path('perfil/', views.perfil_usuario, name='usuario_perfil'),
    path('registro/', views.registrar_usuario, name='registro_usuario'),
    path('login/', views.login_usuario, name='login'),
    path('login-admin/', views.login_admin, name='login_admin'),
    path('logout/', views.logout_view, name='logout'),
]