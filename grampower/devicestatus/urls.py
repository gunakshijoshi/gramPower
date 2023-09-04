from django.urls import path
from .views import LoginView,FetchDeviceDetails,GenerateDeviceDetails

urlpatterns = [

    path("login/", LoginView.as_view(), name="loginAPI"),
    path("fetchdevicedetails/", FetchDeviceDetails.as_view(), name="FetchDeviceAPI"),
    path("generateDeviceDetails/", GenerateDeviceDetails.as_view(), name="generateDeviceDetailsAPI"),


]