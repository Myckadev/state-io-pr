from django.core.management.base import BaseCommand
from levels.models import Level

class Command(BaseCommand):
    help = "Initialise les niveaux dans la base de données"

    def handle(self, *args, **kwargs):
        levels_data = [
            {"name": "Vatican City", "code": "VAT", "area": 0.44, "difficulty": "EASY"},
            {"name": "Monaco", "code": "MCO", "area": 2.02, "difficulty": "EASY"},
            {"name": "Nauru", "code": "NRU", "area": 21, "difficulty": "EASY"},
            {"name": "Tuvalu", "code": "TUV", "area": 26, "difficulty": "EASY"},
            {"name": "San Marino", "code": "SMR", "area": 61, "difficulty": "EASY"},
            {"name": "Liechtenstein", "code": "LIE", "area": 160, "difficulty": "EASY"},
            {"name": "Marshall Islands", "code": "MHL", "area": 181, "difficulty": "EASY"},
            {"name": "Saint Kitts and Nevis", "code": "KNA", "area": 261, "difficulty": "EASY"},
            {"name": "Maldives", "code": "MDV", "area": 298, "difficulty": "EASY"},
            {"name": "Malta", "code": "MLT", "area": 316, "difficulty": "EASY"},
            {"name": "Grenada", "code": "GRD", "area": 344, "difficulty": "EASY"},
            {"name": "Saint Vincent and the Grenadines", "code": "VCT", "area": 389, "difficulty": "EASY"},
            {"name": "Barbados", "code": "BRB", "area": 430, "difficulty": "EASY"},
            {"name": "Antigua and Barbuda", "code": "ATG", "area": 442, "difficulty": "EASY"},
            {"name": "Seychelles", "code": "SYC", "area": 455, "difficulty": "EASY"},
            {"name": "Palau", "code": "PLW", "area": 459, "difficulty": "EASY"},
            {"name": "Andorra", "code": "AND", "area": 468, "difficulty": "EASY"},
            {"name": "Saint Lucia", "code": "LCA", "area": 616, "difficulty": "EASY"},
            {"name": "Singapore", "code": "SGP", "area": 719, "difficulty": "EASY"},
            {"name": "Micronesia", "code": "FSM", "area": 702, "difficulty": "EASY"},
            {"name": "Tonga", "code": "TON", "area": 747, "difficulty": "EASY"},
            {"name": "Bahrain", "code": "BHR", "area": 778, "difficulty": "EASY"},
            {"name": "Dominica", "code": "DMA", "area": 751, "difficulty": "EASY"},
            {"name": "Kiribati", "code": "KIR", "area": 811, "difficulty": "EASY"},
            {"name": "Comoros", "code": "COM", "area": 2235, "difficulty": "EASY"},
            {"name": "Mauritius", "code": "MUS", "area": 2040, "difficulty": "EASY"},
            {"name": "Luxembourg", "code": "LUX", "area": 2586, "difficulty": "EASY"},
            {"name": "Samoa", "code": "WSM", "area": 2831, "difficulty": "EASY"},
            {"name": "Cape Verde", "code": "CPV", "area": 4033, "difficulty": "EASY"},
            {"name": "Trinidad and Tobago", "code": "TTO", "area": 5128, "difficulty": "EASY"},
            {"name": "Brunei", "code": "BRN", "area": 5765, "difficulty": "EASY"},
            {"name": "Palestine", "code": "PSE", "area": 5860, "difficulty": "EASY"},
            {"name": "Cyprus", "code": "CYP", "area": 9251, "difficulty": "EASY"},
            {"name": "Lebanon", "code": "LBN", "area": 10400, "difficulty": "EASY"},
            {"name": "Jamaica", "code": "JAM", "area": 10991, "difficulty": "EASY"},
            {"name": "Gambia", "code": "GMB", "area": 11295, "difficulty": "EASY"},
            {"name": "Qatar", "code": "QAT", "area": 11586, "difficulty": "EASY"},
            {"name": "Vanuatu", "code": "VUT", "area": 12189, "difficulty": "EASY"},
            {"name": "Montenegro", "code": "MNE", "area": 13812, "difficulty": "EASY"},
            {"name": "Bahamas", "code": "BHS", "area": 13880, "difficulty": "EASY"},
            {"name": "Timor-Leste", "code": "TLS", "area": 14874, "difficulty": "EASY"},
            {"name": "Swaziland", "code": "SWZ", "area": 17364, "difficulty": "EASY"},
            {"name": "Kuwait", "code": "KWT", "area": 17818, "difficulty": "EASY"},
            {"name": "Fiji", "code": "FJI", "area": 18274, "difficulty": "EASY"},
            {"name": "Slovenia", "code": "SVN", "area": 20273, "difficulty": "EASY"},
            {"name": "Israel", "code": "ISR", "area": 20770, "difficulty": "EASY"},
            {"name": "El Salvador", "code": "SLV", "area": 21041, "difficulty": "EASY"},
            {"name": "Honduras", "code": "HND", "area": 112492, "difficulty": "MEDIUM"},
            {"name": "Guatemala", "code": "GTM", "area": 108889, "difficulty": "MEDIUM"},
            {"name": "Cuba", "code": "CUB", "area": 109884, "difficulty": "MEDIUM"},
            {"name": "South Korea", "code": "KOR", "area": 100210, "difficulty": "MEDIUM"},
            {"name": "Portugal", "code": "PRT", "area": 92212, "difficulty": "MEDIUM"},
            {"name": "Austria", "code": "AUT", "area": 83871, "difficulty": "MEDIUM"},
            {"name": "Czech Republic", "code": "CZE", "area": 78867, "difficulty": "MEDIUM"},
            {"name": "United Arab Emirates", "code": "ARE", "area": 83600, "difficulty": "MEDIUM"},
            {"name": "Ireland", "code": "IRL", "area": 70273, "difficulty": "MEDIUM"},
            {"name": "Sri Lanka", "code": "LKA", "area": 65610, "difficulty": "MEDIUM"},
            {"name": "Georgia", "code": "GEO", "area": 69700, "difficulty": "MEDIUM"},
            {"name": "Lithuania", "code": "LTU", "area": 65300, "difficulty": "MEDIUM"},
            {"name": "Latvia", "code": "LVA", "area": 64589, "difficulty": "MEDIUM"},
            {"name": "Togo", "code": "TGO", "area": 56785, "difficulty": "MEDIUM"},
            {"name": "Liberia", "code": "LBR", "area": 111369, "difficulty": "MEDIUM"},
            {"name": "Bulgaria", "code": "BGR", "area": 110879, "difficulty": "MEDIUM"},
            {"name": "Hungary", "code": "HUN", "area": 93028, "difficulty": "MEDIUM"},
            {"name": "Jordan", "code": "JOR", "area": 89342, "difficulty": "MEDIUM"},
            {"name": "Serbia", "code": "SRB", "area": 88361, "difficulty": "MEDIUM"},
            {"name": "Azerbaijan", "code": "AZE", "area": 86600, "difficulty": "MEDIUM"},
            {"name": "Austria", "code": "AUT", "area": 83871, "difficulty": "MEDIUM"},
            {"name": "Brazil", "code": "BRA", "area": 8515767, "difficulty": "HARD"},
            {"name": "Canada", "code": "CAN", "area": 9984670, "difficulty": "HARD"},
            {"name": "China", "code": "CHN", "area": 9596961, "difficulty": "HARD"},
            {"name": "Russia", "code": "RUS", "area": 17098242, "difficulty": "HARD"},
            {"name": "United States", "code": "USA", "area": 9833520, "difficulty": "HARD"},
            {"name": "Australia", "code": "AUS", "area": 7692024, "difficulty": "HARD"},
            {"name": "India", "code": "IND", "area": 3287263, "difficulty": "HARD"},
            {"name": "Argentina", "code": "ARG", "area": 2780400, "difficulty": "HARD"},
            {"name": "Kazakhstan", "code": "KAZ", "area": 2724900, "difficulty": "HARD"},
            {"name": "Algeria", "code": "DZA", "area": 2381741, "difficulty": "HARD"},
            {"name": "Greenland", "code": "GRL", "area": 2166086, "difficulty": "HARD"},
            {"name": "Mexico", "code": "MEX", "area": 1964375, "difficulty": "HARD"},
            {"name": "Indonesia", "code": "IDN", "area": 1904569, "difficulty": "HARD"},
            {"name": "Saudi Arabia", "code": "SAU", "area": 2149690, "difficulty": "HARD"},
            {"name": "Sudan", "code": "SDN", "area": 1861484, "difficulty": "HARD"},
            {"name": "Libya", "code": "LBY", "area": 1759540, "difficulty": "HARD"},
            {"name": "Iran", "code": "IRN", "area": 1648195, "difficulty": "HARD"},
            {"name": "Mongolia", "code": "MNG", "area": 1564110, "difficulty": "HARD"},
            {"name": "Peru", "code": "PER", "area": 1285216, "difficulty": "HARD"},
            {"name": "Chad", "code": "TCD", "area": 1284000, "difficulty": "HARD"},
            {"name": "Niger", "code": "NER", "area": 1267000, "difficulty": "HARD"},
        ]


        for level_data in levels_data:
            level, created = Level.objects.get_or_create(code=level_data["code"], defaults=level_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Niveau ajouté : {level.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Niveau déjà existant : {level.name}"))
