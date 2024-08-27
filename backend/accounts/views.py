from django.db import transaction
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .serializers import PatientSerializer, UserAccountSerializer, PatientListSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from .models import *

@api_view(['POST'])
@permission_classes([AllowAny])
def create_patient(request):
    user_data = request.data.get('user')
    if not user_data:
        return Response({'non_field_errors': 'User data not provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    patient_data = request.data.copy()
    
    user_serializer = UserAccountSerializer(data=user_data)
    
    if user_serializer.is_valid():
        try:
            with transaction.atomic():
                # Create the user
                user = user_serializer.save()
                
                # Update patient data to include the user reference
                patient_data['user'] = user.id
                patient_serializer = PatientSerializer(data=patient_data)
                
                if patient_serializer.is_valid():
                    patient_serializer.save()
                    return Response({'message': 'User and patient created successfully'}, status=status.HTTP_201_CREATED)
                else:
                    # Rollback the user creation if patient creation fails
                    user.delete()
                    return Response(patient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
@api_view(['GET'])
@permission_classes([AllowAny])  # Adjust permissions as needed
def list_patients(request):
    try:
        # Retrieve all patients from the database
        patients = Patient.objects.all()
        
        # Serialize the patient data
        serializer = PatientListSerializer(patients, many=True)
        
        # Return the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        # Handle any unexpected errors
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class SignInView(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

      
        # Authenticate user
        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        # Create or get the token
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'role': user.role
            })
    
class SignOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            request.user.auth_token.delete()  # Delete the token
        except (AttributeError, Token.DoesNotExist):
            pass  # Token might not exist
        
        return Response({"message": "Successfully logged out."})
    

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserAccountSerializer(user)
        return Response(serializer.data)