from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Ignorer l'authentification si la route utilise AllowAny
        if not hasattr(request, 'resolver_match') or request.resolver_match is None:
            return None

        view = request.resolver_match.func
        if hasattr(view, 'cls') and hasattr(view.cls, 'permission_classes'):
            permission_classes = getattr(view.cls, 'permission_classes', [])
            from rest_framework.permissions import AllowAny
            if AllowAny in permission_classes:
                return None

        # Récupérer le token depuis le cookie
        access_token = request.COOKIES.get('BEARER')
        if access_token:
            # Simuler la présence du token dans l'en-tête Authorization
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
        return super().authenticate(request)
