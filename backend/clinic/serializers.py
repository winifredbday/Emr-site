from rest_framework import serializers
from .models import *
from accounts.models import Patient, UserAccount
class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = '__all__'

        

class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.SerializerMethodField()
    treatment = TreatmentSerializer()  # Include nested treatment data
    class Meta:
        model = Appointment
        fields = '__all__'

    def get_patient(self, obj):
        return {
            "firstName": obj.patient.user.firstname,
            "lastName": obj.patient.user.lastname,
            # Add more fields if needed
        }