# Generated by Django 5.0.6 on 2024-05-30 16:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tienda', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(blank=True, db_column='category', null=True, on_delete=django.db.models.deletion.SET_NULL, to='tienda.category'),
        ),
    ]
