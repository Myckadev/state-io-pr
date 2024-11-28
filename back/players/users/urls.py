from django.urls import path
from players.views import UserRegistrationView, UserDetailView, CookieTokenObtainPairView, CookieTokenRefreshView, LogoutView

urlpatterns = [
    path('api/login/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/register', UserRegistrationView.as_view(), name='user-register'),
    path('api/user/me', UserDetailView.as_view(), name='user-detail'),
]
