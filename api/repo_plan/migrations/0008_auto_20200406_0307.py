# Generated by Django 3.0.1 on 2020-04-06 03:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0006_auto_20200405_0223'),
        ('repo_plan', '0007_auto_20200405_0325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shift',
            name='person',
            field=models.ManyToManyField(to='personal.Person'),
        ),
    ]
