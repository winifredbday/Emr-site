from django.urls import path
from .views import *

urlpatterns = [
    path('patients/', list_patients, name='patient_list'),  # URL to list all patients
    path('signup/', create_patient, name='create_patient'),
    
    path('signin/', SignInView.as_view(), name='signin'), 
    path('signout/', SignOutView.as_view(), name='signout'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
]
