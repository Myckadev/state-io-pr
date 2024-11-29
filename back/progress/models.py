from django.db import models
from django.contrib.auth.models import User
from levels.models import Level

class Progress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="progress")
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name="progress")
    is_unlocked = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    completion_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'level')
        verbose_name_plural = "Progressions"

    def __str__(self):
        return f"Progression de {self.user.username} sur {self.level.name}"
