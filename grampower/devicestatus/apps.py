from django.apps import AppConfig


class DevicestatusConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "devicestatus"
    def ready(*args):
        from . import schedular
        schedular.start()
