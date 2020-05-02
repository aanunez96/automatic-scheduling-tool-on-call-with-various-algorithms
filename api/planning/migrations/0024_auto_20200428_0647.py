# Generated by Django 3.0.1 on 2020-04-28 06:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0006_auto_20200405_0223'),
        ('planning', '0023_auto_20200428_0647'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iteration',
            name='executor',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='personal.Person'),
        ),
        migrations.AlterField(
            model_name='personal',
            name='name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='personal',
            name='person',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='personal.Person'),
        ),
    ]