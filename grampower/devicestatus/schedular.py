# scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
from .views import GenerateDeviceDetails

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(GenerateDeviceDetails.post, trigger='interval', seconds=3)
    scheduler.start()

