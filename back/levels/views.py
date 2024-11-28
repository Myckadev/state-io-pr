from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import serializers

class CountryLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryLevel
        fields = ['code', 'name', 'difficulty', 'is_unlocked']


class CountryLevelListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        levels = CountryLevel.objects.filter(user=user).order_by('difficulty', 'area')
        serializer = CountryLevelSerializer(levels, many=True)
        return Response(serializer.data)


def initialize_progress_for_user(user):
    levels = [
        {"code": "FRA", "name": "France", "area": 551695, "difficulty": "EASY"},
        {"code": "BRA", "name": "Brazil", "area": 8515767, "difficulty": "HARD"},
        {"code": "USA", "name": "United States", "area": 9833520, "difficulty": "MEDIUM"},
        # Ajoute les autres pays ici...
    ]

    for level in levels:
        CountryLevel.objects.create(
            user=user,
            code=level["code"],
            name=level["name"],
            area=level["area"],
            difficulty=level["difficulty"],
            is_unlocked=False
        )

    for difficulty in ['EASY', 'MEDIUM', 'HARD']:
        first_level = CountryLevel.objects.filter(user=user, difficulty=difficulty).order_by('area').first()
        if first_level:
            first_level.is_unlocked = True
            first_level.save()