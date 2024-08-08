from django.urls import path
from .views import create_patient

urlpatterns = [
    path('signup/', create_patient, name='create_patient'),
]
