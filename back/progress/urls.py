from django.urls import path
from .views import UserProgressView, CompleteLevelView

urlpatterns = [
    path('game/progress/', UserProgressView.as_view(), name='user-progress'),
    path('game/complete/', CompleteLevelView.as_view(), name='complete-level'),
]
