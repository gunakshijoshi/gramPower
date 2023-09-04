import unittest
from django.test import TestCase
from .models import UserDetails,DeviceDetails
from .views import LoginView,FetchDeviceDetails,GenerateDeviceDetails
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json


class LoginViewTestCase(TestCase):
    def test_login_view(self):
        client = APIClient()
        url = reverse('loginAPI')
        data = {"email": "test@example.com", "username": "testuser", "password": "password"}
        response = client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_invalid_login_view(self):
        client = APIClient()
        url = reverse('loginAPI')
        data = {"email": "test@example.com", "username": "Invalid test case Device name sdjnsdsjdsdjnsddc", "password": "password"}
        response = client.get(url, data, format='json')
        response_data =json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class FetchDeviceDetailsTestCase(TestCase):
    def test_fetch_device_details(self):
        client = APIClient()
        url = reverse('FetchDeviceAPI')
        response = client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_fetch_device_details(self):
        client = APIClient()
        url = reverse('FetchDeviceAPI')
        response = client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class GenerateDeviceDetailsTestCase(TestCase):
    def test_generate_device_details(self):
        client = APIClient()
        url = reverse('generateDeviceDetailsAPI')
        response = client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
