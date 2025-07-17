from django.urls import path
from . import views

urlpatterns = [
    # Student URLs
    path('check_student_token/', views.check_student_token),
    path('send_otp/', views.send_otp),
    path('signup/student', views.signup),
    path('login/student', views.login),
    path('logout/student', views.logout), 
    path('change_password/student', views.change_password),
    path('get_profile/student', views.get_profile),
    path('update_profile/student', views.update_profile),


    # Teacher URLs
    path('check_teacher_token/', views.check_teacher_token),
    path('send_otp/teacher', views.send_teacher_otp),
    path('signup/teacher', views.teacher_signup),
    path('login/teacher', views.teacher_login),
    path('logout/teacher', views.teacher_logout),
    path('change_password/teacher', views.teacher_change_password),
    path('get_profile/teacher', views.get_teacher_profile),
    path('update_profile/teacher', views.update_teacher_profile),
]
