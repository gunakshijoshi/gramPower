from rest_framework.views import APIView
from django.http import JsonResponse
from .serializers import UserDetailSerializer,DeviceDetailsSerializer
from .models import DeviceDetails
import random
import string
from django.utils import timezone


#Inserting User credentials into database
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserDetailSerializer(data=data)
        try:
            if serializer.is_valid():
                    serializer.save()
                    response_data = {
                        'status': 'SUCCESS',
                        'message': 'Added Successfully to database',
                        'data': serializer.data
                    }
                    return JsonResponse(response_data,content_type='application/json')  
            else:  
                    response_data = {
                        'status': 'Error',
                        'message': 'Invalid Credentials from seralixaer'
                    }
                    return JsonResponse(response_data,content_type='application/json')
        except Exception as e:
            return e

# Get device's data
class FetchDeviceDetails(APIView):
    def get(*args):
        device_data = DeviceDetails.objects.all()
        try:
            if not device_data is None:
                serializer = DeviceDetailsSerializer(device_data, many=True)
                deviceData = {
                "status": "SUCCESS",
                "devicedata": serializer.data,
                }
                return JsonResponse(deviceData,content_type='application/json')
            else:
                deviceData = {
                "status": "SUCCESS",
                "message": "Empty Data",
                }
                return JsonResponse(deviceData,content_type='application/json') 
        except Exception as e:
            return e
    
#Create Data and save/update in the database
class GenerateDeviceDetails(APIView):
    def post(*args):
        if not DeviceDetails.objects.exists():
            
            for i in range(1,6):
                letters = ''.join(random.choices(string.ascii_uppercase, k=3))
                digits = ''.join(random.choices(string.digits, k=6))
                deviceid = letters + digits
                device_data = {
                    'devicename':f"Device {i}",
                    'deviceid': deviceid,
                    'avgcurrent':round(random.uniform(1.0, 20.0),1),  
                    'avgvoltage':round(random.uniform(100.0, 250.0),2),  
                    'totalconsumptions':round(random.uniform(1000.0, 5000.0),2), 
                    'lastdatapoint':timezone.now(),
                    'devicestatus':'live'
                }
                serializer = DeviceDetailsSerializer(data=device_data)
                if serializer.is_valid():
                    serializer.save()
            return JsonResponse({'message': 'Data added successfully for six devices.'})
        else:
            devices = DeviceDetails.objects.exclude(id=6)
            for device in devices:
                device.avgcurrent = round(random.uniform(1.0, 20.0),1)  
                device.avgvoltage = round(random.uniform(100.0, 250.0),2)  
                device.totalconsumptions = round(random.uniform(1000.0, 5000.0),2) 
                device.lastdatapoint = timezone.now()
                if (timezone.now() - device.lastdatapoint).seconds < 3600:
                    device.devicestatus = 'live'
                else:
                    device.devicestatus = 'down'
                device.save()

            return JsonResponse({'message': 'Data updated successfully for existing devices.'})



