from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db import transaction
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import Treatment
from .serializers import TreatmentSerializer

# Create your views here.
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
def list_treatments(request):
    treatments = Treatment.objects.all()
    serializer = TreatmentSerializer(treatments, many=True)
    return Response(serializer.data)