from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class UserAccountManager(BaseUserManager):
    def create_user(self, email, firstname, lastname, password=None, role=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not firstname:
            raise ValueError('Users must have a name')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email=email,
            firstname=firstname,
            lastname=lastname,
            role=role
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, firstname, lastname, password=None):
        user = self.create_user(
            email,
            firstname=firstname,
            lastname=lastname,
            password=password,
            role='admin'  # Superusers have the 'admin' role
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('admin', 'Admin'),
        ('lab_technician', 'Lab Technician'),
        ('pharmacist', 'Pharmacist'),
        ('patient', 'Patient'),
        ('specialist', 'Specialist'),
        ('emergency_responder', 'Emergency Responder'),
        ('insurance_representative', 'Insurance Representative'),
    )

    firstname = models.CharField(max_length=255, default='')
    lastname = models.CharField(max_length=255, default='')
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='patient')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname']

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='useraccount_set',  # Custom related name to avoid clashes
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='useraccount_set',  # Custom related name to avoid clashes
        blank=True,
    )
    def __str__(self):
        return self.email
    


class Patient(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    )
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('discharged', 'Discharged'),
        ('observation', 'Observation')
    )
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='patient_profile')
    date_of_birth = models.DateField(db_column='dateofbirth', blank=True, null=True)
    gender = models.CharField(db_column='gender', choices=GENDER_CHOICES, max_length=6)
    contact_number = models.CharField(db_column='contactnumber', unique=True, max_length=20)
    address = models.CharField(db_column='address', max_length=255)
    work = models.CharField(db_column='work', max_length=45, blank=True, null=True)
    height = models.FloatField(db_column='height')
    ssn = models.CharField(db_column='ssn', max_length=255, blank=True, null=True)
    status = models.CharField(db_column='status', choices=STATUS_CHOICES, null=True, default='Active', max_length=25, blank=True)
    reg_date = models.DateTimeField(auto_now_add=True)
    class Meta:
        managed = True
        db_table = 'patients'

    def __str__(self):
        return f"{self.user.firstname} {self.user.lastname}"


class Doctor(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'doctors'

    def __str__(self):
        return f"{self.user.firstname} {self.user.lastname} - {self.specialization}"
    
class Appointment(models.Model):
    appointment_id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateTimeField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'appointments'

    def __str__(self):
        return f"Appointment {self.appointment_id} with {self.doctor.user.firstname} {self.doctor.user.lastname} and {self.patient.user.firstname} {self.patient.user.lastname} on {self.appointment_date}"




# class Exams(models.Model):
#     examid = models.AutoField(db_column='examid', primary_key=True)
#     patientid = models.ForeignKey(
#         'Patients', models.DO_NOTHING, db_column='patientid', blank=True, null=True)
#     examname = models.CharField(
#         db_column='examname', max_length=100, blank=True, null=True)
#     examdate = models.DateField(db_column='examdate', blank=True, null=True)
#     result = models.TextField(db_column='result', blank=True, null=True)

#     class Meta:
#         managed = True
#         db_table = 'exams'


# class Images(models.Model):
#     imageid = models.AutoField(db_column='imageid', primary_key=True)
#     patientid = models.ForeignKey(
#         'Patients', models.DO_NOTHING, db_column='patientid', blank=True, null=True)
#     imagename = models.CharField(
#         db_column='imagename', max_length=255, blank=True, null=True)
#     imagedescription = models.TextField(
#         db_column='imagedescription', blank=True, null=True)

#     class Meta:
#         managed = True
#         db_table = 'images'


# class Insurance(models.Model):
#     insuranceid = models.AutoField(db_column='insuranceid', primary_key=True)
#     patientid = models.ForeignKey(
#         'Patients', models.DO_NOTHING, db_column='patientid', blank=True, null=True)
#     insuranceprovider = models.CharField(
#         db_column='insuranceprovider', max_length=100, blank=True, null=True)
#     policynumber = models.CharField(
#         db_column='policynumber', max_length=50, blank=True, null=True)
#     expirationdate = models.DateField(
#         db_column='expirationdate', blank=True, null=True)

#     class Meta:
#         managed = True
#         db_table = 'insurance'


# class Labresults(models.Model):
#     labresultid = models.AutoField(db_column='labresultid', primary_key=True)
#     examid = models.ForeignKey(
#         Exams, models.DO_NOTHING, db_column='examid', blank=True, null=True)
#     testname = models.CharField(
#         db_column='testname', max_length=100, blank=True, null=True)
#     resultvalue = models.CharField(
#         db_column='resultvalue', max_length=50, blank=True, null=True)
#     resultdate = models.DateField(
#         db_column='resultdate', blank=True, null=True)

#     class Meta:
#         managed = True
#         db_table = 'labresults'


# class Medicalhistory(models.Model):
#     historyid = models.AutoField(db_column='historyid', primary_key=True)
#     patientid = models.ForeignKey(
#         'Patients', models.DO_NOTHING, db_column='patientid', blank=True, null=True)
#     conditionname = models.CharField(
#         db_column='conditionname', max_length=100, blank=True, null=True)
#     diagnosisdate = models.DateField(
#         db_column='diagnosisdate', blank=True, null=True)
#     description = models.TextField(
#         db_column='description', blank=True, null=True)

#     class Meta:
#         managed = True
#         db_table = 'medicalhistory'





# class Prescriptions(models.Model):
#     prescriptionid = models.AutoField(
#         db_column='prescriptionid', primary_key=True)
#     patientid = models.ForeignKey(
#         Patients, models.DO_NOTHING, db_column='patientid', blank=True, null=True)
#     medicationname = models.CharField(
#         db_column='medicationname', max_length=100, blank=True, null=True)
#     dosage = models.CharField(
#         db_column='dosage', max_length=50, blank=True, null=True)
#     prescriptiondate = models.DateField(
#         db_column='prescriptiondate', blank=True, null=True)

#     class Meta:
#         managed = True
#         db_table = 'prescriptions'


# class Visits(models.Model):
#     visitid = models.AutoField(db_column='visitid', primary_key=True)
#     patientid = models.ForeignKey(
#         Patients, models.DO_NOTHING, db_column='patientid', blank=True, null=True)
#     visitdate = models.DateField(db_column='visitdate', blank=True, null=True)
#     purpose = models.CharField(
#         db_column='purpose', max_length=255, blank=True, null=True)
#     notes = models.TextField(db_column='notes', blank=True, null=True)
#     reason_of_admittance = models.CharField(
#         db_column='reason_of_admittance', max_length=255, blank=True, null=True)
#     hospital = models.CharField(
#         db_column='hospital', max_length=255, blank=True, null=True)
#     hospital_exit = models.DateField(
#         db_column='hospital_exit', blank=True, null=True)

#     class Meta:
#         managed = True
#         db_table = 'visits'
