# Generated by Django 3.0.1 on 2020-03-26 06:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0001_initial'),
        ('repo_plan', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shift',
            name='person',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='personal.person'),
        ),
    ]