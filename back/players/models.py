from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    score = models.IntegerField(default=0)
    current_level = models.CharField(max_length=100, null=True, blank=True)
    completed_levels = models.JSONField(default=list)

    def __str__(self):
        return f"Profil de {self.user.username}"
