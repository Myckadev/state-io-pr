from django.urls import path, include

urlpatterns = [
    path('auth/', include('players.users.urls')),
]
