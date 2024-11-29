from django.db import models

class Level(models.Model):
    DIFFICULTY_CHOICES = [
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard'),
    ]

    name = models.CharField(max_length=100)
    code = models.CharField(max_length=3, unique=True)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    area = models.IntegerField()

    def __str__(self):
        return f"{self.name} ({self.difficulty})"
