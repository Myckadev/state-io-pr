from levels.models import Level
from progress.models import Progress

def initialize_progress_for_user(user):
    difficulties = ['EASY', 'MEDIUM', 'HARD']
    for difficulty in difficulties:
        levels = Level.objects.filter(difficulty=difficulty).order_by('area')
        print(levels)
        for i, level in enumerate(levels):
            Progress.objects.create(
                user=user,
                level=level,
                is_unlocked=(i == 0)
            )
