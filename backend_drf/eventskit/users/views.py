from .serializers import UserSerializer, ProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import CustomUser

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.conf import settings

def custom_mailer(pk,token,mailid):
    subject = "Email Verification"
    message = f'Please click the link below to verify your email:\n\n' \
    f'http://localhost:3000/verify-email/{urlsafe_base64_encode(force_bytes(pk))}/{token}/'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [mailid]
    send_mail(subject, message, from_email, recipient_list)
    


class UserRegistrationAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            #? Generate token for email registration
            token = default_token_generator.make_token(user)

            #? Send email to user
            custom_mailer(user.pk, token, user.email)

            return Response({'message': 'User registered successfully. Please check your email for verification.'}, status=200)
        return Response(serializer.errors, status=401)
    

class EmailVerificationAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = CustomUser.objects.get(pk=uid)
        except:
            user = None
        
        if user and default_token_generator.check_token(user, token):
            user.email_verified = True
            user.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Email verified successfully.', 
                'access_token': str(refresh.access_token), 
                'refresh_token': str(refresh),
                'userId': user.pk,
                })
        return Response({'message': 'Invalid link.'}, status=status.HTTP_400_BAD_REQUEST)

    

class UserLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password = password)

        if user:
            refresh = RefreshToken.for_user(user)
            db_user = CustomUser.objects.get(username = username)
            if not db_user.email_verified:
                return Response({'message': 'Please verify your email.'}, status=401)
            return Response(
                {
                    'message': 'Login successful',
                    'userId': db_user.pk,
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                },
                status=status.HTTP_200_OK
            )
        return Response({'message': "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class ProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        profile = user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        user = request.user
        profile = user.profile
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=401)
    
    def delete(self, request):
        user = request.user
        user.delete()
        return Response({'message': 'User deleted successfully.'}, status=200)