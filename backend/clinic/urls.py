from django.urls import path
from .views import *

urlpatterns = [
    path('treatments/', list_treatments, name='treatments'),
    path('treatments/add', create_treatment, name='add_treatments'),   
]
