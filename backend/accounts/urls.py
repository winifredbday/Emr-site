from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', create_patient, name='create_patient'),
    path('signin/', SignInView.as_view(), name='signin'), 
    path('signout/', SignOutView.as_view(), name='signout'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
]
