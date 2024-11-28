from django.contrib.auth.models import User
from django.db import models

class CountryLevel(models.Model):
    DIFFICULTY_CHOICES = [
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="levels")
    code = models.CharField(max_length=3)
    name = models.CharField(max_length=100)
    area = models.IntegerField()
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    is_unlocked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.difficulty}) - {'Unlocked' if self.is_unlocked else 'Locked'}"