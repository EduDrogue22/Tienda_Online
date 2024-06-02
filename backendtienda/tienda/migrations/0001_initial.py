# Generated by Django 5.0.6 on 2024-05-29 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=150)),
            ],
            options={
                'db_table': 'category',
            },
        ),
        migrations.CreateModel(
            name='product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=150)),
                ('url_image', models.TextField()),
                ('price', models.FloatField()),
                ('discount', models.IntegerField()),
                ('category', models.IntegerField()),
            ],
            options={
                'db_table': 'product',
            },
        ),
    ]