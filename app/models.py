from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.db import models
import datetime

GENERO_CHOICES = [
    ('HOM', 'Hombre'),
    ('MUJ', 'Mujer'),
    ('UNI', 'Unisex'),
]

COLOR_CHOICES = [
    ('NEG', 'Negro'),
    ('BLN', 'Blanco'),
    ('GRS', 'Gris'),
    ('AZM', 'Azul marino'),
    ('BEI', 'Beige'),
    ('ROJ', 'Rojo'),
    ('VDO', 'Verde oliva'),
    ('MAR', 'Marrón'),
    ('AZC', 'Azul claro'),
    ('ROS', 'Rosado'),
]

# Subcategorías para cada tipo de producto
SUBCATEGORIA_TRONCO = [
    ('POL', 'Poleras'),
    ('PLN', 'Poleron'),
    ('CAM', 'Camisas'),
]

SUBCATEGORIA_PIERNAS = [
    ('JEA', 'Jeans'),
    ('BUS', 'Buso'),
    ('SHT', 'Short'),
    ('FAL', 'Falda'),
    ('VES', 'Vestidos'),
]

SUBCATEGORIA_ZAPATOS = [
    ('ZAP', 'Zapatillas'),
    ('BOT', 'Botos'),
    ('SAN', 'Sandalias'),
    ('MOC', 'Mocasines'),
    ('PAN', 'Pantuflas'),
]

class Marca(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Tronco(models.Model):  # Antes: Torso
    modelo = models.CharField(max_length=50, default='', blank=True)
    precio = models.IntegerField()
    descripcion = models.TextField()
    nuevo = models.BooleanField()
    marca = models.ForeignKey(Marca, on_delete=models.PROTECT)
    imagen = models.ImageField(upload_to="productos", null=True)
    cantidad = models.PositiveIntegerField(default=0) 
    genero = models.CharField(max_length=3, choices=GENERO_CHOICES, default='UNI')
    color = models.CharField(max_length=3, choices=COLOR_CHOICES, default='NEG')
    subcategoria = models.CharField(max_length=3, choices=SUBCATEGORIA_TRONCO, default='POL')
    def __str__(self):
        return self.modelo

class Piernas(models.Model):  # Antes: Pantalones
    modelo = models.CharField(max_length=50, default='', blank=True)
    precio = models.IntegerField()
    descripcion = models.TextField()
    nuevo = models.BooleanField()
    marca = models.ForeignKey(Marca, on_delete=models.PROTECT)
    imagen = models.ImageField(upload_to="productos", null=True)
    cantidad = models.PositiveIntegerField(default=0)
    genero = models.CharField(max_length=3, choices=GENERO_CHOICES, default='UNI')
    color = models.CharField(max_length=3, choices=COLOR_CHOICES, default='NEG')
    subcategoria = models.CharField(max_length=3, choices=SUBCATEGORIA_PIERNAS, default='JEA')
    def __str__(self):
        return self.modelo

class Zapatos(models.Model):  # Antes: Calzado
    modelo = models.CharField(max_length=50, default='', blank=True)
    precio = models.IntegerField()
    descripcion = models.TextField()
    nuevo = models.BooleanField()
    marca = models.ForeignKey(Marca, on_delete=models.PROTECT)
    imagen = models.ImageField(upload_to="productos", null=True)
    cantidad = models.PositiveIntegerField(default=0)
    genero = models.CharField(max_length=3, choices=GENERO_CHOICES, default='UNI')
    color = models.CharField(max_length=3, choices=COLOR_CHOICES, default='NEG')
    subcategoria = models.CharField(max_length=3, choices=SUBCATEGORIA_ZAPATOS, default='ZAP')
    def __str__(self):
        return self.modelo

class Complemento(models.Model):  # Antes: Accesorios
    TIPO_ACCESORIO = [
        ('REL', 'Reloj'),
        ('BUF', 'Bufanda'),
        ('CIN', 'Cinturón'),
        ('COL', 'Collar'),
        ('GOR', 'Gorra'),
        ('PUL', 'Pulseras'),
    ]
    
    modelo = models.CharField(max_length=50, default='', blank=True)
    precio = models.IntegerField()
    descripcion = models.TextField()
    nuevo = models.BooleanField()
    marca = models.ForeignKey(Marca, on_delete=models.PROTECT)
    tipo = models.CharField(max_length=3, choices=TIPO_ACCESORIO, default='REL')
    imagen = models.ImageField(upload_to="productos", null=True)
    cantidad = models.PositiveIntegerField(default=0)
    genero = models.CharField(max_length=3, choices=GENERO_CHOICES, default='UNI')
    color = models.CharField(max_length=3, choices=COLOR_CHOICES, default='NEG')
    
    def __str__(self):
        return self.modelo

class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=20, blank=True, null=True)
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    leido = models.BooleanField(default=False)

    def __str__(self):
        return f"Mensaje de {self.nombre} - {self.fecha.strftime('%d/%m/%Y %H:%M')}"
    
