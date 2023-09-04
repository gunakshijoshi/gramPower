from rest_framework import serializers
from .models import UserDetails,DeviceDetails

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = '__all__'
        
class DeviceDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceDetails
        fields = '__all__'