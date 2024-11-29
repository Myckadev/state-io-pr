from django.core.management.base import BaseCommand
from levels.models import Level

class Command(BaseCommand):
    help = "Initialise les niveaux dans la base de données"

    def handle(self, *args, **kwargs):
        levels_data = [
            {"name": "State-1", "code": "state-1", "area": 1, "difficulty": "EASY"},
            {"name": "State-2", "code": "state-2", "area": 2, "difficulty": "EASY"},
            {"name": "State-3", "code": "state-3", "area": 3, "difficulty": "EASY"},
            {"name": "State-4", "code": "state-4", "area": 4, "difficulty": "EASY"},
            {"name": "State-5", "code": "state-5", "area": 5, "difficulty": "EASY"},
            {"name": "State-6", "code": "state-6", "area": 6, "difficulty": "EASY"},
            {"name": "State-7", "code": "state-7", "area": 7, "difficulty": "EASY"},
            {"name": "State-8", "code": "state-8", "area": 8, "difficulty": "EASY"},
            {"name": "State-9", "code": "state-9", "area": 9, "difficulty": "EASY"},
            {"name": "State-10", "code": "state-10", "area": 10, "difficulty": "EASY"},
            {"name": "State-11", "code": "state-11", "area": 11, "difficulty": "EASY"},
            {"name": "State-12", "code": "state-12", "area": 12, "difficulty": "EASY"},
            {"name": "State-13", "code": "state-13", "area": 13, "difficulty": "EASY"},
            {"name": "State-14", "code": "state-14", "area": 14, "difficulty": "EASY"},
            {"name": "State-15", "code": "state-15", "area": 15, "difficulty": "EASY"},
            {"name": "State-16", "code": "state-16", "area": 16, "difficulty": "EASY"},
            {"name": "State-17", "code": "state-17", "area": 17, "difficulty": "EASY"},
            {"name": "State-18", "code": "state-18", "area": 18, "difficulty": "EASY"},
            {"name": "State-19", "code": "state-19", "area": 19, "difficulty": "EASY"},
            {"name": "State-20", "code": "state-20", "area": 20, "difficulty": "EASY"},
            {"name": "State-21", "code": "state-21", "area": 21, "difficulty": "EASY"},
            {"name": "State-22", "code": "state-22", "area": 22, "difficulty": "EASY"},
            {"name": "State-23", "code": "state-23", "area": 23, "difficulty": "EASY"},
            {"name": "State-24", "code": "state-24", "area": 24, "difficulty": "EASY"},
            {"name": "State-25", "code": "state-25", "area": 25, "difficulty": "EASY"},
            {"name": "State-26", "code": "state-26", "area": 26, "difficulty": "EASY"},
            {"name": "State-27", "code": "state-27", "area": 27, "difficulty": "EASY"},
            {"name": "State-28", "code": "state-28", "area": 28, "difficulty": "EASY"},
            {"name": "State-29", "code": "state-29", "area": 29, "difficulty": "EASY"},
            {"name": "State-30", "code": "state-30", "area": 30, "difficulty": "EASY"},
            {"name": "State-31", "code": "state-31", "area": 31, "difficulty": "EASY"},
            {"name": "State-32", "code": "state-32", "area": 32, "difficulty": "EASY"},
            {"name": "State-33", "code": "state-33", "area": 33, "difficulty": "EASY"},
            {"name": "State-34", "code": "state-34", "area": 34, "difficulty": "EASY"},
            {"name": "State-35", "code": "state-35", "area": 35, "difficulty": "EASY"},
            {"name": "State-36", "code": "state-36", "area": 36, "difficulty": "EASY"},
            {"name": "State-37", "code": "state-37", "area": 37, "difficulty": "EASY"},
            {"name": "State-38", "code": "state-38", "area": 38, "difficulty": "EASY"},
            {"name": "State-39", "code": "state-39", "area": 39, "difficulty": "EASY"},
            {"name": "State-40", "code": "state-40", "area": 40, "difficulty": "EASY"},
            {"name": "State-41", "code": "state-41", "area": 41, "difficulty": "EASY"},
            {"name": "State-42", "code": "state-42", "area": 42, "difficulty": "EASY"},
            {"name": "State-43", "code": "state-43", "area": 43, "difficulty": "EASY"},
            {"name": "State-44", "code": "state-44", "area": 44, "difficulty": "EASY"},
            {"name": "State-45", "code": "state-45", "area": 45, "difficulty": "EASY"},
            {"name": "State-46", "code": "state-46", "area": 46, "difficulty": "EASY"},
            {"name": "State-47", "code": "state-47", "area": 47, "difficulty": "EASY"},
            {"name": "State-48", "code": "state-48", "area": 48, "difficulty": "EASY"},
        ]


        for level_data in levels_data:
            level, created = Level.objects.get_or_create(code=level_data["code"], defaults=level_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Niveau ajouté : {level.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Niveau déjà existant : {level.name}"))
