from django.urls import path
from Administrador import views

urlpatterns = [
    # ==========================
    # PÁGINAS PRINCIPALES E INFORMATIVAS
    # ==========================
    path('', views.mostrar_index, name='index'),
    path('accesibilidad/', views.mostrar_accesibilidad, name='accesibilidad'),
    path('registro/', views.mostrar_registro, name='registro'),
    path('quienes-somos/', views.mostrar_quienes_somos, name='quienes_somos'),
    path('audiolibros/', views.mostrar_audiolibros, name='audiolibros'),
    path('braille/', views.mostrar_braille, name='braille'),
    path('talleres/', views.mostrar_talleres, name='talleres'),
    path('informatica/', views.mostrar_informatica, name='informatica'),

    # ==========================
    # GESTIÓN DE LIBROS
    # ==========================
    path('libros/', views.mostrar_libros, name='libros'),
    path('crear_libros/', views.crear_libro, name='crear_libros'),
    path('buscar-libros/', views.buscar_libros, name='buscar_libros'),
    path('editar-libro/<int:id>/', views.editar_libro, name='editar_libro'),
    path('eliminar-libro/<int:id>/', views.eliminar_libro, name='eliminar_libro'),

    # ==========================
    # GESTIÓN DE USUARIOS
    # ==========================
    path('usuarios/', views.mostrar_usuarios, name='usuarios'),
    path('crear_usuarios/', views.crear_usuario, name='crear_usuarios'),
    path('buscar-usuarios/', views.buscar_usuarios, name='buscar_usuarios'),
    path('editar-usuario/<int:id>/', views.editar_usuario, name='editar_usuario'),
    path('eliminar-usuario/<int:id>/', views.eliminar_usuario, name='eliminar_usuario'),

    # ==========================
    # GESTIÓN DE PRÉSTAMOS
    # ==========================
    path('prestamos/', views.mostrar_prestamos, name='prestamos'),
    path('crear_prestamos/', views.crear_prestamo, name='crear_prestamos'),
    path('editar-prestamo/<int:id>/', views.editar_prestamo, name='editar_prestamo'),
    path('eliminar-prestamo/<int:id>/', views.eliminar_prestamo, name='eliminar_prestamo'),
    path('registrar-devolucion/<int:id>/', views.registrar_devolucion, name='registrar_devolucion'),

    # --- Rutas existentes de Administrador ---
    path('libros/', views.mostrar_libros, name='libros'),
    path('prestamos/', views.mostrar_prestamos, name='prestamos'),
    # ... otras rutas que tengas ...

    # --- Ruta nueva de inicio de sesión de Administrador ---
    path('login-admin/', views.iniciar_sesion_admin, name='login_admin'),

    # Ruta del Login de Administrador
    path('login-admin/', views.iniciar_sesion_admin, name='login_admin'),

        # ==========================
    # PÁGINAS LEGALES
    # ==========================
    path(
        'politica-privacidad/',
        views.mostrar_politica_privacidad,
        name='politica_privacidad'
    ),
    path(
        'terminos-condiciones/',
        views.mostrar_terminos_condiciones,
        name='terminos_condiciones'
    ),
]