class TrabajaConNosotros(models.Model):
    PUESTO_CHOICES = [
        ('VEN', 'Vendedor'),
        ('LID', 'Líder de Equipo'),
    ]
    
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    puesto = models.CharField(max_length=3, choices=PUESTO_CHOICES)
    mensaje = models.TextField()
    cv = models.FileField(upload_to="cvs/")
    fecha = models.DateTimeField(auto_now_add=True)
    leido = models.BooleanField(default=False)

    def __str__(self):
        return f"Solicitud de {self.nombre} para {self.get_puesto_display()} - {self.fecha.strftime('%d/%m/%Y')}"

class SeSocio(models.Model):
    RUBRO_CHOICES = [
        ('ROP', 'Ropa'),
        ('CAL', 'Calzado'),
        ('ACC', 'Accesorios'),
        ('DEP', 'Deportes'),
        ('OTR', 'Otros'),
    ]
    
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    rut_comercial = models.CharField(max_length=20)
    nombre_marca = models.CharField(max_length=100)
    rubro = models.CharField(max_length=3, choices=RUBRO_CHOICES)
    descripcion = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    contacto = models.BooleanField(default=False)

    def __str__(self):
        return f"Solicitud de {self.nombre_marca} por {self.nombre}"
    
class Envio(models.Model):
    REGION_CHOICES = [
        ('RM', 'Región Metropolitana de Santiago'),
        ('I', 'Región de Tarapacá'),
        ('II', 'Región de Antofagasta'),
        ('III', 'Región de Atacama'),
        ('IV', 'Región de Coquimbo'),
        ('V', 'Región de Valparaíso'),
        ('VI', 'Región de O’Higgins'),
        ('VII', 'Región del Maule'),
        ('VIII', 'Región del Biobío'),
        ('IX', 'Región de La Araucanía'),
        ('XIV', 'Región de Los Ríos'),
        ('X', 'Región de Los Lagos'),
        ('XI', 'Región de Aysén'),
        ('XII', 'Región de Magallanes'),
        ('XV', 'Región de Arica y Parinacota'),
        ('XVI', 'Región de Ñuble'),
    ]
    
    COSTOS_ENVIO = {
        'RM': 3000,
        'I': 13000,
        'II': 14000,
        'III': 11000,
        'IV': 8000,
        'V': 4000,
        'VI': 5000,
        'VII': 6000,
        'VIII': 7000,
        'IX': 9000,
        'XIV': 10000,
        'X': 12000,
        'XI': 15000,
        'XII': 16000,
        'XV': 14500,
        'XVI': 7000,
    }

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    ciudad = models.CharField(max_length=100)
    region = models.CharField(max_length=4, choices=REGION_CHOICES)
    codigo_postal = models.CharField(max_length=10)
    telefono = models.CharField(max_length=20)
    email = models.EmailField()
    monto_carrito = models.IntegerField()
    costo_envio = models.IntegerField()
    total_pagar = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Envío a {self.nombre} - {self.get_region_display()}"
    
    def calcular_costo_envio(self):
        return self.COSTOS_ENVIO.get(self.region, 0)