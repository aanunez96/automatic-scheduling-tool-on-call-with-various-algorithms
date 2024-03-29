# Generated by Django 3.0.1 on 2020-04-23 06:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0006_auto_20200405_0223'),
        ('planning', '0021_auto_20200422_2009'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iteration',
            name='executor',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='personal.Person'),
        ),
        migrations.AlterField(
            model_name='messagequeue',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='parameters',
            name='key',
            field=models.CharField(choices=[('alg_student', 'Algorithm Student'), ('alg_profesor', 'Algorithm Profesor'), ('guard', 'Type Guard'), ('date_start', 'Date Start')], max_length=255),
        ),
        migrations.AlterField(
            model_name='personal',
            name='person',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='personal.Person'),
        ),
    ]
