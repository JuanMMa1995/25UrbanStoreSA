# Generated by Django 5.2.3 on 2025-06-28 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_trabajaconnosotros'),
    ]

    operations = [
        migrations.CreateModel(
            name='SeSocio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('rut_comercial', models.CharField(max_length=20)),
                ('nombre_marca', models.CharField(max_length=100)),
                ('rubro', models.CharField(choices=[('ROP', 'Ropa'), ('CAL', 'Calzado'), ('ACC', 'Accesorios'), ('DEP', 'Deportes'), ('OTR', 'Otros')], max_length=3)),
                ('descripcion', models.TextField()),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('contacto', models.BooleanField(default=False)),
            ],
        ),
    ]
