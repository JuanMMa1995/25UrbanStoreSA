# forms.py
from django import forms
from .models import Marca, Tronco, Piernas, Zapatos, Complemento, Contacto, GENERO_CHOICES, COLOR_CHOICES, SUBCATEGORIA_TRONCO, SUBCATEGORIA_PIERNAS, SUBCATEGORIA_ZAPATOS, TrabajaConNosotros, SeSocio, Envio
from django.contrib.auth.forms import UserCreationForm
import datetime

class MarcaForm(forms.ModelForm):
    class Meta:
        model = Marca
        fields = ['nombre']
        widgets = {
            'nombre': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ingrese el nombre de la marca'
            }),
        }

class ProductoForm(forms.Form):
    TIPO_PRODUCTO = [
        ('Tronco', 'Torso'),
        ('Piernas', 'Pantalones'),
        ('Zapatos', 'Calzado'),
        ('Complemento', 'Accesorios'),
    ]
    
    tipo = forms.ChoiceField(
        choices=TIPO_PRODUCTO,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Tipo de Producto'
    )
    
    modelo = forms.CharField(
        max_length=50,
        required=False,
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        label='Modelo'
    )
    
    precio = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control'}),
        label='Precio'
    )
    
    descripcion = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        label='Descripción'
    )
    
    nuevo = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        label='¿Es nuevo?'
    )
    
    marca = forms.ModelChoiceField(
        queryset=Marca.objects.all(),
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Marca'
    )
    
    imagen = forms.ImageField(
        required=False,
        widget=forms.FileInput(attrs={'class': 'form-control'}),
        label='Imagen'
    )
    
    tipo_accesorio = forms.ChoiceField(
        choices=Complemento.TIPO_ACCESORIO,
        required=False,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Tipo de Accesorio'
    )

    cantidad = forms.IntegerField(
        min_value=0,
        widget=forms.NumberInput(attrs={'class': 'form-control'}),
        label='Cantidad en stock',
        initial=0
    )
    genero = forms.ChoiceField(
        choices=GENERO_CHOICES,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Género',
        initial='UNI'
    )
    
    color = forms.ChoiceField(
        choices=COLOR_CHOICES,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Color',
        initial='NEG'
    )
    
    # Campos para subcategorías (condicionales)
    subcategoria_tronco = forms.ChoiceField(
        choices=SUBCATEGORIA_TRONCO,
        required=False,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Subcategoría'
    )
    
    subcategoria_piernas = forms.ChoiceField(
        choices=SUBCATEGORIA_PIERNAS,
        required=False,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Subcategoría'
    )
    
    subcategoria_zapatos = forms.ChoiceField(
        choices=SUBCATEGORIA_ZAPATOS,
        required=False,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Subcategoría'
    )

class ContactoForm(forms.ModelForm):
    class Meta:
        model = Contacto
        fields = ['nombre', 'email', 'telefono', 'mensaje']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}), 
            'telefono': forms.TextInput(attrs={'class': 'form-control'}),
            'mensaje': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
        }

class TrabajaConNosotrosForm(forms.ModelForm):
    class Meta:
        model = TrabajaConNosotros
        fields = ['nombre', 'email', 'telefono', 'puesto', 'mensaje', 'cv']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre completo'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Correo electrónico'}),
            'telefono': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Teléfono'}),
            'puesto': forms.Select(attrs={'class': 'form-select'}),
            'mensaje': forms.Textarea(attrs={'class': 'form-control', 'rows': 4, 'placeholder': 'Cuéntanos por qué quieres trabajar con nosotros...'}),
            'cv': forms.FileInput(attrs={'class': 'form-control', 'accept': '.pdf,.doc,.docx'})
        }
        labels = {
            'cv': 'Curriculum Vitae (PDF o Word)'
        }

class SeSocioForm(forms.ModelForm):
    class Meta:
        model = SeSocio
        fields = ['nombre', 'email', 'rut_comercial', 'nombre_marca', 'rubro', 'descripcion']
        widgets = {
            'nombre': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nombre completo'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Correo electrónico'
            }),
            'rut_comercial': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'RUT comercial (ej: 12.345.678-9)'
            }),
            'nombre_marca': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nombre de tu marca'
            }),
            'rubro': forms.Select(attrs={
                'class': 'form-select'
            }),
            'descripcion': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Describe los productos que vendes, tu experiencia, etc...'
            }),
        }
        labels = {
            'nombre_marca': 'Nombre de la Marca',
            'rut_comercial': 'RUT Comercial',
        }
        
class EnvioForm(forms.ModelForm):
    class Meta:
        model = Envio
        fields = ['nombre', 'direccion', 'ciudad', 'region', 'codigo_postal', 'telefono', 'email']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'direccion': forms.TextInput(attrs={'class': 'form-control'}),
            'ciudad': forms.TextInput(attrs={'class': 'form-control'}),
            'region': forms.Select(attrs={'class': 'form-control', 'id': 'region-select'}),
            'codigo_postal': forms.TextInput(attrs={'class': 'form-control'}),
            'telefono': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
        }        