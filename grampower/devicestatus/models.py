from django.db import models


class UserDetails(models.Model):
    email = models.EmailField(primary_key=True)
    username = models.CharField(max_length=25)
    password = models.CharField(max_length=25)

class DeviceDetails(models.Model):
    STATUS_CHOICES = [
        ('live', 'Live'),
        ('down', 'Down'),
    ]

    devicename = models.CharField(max_length=20)
    deviceid = models.CharField(max_length=10)
    avgcurrent = models.FloatField()
    avgvoltage = models.FloatField()
    totalconsumptions = models.FloatField()
    lastdatapoint = models.DateTimeField(null=True,blank=True,auto_now=True,verbose_name="Last Updated")
    devicestatus = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='live'
    )