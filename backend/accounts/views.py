from django.db import transaction
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .serializers import PatientSerializer, UserAccountSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate


@api_view(['POST'])
@permission_classes([AllowAny])
def create_patient(request):
    user_serializer = UserAccountSerializer(data=request.data)
    if user_serializer.is_valid():
        try:
            with transaction.atomic():
                # Create the user
                user = user_serializer.save()
                
                # Prepare patient data and create the patient
                patient_data = request.data.copy()
                patient_data['user'] = user.id
                patient_serializer = PatientSerializer(data=patient_data)
                
                if patient_serializer.is_valid():
                    patient_serializer.save()
                    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
                else:
                    # If patient serializer is invalid, rollback the user creation
                    user.delete()  # Rollback user creation
                    return Response(patient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle any unexpected errors
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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