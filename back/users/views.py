from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from progress.utils import initialize_progress_for_user
from datetime import datetime, timedelta

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            initialize_progress_for_user(user)
            return Response({'message': 'User created'}, status=201)
        return Response(serializer.errors, status=400)


class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = response.data
        access_token = data.get('access')
        refresh_token = data.get('refresh')

        if access_token:
            response.set_cookie(
                key='BEARER',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
            )
        if refresh_token:
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
            )

        response.data.pop('access', None)
        response.data.pop('refresh', None)

        return response

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = response.data

        access_token = data.get('access')

        if access_token:
            response.set_cookie(
                key='BEARER',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
            )

        response.data.pop('access', None)

        return response

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Blacklist le refresh token
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:
                print(f"Error blacklisting refresh token: {e}")

        response = Response({"message": "Logged out successfully"}, status=200)
        cookies_to_clear = ['refresh_token', 'BEARER']
        for cookie in cookies_to_clear:
            response.set_cookie(
                key=cookie,
                value='',
                expires=datetime.utcnow() - timedelta(days=1),  # Expiration dans le passé
                httponly=True,
                secure=True,
                samesite='None'
            )

        return response