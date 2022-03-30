from django.apps import AppConfig


class PurcleappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'purcleapp'

    def ready(self):
        import purcleapp.signals
