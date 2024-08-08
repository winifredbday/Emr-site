# Generated by Django 5.0.7 on 2024-08-08 03:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('specialization', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'doctors',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_birth', models.DateField(blank=True, db_column='dateofbirth', null=True)),
                ('gender', models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], db_column='gender', max_length=6)),
                ('contact_number', models.CharField(db_column='contactnumber', max_length=20, unique=True)),
                ('address', models.CharField(db_column='address', max_length=255)),
                ('work', models.CharField(blank=True, db_column='work', max_length=45, null=True)),
                ('height', models.FloatField(db_column='height')),
                ('ssn', models.CharField(blank=True, db_column='ssn', max_length=255, null=True)),
            ],
            options={
                'db_table': 'patients',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('appointment_id', models.AutoField(primary_key=True, serialize=False)),
                ('appointment_date', models.DateTimeField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='accounts.doctor')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='accounts.patient')),
            ],
            options={
                'db_table': 'appointments',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('firstname', models.CharField(default='', max_length=255)),
                ('lastname', models.CharField(default='', max_length=255)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('role', models.CharField(choices=[('doctor', 'Doctor'), ('nurse', 'Nurse'), ('admin', 'Admin'), ('lab_technician', 'Lab Technician'), ('pharmacist', 'Pharmacist'), ('patient', 'Patient'), ('specialist', 'Specialist'), ('emergency_responder', 'Emergency Responder'), ('insurance_representative', 'Insurance Representative')], default='patient', max_length=50)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, related_name='useraccount_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='useraccount_set', to='auth.permission')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='patient',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='patient_profile', to='accounts.useraccount'),
        ),
        migrations.AddField(
            model_name='doctor',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='doctor_profile', to='accounts.useraccount'),
        ),
    ]
