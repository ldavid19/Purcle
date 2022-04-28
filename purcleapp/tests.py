from django.test import TestCase
from django.urls import reverse

from .views import *

# Create your tests here.
class DirectMessageViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create(username="test1")
        User.objects.create(username="test2")

    def testsetUpThread(self):
        url = reverse("api/create-thread/")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)