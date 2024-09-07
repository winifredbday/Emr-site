from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db import transaction
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import *
from .serializers import *

# Treatments 
@api_view(['POST'])
@permission_classes([AllowAny])
def create_treatment(request):
    treatment_data = request.data

    # Serialize the treatment data
    treatment_serializer = TreatmentSerializer(data=treatment_data)
    
    if treatment_serializer.is_valid():
        try:
            with transaction.atomic():
                # Create the treatment
                treatment_serializer.save()
                return Response({'message': 'Treatment created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(treatment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
@api_view(['GET'])
@permission_classes([AllowAny])
def list_treatments(request):
    treatments = Treatment.objects.all()
    serializer = TreatmentSerializer(treatments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def treatment_count(request):
    count = Treatment.objects.count()
    return Response({'count': count})

@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_treatment(request, id):
    try:
        treatment = Treatment.objects.get(id=id)
        treatment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Treatment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


# Appointments
@api_view(['POST'])
@permission_classes([AllowAny])
def create_appointment(request):
    appointment_data = request.data

    # Serialize the treatment data
    appointment_serializer = AppointmentSerializer(data=appointment_data)
    
    if appointment_serializer.is_valid():
        try:
            with transaction.atomic():
                # Create the Appointment.
                appointment_serializer.save()
                return Response({'message': 'Appointment. created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(appointment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def list_appointments(request):
    appointments = Appointment.objects.all()
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)