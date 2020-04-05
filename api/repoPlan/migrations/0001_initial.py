# Generated by Django 3.0.1 on 2020-03-22 06:48

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('personal', '0001_initial'),
        ('planning', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Shift',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('number', models.IntegerField()),
                ('iteration', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='planning.Iteration')),
                ('person', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='personal.person')),
            ],
            managers=[
                ('object', django.db.models.manager.Manager()),
            ],
        ),
    ]
