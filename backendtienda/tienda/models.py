from django.db import models

# Create your models here.

# Tabla category

# La clase "category" define un modelo con campos para id y name, y 
# especifica la tabla de la base de datos el nombre como 'category'.

class category(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=150)

    class Meta:
        db_table = 'category'

# Tabla product

# La clase "product" define un modelo con campos para id, name, 
# URL_imagen, price, discount y unión con la tabla "category" y 
# especifiva la tabla de la base de datos el nombre como "product"

class product(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=150)
    url_image = models.TextField()
    price = models.FloatField()
    discount = models.IntegerField()
    category = models.ForeignKey(category, on_delete=models.SET_NULL, null = True, blank = True, db_column = 'category')

    class Meta:
        db_table = 'product'