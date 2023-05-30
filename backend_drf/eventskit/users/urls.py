from django.urls import path, include
from .views import UserRegistrationAPIView, UserLoginAPIView, EmailVerificationAPIView, ProfileAPIView

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view()),
    path('login/', UserLoginAPIView.as_view()),
    path('verify-email/<str:uidb64>/<str:token>/', EmailVerificationAPIView.as_view(), name='verify-email'),
    path('profile/', ProfileAPIView.as_view())
]