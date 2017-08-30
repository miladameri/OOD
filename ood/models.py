from django.db import models
from django.db import models
from django.contrib.auth.models import User as DjangoUser
from django.utils import timezone
import datetime
# Create your models here.
class MyUser(DjangoUser):
    phone_number = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Customer(MyUser):
    address = models.CharField(max_length=255)
    score = models.IntegerField()

    class Meta:
        verbose_name = 'Customer'

class Admin(MyUser):
    pass
    class Meta:
        verbose_name = 'Admin'

class Product(models.Model):
    is_new = models.BooleanField()
    name = models.CharField(max_length=255)
    price = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Order(models.Model):
    product = models.ForeignKey('Product')
    customer = models.ForeignKey('Customer')
    address = models.CharField(max_length=255)
    ttr = models.DateField(default=datetime.datetime.now())

class Comment(models.Model):
    product = models.ForeignKey('Product')
    customer = models.ForeignKey('Customer')
    text = models.TextField()

class Rating(models.Model):
    product = models.ForeignKey('Product')
    customer = models.ForeignKey('Customer')
    rate = models.IntegerField()
