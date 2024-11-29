from rest_framework.views import APIView
from rest_framework.response import Response
from progress.models import Progress
from rest_framework.permissions import IsAuthenticated

class UserProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        progress = Progress.objects.filter(user=user).select_related('level')

        data = [
            {
                "level_name": p.level.name,
                "level_code": p.level.code,
                "difficulty": p.level.difficulty,
                "is_unlocked": p.is_unlocked,
                "is_completed": p.is_completed,
            }
            for p in progress
        ]

        return Response(data)

class CompleteLevelView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        level_code = request.data.get('level_code')

        try:
            progress = Progress.objects.get(user=user, level__code=level_code)
            progress.is_completed = True
            progress.save()

            next_level = Progress.objects.filter(
                user=user,
                level__difficulty=progress.level.difficulty,
                is_unlocked=False,
            ).order_by('level__area').first()

            if next_level:
                next_level.is_unlocked = True
                next_level.save()

            return Response({"message": "Level completed and next level unlocked."})
        except Progress.DoesNotExist:
            return Response({"error": "Invalid level code or no progress found."}, status=400)