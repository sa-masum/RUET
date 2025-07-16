from django.urls import path
from . import views

urlpatterns = [
    path('check_student_token/', views.check_student_token),
    path('send_otp/', views.send_otp),
    path('signup/student', views.signup),
    path('login/student', views.login),
    path('logout/student', views.logout), 
    path('change_password/student', views.change_password),
    path('get_profile/student', views.get_profile),
    path('update_profile/student', views.update_profile),
]
