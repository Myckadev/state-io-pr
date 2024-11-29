from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated

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