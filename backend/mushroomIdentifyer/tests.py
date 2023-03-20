from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Mushroom
from .serializers import MushroomSerializer

class MushroomTests(APITestCase):
    def setUp(self):
        self.mushroom1 = Mushroom.objects.create(name='Button Mushroom', edible=True, poisonous=False, latin_name='Agaricus bisporus')
        self.mushroom2 = Mushroom.objects.create(name='Fly Agaric', edible=False, poisonous=True, latin_name='Amanita muscaria')
        self.mushroom3 = Mushroom.objects.create(name='Shiitake', edible=True, poisonous=False, latin_name='Lentinula edodes')

    def test_get_mushrooms(self):
        url = 'localhost:8000/mushrooms/'
        response = self.client.get(url)
        mushrooms = Mushroom.objects.all()
        serializer = MushroomSerializer(mushrooms, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_search_mushrooms(self):
        url = reverse('search_mushrooms')
        response = self.client.get(url, {'name': 'agar'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Button Mushroom')

    def test_predict_mushroom(self):
        url = reverse('predict_mushroom')
        with open('model/Agaricus_bisporus.jpeg', 'rb') as image:
            response = self.client.post(url, data=image, content_type='image/jpeg')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)
        self.assertEqual(response.data[0]['name'], 'Agaricus bisporus')
