from django.urls import path
from .views import UserRegistrationView, UserDetailView, CookieTokenObtainPairView, CookieTokenRefreshView, LogoutView

urlpatterns = [
    path('auth/login/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/register/', UserRegistrationView.as_view(), name='user-register'),
    path('auth/user/me', UserDetailView.as_view(), name='user-detail'),
]
