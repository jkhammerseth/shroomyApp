from rest_framework import serializers
from .models import Mushroom


class MushroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mushroom
        fields = ['id', 'name', 's_name', 'nsnf_norm', 'comment' ,'description', 'recipe', 'image_urls', 'list_mislabel']
