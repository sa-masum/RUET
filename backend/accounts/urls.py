from django.urls import path
from . import views

urlpatterns = [
    # Student URLs
    path('check_student_token/', views.check_student_token),
    path('send_otp/student', views.send_student_otp),
    path('signup/student', views.student_signup),
    path('login/student', views.student_login),
    path('logout/student', views.student_logout), 
    path('change_password/student', views.student_change_password),
    path('get_profile/student', views.get_student_profile),
    path('update_profile/student', views.update_student_profile),


    # Teacher URLs
    path('check_teacher_token/', views.check_teacher_token),
    path('send_otp/teacher', views.send_teacher_otp),
    path('signup/teacher', views.teacher_signup),
    path('login/teacher', views.teacher_login),
    path('logout/teacher', views.teacher_logout),
    path('change_password/teacher', views.teacher_change_password),
    path('get_profile/teacher', views.get_teacher_profile),
    path('update_profile/teacher', views.update_teacher_profile),

    # Head URLs
    path('check_head_token/', views.check_head_token),
    path('send_otp/head', views.send_head_otp),
    path('signup/head', views.head_signup),
    path('login/head', views.head_login),
    path('logout/head', views.head_logout),
    path('change_password/head', views.head_change_password),
    path('get_profile/head', views.get_head_profile),
    path('update_profile/head', views.update_head_profile),
]
