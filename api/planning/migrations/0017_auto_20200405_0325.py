# Generated by Django 3.0.1 on 2020-04-05 03:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0006_auto_20200405_0223'),
        ('planning', '0016_auto_20200405_0223'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iteration',
            name='executor',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='personal.Person'),
        ),
        migrations.AlterField(
            model_name='personal',
            name='person',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='personal.Person'),
        ),
    ]
