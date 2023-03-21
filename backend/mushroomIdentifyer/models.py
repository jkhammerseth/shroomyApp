from djongo import models
from bson.objectid import ObjectId

# Create your models here.

class Mushroom(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    s_name = models.CharField(max_length=255)
    nsnf_norm = models.TextField(default="No data")
    comment = models.TextField(default="No data")
    description = models.TextField(default="No data")
    recipe = models.TextField(default="No data")
    image_urls = models.URLField(default="No data")
    list_mislabel = models.TextField(default="No data")
