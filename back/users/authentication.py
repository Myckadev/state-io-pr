from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Récupérer le token depuis le cookie parce que en cookie par défaut il sait pas faire ce gros débile de django
        access_token = request.COOKIES.get('BEARER')
        if access_token:
            # Simuler la présence du token dans l'en-tête Authorization
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
        return super().authenticate(request)
