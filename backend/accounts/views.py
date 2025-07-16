from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from .models import Student
from django.contrib.auth.hashers import check_password, make_password
import json
import random
import string
from datetime import datetime, timedelta

OTP_STORE = {}
STUDENT_TOKEN_STORE = {}
TEACHER_TOKEN_STORE = {}

# Student

def is_ruet_student_email(email):
    return email.endswith('@student.ruet.ac.bd')

@csrf_exempt
def check_student_token(request):
    token = request.COOKIES.get('studentToken')
    valid = False
    if token and token in STUDENT_TOKEN_STORE:
        expires = STUDENT_TOKEN_STORE[token]['expires']
        if expires > datetime.utcnow():
            valid = True
    return JsonResponse({'valid': valid})

@csrf_exempt
def check_student(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email', '')
        exists = Student.objects.filter(email=email).exists()
        valid_domain = is_ruet_student_email(email)
        return JsonResponse({'exists': exists, 'valid_domain': valid_domain})

@csrf_exempt
def send_otp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email', '')
        if not is_ruet_student_email(email):
            return JsonResponse({'success': False, 'error': 'Invalid student email domain'})
        if Student.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'Email already exists'})
        otp = str(random.randint(100000, 999999))
        OTP_STORE[email] = otp
        try:
            send_mail(
                'RUET Signup OTP',
                f'Your OTP for RUET signup is: {otp}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': 'Failed to send OTP'})
    return JsonResponse({'success': False, 'error': 'Invalid request'})

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email', '')
        password = data.get('password', '')
        otp = data.get('otp', '')
        if not is_ruet_student_email(email):
            return JsonResponse({'success': False, 'error': 'Invalid student email domain'})
        if Student.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'Email already exists'})
        if OTP_STORE.get(email) != otp:
            return JsonResponse({'success': False, 'error': 'Invalid OTP'})
        Student.objects.create(email=email, password=make_password(password))
        OTP_STORE.pop(email, None)
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'error': 'Invalid request'})

def generate_token(length=32):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choices(chars, k=length))

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email', '').strip()
            password = data.get('password', '').strip()

            try:
                student = Student.objects.get(email=email)
            except Student.DoesNotExist:
                return JsonResponse({'success': False, 'error': 'Invalid credentials'})

            if check_password(password, student.password):
                token = generate_token()
                expires = datetime.utcnow() + timedelta(days=30)  # 1 month
                STUDENT_TOKEN_STORE[token] = {
                    'email': email,
                    'expires': expires
                }
                response = JsonResponse({'success': True})
                response.set_cookie(
                    'studentToken',
                    token,
                    max_age=30*24*60*60,  # 30 days in seconds
                    httponly=True,
                )
                return response
            else:
                return JsonResponse({'success': False, 'error': 'Invalid credentials'})
        except Exception as e:
            import traceback
            print("Login error:", traceback.format_exc())  # Better for debugging
            return JsonResponse({'success': False, 'error': 'Server error'})
    return JsonResponse({'success': False, 'error': 'Invalid request'})

@csrf_exempt
def logout(request):
    if request.method == 'POST':
        response = JsonResponse({'success': True})
        response.delete_cookie('studentToken')
        return response
    return JsonResponse({'success': False, 'error': 'Invalid request'})

@csrf_exempt
def change_password(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            prev_password = data.get('prev_password', '').strip()
            new_password = data.get('new_password', '').strip()
            token = request.COOKIES.get('studentToken')

            if not token or token not in STUDENT_TOKEN_STORE:
                return JsonResponse({'success': False, 'error': 'Authentication required'})

            email = STUDENT_TOKEN_STORE[token]['email']
            student = Student.objects.get(email=email)

            # Check if previous password matches the hashed one
            if not check_password(prev_password, student.password):
                return JsonResponse({'success': False, 'error': 'Previous password is incorrect'})

            # Hash and save the new password
            student.password = make_password(new_password)
            student.save()

            return JsonResponse({'success': True})

        except Exception as e:
            import traceback
            print("Change password error:", traceback.format_exc())
            return JsonResponse({'success': False, 'error': 'Server error'})

    return JsonResponse({'success': False, 'error': 'Invalid request'})

@csrf_exempt
def get_profile(request):
    token = request.COOKIES.get('studentToken')
    if not token or token not in STUDENT_TOKEN_STORE:
        return JsonResponse({'success': False, 'error': 'Authentication required'}, status=401)
    email = STUDENT_TOKEN_STORE[token]['email']
    try:
        student = Student.objects.get(email=email)
        data = {
            'email': student.email,
            'name': student.name,
            'father_name': student.father_name,
            'mother_name': student.mother_name,
            'date_of_birth': student.date_of_birth.strftime('%Y-%m-%d') if student.date_of_birth else '',
            'address': student.address,
            'department': student.department,
            'roll': student.roll,
            'registration_no': student.registration_no,
            'session': student.session,
            'total_earned_credit': str(student.total_earned_credit) if student.total_earned_credit is not None else '',
            'cgpa': str(student.cgpa) if student.cgpa is not None else '',
        }
        return JsonResponse({'success': True, 'profile': data})
    except Exception as e:
        print("Get profile error:", str(e))
        return JsonResponse({'success': False, 'error': 'Server error'}, status=500)

@csrf_exempt
def update_profile(request):
    if request.method == 'POST':
        token = request.COOKIES.get('studentToken')
        if not token or token not in STUDENT_TOKEN_STORE:
            return JsonResponse({'success': False, 'error': 'Authentication required'}, status=401)
        email = STUDENT_TOKEN_STORE[token]['email']
        try:
            student = Student.objects.get(email=email)
            data = json.loads(request.body)
            student.name = data.get('name', '')
            student.father_name = data.get('father_name', '')
            student.mother_name = data.get('mother_name', '')
            dob = data.get('date_of_birth', '')
            student.date_of_birth = dob if dob else None
            student.address = data.get('address', '')
            student.department = data.get('department', '')
            student.roll = data.get('roll', '')
            student.registration_no = data.get('registration_no', '')
            student.session = data.get('session', '')
            student.total_earned_credit = data.get('total_earned_credit') or None
            student.cgpa = data.get('cgpa') or None
            student.save()
            return JsonResponse({'success': True})
        except Exception as e:
            print("Update profile error:", str(e))
            return JsonResponse({'success': False, 'error': 'Server error'}, status=500)
    return JsonResponse({'success': False, 'error': 'Invalid request'}, status=400)

