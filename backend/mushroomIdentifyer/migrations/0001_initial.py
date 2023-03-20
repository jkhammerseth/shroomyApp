# Generated by Django 4.1.7 on 2023-03-03 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mushroom',
            fields=[
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('edible', models.BooleanField(default=False)),
                ('poisonous', models.BooleanField(default=False)),
                ('area', models.CharField(max_length=255)),
                ('image_url', models.URLField()),
            ],
        ),
    ]
