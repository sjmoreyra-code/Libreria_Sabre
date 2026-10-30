from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .forms import RegistroUsuarioForm, EditarPerfilForm
from .models import PerfilUsuario


def registrar_usuario(request):
    """Procesa el registro con cifrado de clave y creación de PerfilUsuario."""
    if request.method == 'POST':
        form = RegistroUsuarioForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            password = form.cleaned_data.get('password')
            confirm_password = form.cleaned_data.get('confirm_password')

            if password != confirm_password:
                messages.error(request, 'Las contraseñas ingresadas no coinciden.')
                return render(request, 'Usuario/registro.html', {'form': form})

            # Cifrado seguro de la contraseña (Hashing)
            user.set_password(password)
            user.save()

            # Creación automática del PerfilUsuario enlazado al User (OneToOneField)
            PerfilUsuario.objects.create(
                usuario=user,
                nombre=f"{user.first_name} {user.last_name}".strip() or user.username,
                email=user.email,
                alias=user.username
            )

            messages.success(request, f'¡Cuenta creada con éxito para {user.username}! Ya puedes iniciar sesión.')
            return redirect('login')
    else:
        form = RegistroUsuarioForm()
    return render(request, 'Usuario/registro.html', {'form': form})


def iniciar_sesion(request):
    """Inicia la sesión del usuario mediante la cookie de sesión."""
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f'¡Bienvenido/a {username}!')
                return redirect('index')
            else:
                messages.error(request, 'Usuario o contraseña incorrectos.')
        else:
            messages.error(request, 'Datos de ingreso no válidos.')
    else:
        form = AuthenticationForm()
    return render(request, 'Usuario/login.html', {'form': form})


def cerrar_sesion(request):
    """Destruye la cookie de sesión del usuario actual."""
    logout(request)
    messages.info(request, 'Has cerrado sesión correctamente.')
    return redirect('index')


@login_required
def ver_perfil(request):
    """Permite visualizar y editar el perfil del usuario autenticado."""
    perfil, _ = PerfilUsuario.objects.get_or_create(usuario=request.user)
    if request.method == 'POST':
        # Uso de instance para conservar los datos existentes que no se modifiquen
        form = EditarPerfilForm(request.POST, instance=perfil)
        if form.is_valid():
            form.save()
            messages.success(request, 'Tu perfil fue actualizado correctamente.')
            return redirect('ver_perfil')
    else:
        form = EditarPerfilForm(instance=perfil)
    return render(request, 'Usuario/perfil.html', {'form': form, 'perfil': perfil})

# Login para Usuarios Normales
def login_usuario(request):
    if request.method == 'POST':
        username_req = request.POST.get('username')
        password_req = request.POST.get('password')
        user = authenticate(request, username=username_req, password=password_req)
        
        if user is not None:
            login(request, user)
            messages.success(request, f'Bienvenido/a {user.username}.')
            return redirect('index_usuario')
        else:
            messages.error(request, 'Usuario o contraseña incorrectos.')
    
    return render(request, 'Usuario/login.html')

# Login para Administradores
def login_admin(request):
    if request.method == 'POST':
        username_req = request.POST.get('username')
        password_req = request.POST.get('password')
        user = authenticate(request, username=username_req, password=password_req)
        
        if user is not None and user.is_staff:
            login(request, user)
            messages.success(request, 'Acceso concedido al panel de administración.')
            return redirect('/admin/')
        else:
            messages.error(request, 'Credenciales de administrador inválidas.')
            
    return render(request, 'Usuario/login.html')

# Vista de Cierre de Sesión
def logout_view(request):
    logout(request)
    messages.info(request, 'Has cerrado sesión correctamente.')
    return redirect('index')

def index_usuario(request):
    return render(request, 'Usuario/index_usuario.html')

def catalogo_usuario(request):
    return render(request, 'Usuario/catalogo.html')

def prestamos_usuario(request):
    return render(request, 'Usuario/prestamos.html')

def historial_usuario(request):
    return render(request, 'Usuario/historial.html')

def comunidad_usuario(request):
    return render(request, 'Usuario/comunidad.html')

from django.contrib.auth.decorators import login_required

@login_required
def perfil_usuario(request):
    return render(request, 'Usuario/perfil.html', {'usuario': request.user})