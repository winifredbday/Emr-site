# from django.contrib.auth.decorators import user_passes_test
# from django.shortcuts import render

# def is_doctor(user):
#     return user.role == 'doctor'

# def is_patient(user):
#     return user.role == 'patient'

# @user_passes_test(is_doctor)
# def doctor_dashboard(request):
#     # Doctor-specific logic here
#     return render(request, 'doctor_dashboard.html')

# @user_passes_test(is_patient)
# def nurse_dashboard(request):
#     # Nurse-specific logic here
#     # return render(request, 'nurse_dashboard.html')

# # Similar functions can be created for other roles
