# views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .serializers import PatientSerializer, UserAccountSerializer
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
def create_patient(request):
    logger.info("Received request data: %s", request.data)
    
    user_serializer = UserAccountSerializer(data=request.data)
    print("Request Data:", request.data)  # Debugging line
    if request.method == 'POST':
        if user_serializer.is_valid():
            print("Validated User Data:", user_serializer.validated_data)  # Debugging line
            user = user_serializer.save()
            logger.info("User created: %s", user)
            
            patient_data = request.data.copy()
            patient_data['user'] = user.id
            patient_serializer = PatientSerializer(data=patient_data)
            if patient_serializer.is_valid():
                patient_serializer.save()
                logger.info("Patient created: %s", patient_serializer.validated_data)
                return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
            logger.error("Patient serializer errors: %s", patient_serializer.errors)
            return Response(patient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        logger.error("User serializer errors: %s", user_serializer.errors)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
