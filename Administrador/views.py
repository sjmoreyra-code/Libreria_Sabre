from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.utils import timezone
from .models import Libros, Prestamos
from .forms import CrearLibrosForm, CrearPrestamosForm
from Usuario.models import PerfilUsuario
from django.contrib.admin.views.decorators import staff_member_required


# ==========================
# PÁGINAS PRINCIPALES E INFORMATIVAS
# ==========================

def mostrar_index(request):
    libros = Libros.objects.all()
    return render(request, 'Administrador/index.html', {'libros': libros})

def mostrar_accesibilidad(request):
    return render(request, 'Administrador/accesibilidad.html')

def mostrar_registro(request):
    return render(request, 'Administrador/registro.html')

def mostrar_quienes_somos(request):
    return render(request, 'Administrador/quienes_somos.html')

def mostrar_audiolibros(request):
    return render(request, 'Administrador/audiolibros.html')

def mostrar_braille(request):
    return render(request, 'Administrador/braille.html')

def mostrar_talleres(request):
    return render(request, 'Administrador/talleres.html')

def mostrar_informatica(request):
    return render(request, 'Administrador/informatica.html')


# ==========================
# GESTIÓN DE LIBROS
# ==========================

def mostrar_libros(request):
    libros = Libros.objects.all()
    return render(request, 'Administrador/libros.html', {'libros': libros})

@staff_member_required
def crear_libro(request):
    if request.method == 'POST':
        form = CrearLibrosForm(request.POST)
        if form.is_valid():
            libro = form.save()
            messages.success(request, f'El libro "{libro.titulo_libro}" fue creado con éxito.')
            return redirect('libros')
    else:
        form = CrearLibrosForm()
    return render(request, 'Administrador/crear_libro.html', {'form': form})

@staff_member_required
def editar_libro(request, id):
    libro = get_object_or_404(Libros, id=id)
    if request.method == 'POST':
        form = CrearLibrosForm(request.POST, instance=libro)
        if form.is_valid():
            form.save()
            messages.success(request, f'El libro "{libro.titulo_libro}" fue actualizado correctamente.')
            return redirect('libros')
    else:
        form = CrearLibrosForm(instance=libro)
    return render(request, 'Administrador/actualizar_libro.html', {'form': form, 'libro': libro})

@staff_member_required
def eliminar_libro(request, id):
    libro = get_object_or_404(Libros, id=id)
    if request.method == 'POST':
        titulo = libro.titulo_libro
        libro.delete()
        messages.warning(request, f'El libro "{titulo}" fue eliminado correctamente.')
        return redirect('libros')
    return render(request, 'Administrador/eliminar_libro.html', {'libro': libro})

def buscar_libros(request):
    query = request.GET.get('q', '').strip()
    libros = []
    respuesta = ""

    if query:
        libros = Libros.objects.filter(titulo_libro__icontains=query)
        if not libros.exists():
            respuesta = f'No se encontraron libros que coincidan con "{query}".'
    else:
        respuesta = 'Ingrese un título o palabra clave para realizar la búsqueda.'

    return render(request, 'Administrador/buscar_libros.html', {
        'libros': libros,
        'query': query,
        'respuesta': respuesta
    })


# ==========================
# GESTIÓN DE USUARIOS
# ==========================

def mostrar_usuarios(request):
    usuarios = PerfilUsuario.objects.all()
    return render(request, 'Administrador/usuarios.html', {'usuarios': usuarios})

def crear_usuario(request):
    return render(request, 'Administrador/crear_usuario.html')

def editar_usuario(request, id):
    usuario = get_object_or_404(PerfilUsuario, id=id)
    return render(request, 'Administrador/actualizar_usuario.html', {'usuario': usuario})

def eliminar_usuario(request, id):
    usuario = get_object_or_404(PerfilUsuario, id=id)
    if request.method == 'POST':
        alias = usuario.alias
        usuario.delete()
        messages.warning(request, f'El usuario "{alias}" fue eliminado correctamente.')
        return redirect('usuarios')
    return render(request, 'Administrador/eliminar_usuario.html', {'usuario': usuario})

def buscar_usuarios(request):
    query = request.GET.get('q', '').strip()
    usuarios = []
    if query:
        usuarios = PerfilUsuario.objects.filter(alias__icontains=query)
    return render(request, 'Administrador/buscar_usuarios.html', {'usuarios': usuarios, 'query': query})


# ==========================
# GESTIÓN DE PRÉSTAMOS
# ==========================

def mostrar_prestamos(request):
    # Trae todos los registros de la tabla Prestamos (CRUD - READ)[cite: 5, 7]
    prestamos = Prestamos.objects.all()
    context = {'prestamos': prestamos}
    return render(request, 'Administrador/prestamos.html', context)

@staff_member_required
def crear_prestamo(request):
    if request.method == 'POST':
        form = CrearPrestamosForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'El préstamo se registró correctamente.')
            return redirect('prestamos')
    else:
        form = CrearPrestamosForm()
    return render(request, 'Administrador/crear_prestamos.html', {'form': form})

@staff_member_required
def editar_prestamo(request, id):
    prestamo = get_object_or_404(Prestamos, id=id)
    if request.method == 'POST':
        # Uso de instance para actualizar el registro existente[cite: 8]
        form = CrearPrestamosForm(request.POST, instance=prestamo)
        if form.is_valid():
            form.save()
            messages.success(request, 'El préstamo se actualizó correctamente.')
            return redirect('prestamos')
    else:
        form = CrearPrestamosForm(instance=prestamo)
    return render(request, 'Administrador/actualizar_prestamo.html', {'form': form, 'prestamo': prestamo})

@staff_member_required
def eliminar_prestamo(request, id):
    prestamo = get_object_or_404(Prestamos, id=id)
    if request.method == 'POST':
        prestamo.delete()
        messages.warning(request, 'El registro de préstamo fue eliminado.')
        return redirect('prestamos')
    return render(request, 'Administrador/eliminar_prestamo.html', {'prestamo': prestamo})

@staff_member_required
def registrar_devolucion(request, id):
    prestamo = get_object_or_404(Prestamos, id=id)
    prestamo.fecha_devolucion_real = timezone.now().date()
    prestamo.save()
    messages.success(request, f'Se registró la devolución del libro "{prestamo.libro.titulo_libro}".')
    return redirect('prestamos')

def iniciar_sesion_admin(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect('libros')

    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)

            if user is not None and user.is_staff:
                login(request, user)
                messages.success(request, f'¡Bienvenido/a Administrador/a {username}!')
                return redirect('libros')
            else:
                messages.error(request, 'Acceso denegado: Esta cuenta no posee permisos de administrador.')
        else:
            messages.error(request, 'Usuario o contraseña de administrador incorrectos.')
    else:
        form = AuthenticationForm()

    return render(request, 'Administrador/login_admin.html', {'form': form})

# ==========================
# PÁGINAS LEGALES
# ==========================

# Política de Privacidad - Ley N.º 25.326
def mostrar_politica_privacidad(request):
    return render(
        request,
        'Administrador/politica_privacidad.html'
    )


# Términos y Condiciones
def mostrar_terminos_condiciones(request):
    return render(
        request,
        'Administrador/terminos_condiciones.html'
    )