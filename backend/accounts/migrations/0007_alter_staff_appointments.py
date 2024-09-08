# Generated by Django 5.0.7 on 2024-09-08 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_alter_staff_appointments'),
        ('clinic', '0006_alter_appointment_patient_alter_appointment_staff_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='staff',
            name='appointments',
            field=models.ManyToManyField(blank=True, null=True, related_name='staff_members', to='clinic.appointment'),
        ),
    ]
