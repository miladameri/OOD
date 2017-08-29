
from django.views.generic import View
from django.shortcuts import render, redirect
from .models import *
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest, JsonResponse
from django.conf import settings
# Create your views here.
class Home(View):
    def get(self, request):
        try:
            s = request.GET["product_search"]
            return render(request,'home.html', context={'product_search_result':PCatalogue.search(s)})
        except:
            return render(request, 'home.html', context={'products':PCatalogue.list()})

class Products(View):
    def get(self, request, id):
        return render(request,'product.html', context={'id': id})

class Buy(View):
    def post(self, request, id):
        print(request)

class PCatalogue:
    @staticmethod
    def search(s):
        list = []
        products = Product.objects.filter(name__contains=s)
        for item in products:
            i = {'name': item.name, 'id': item.id, 'price': item.price}
            list.append(i)
        return list
    @staticmethod
    def list():
        print('heerreee')
        list = []
        products = Product.objects.all()
        for item in products:
            i = {'name': item.name, 'id': item.id, 'price': item.price}
            list.append(i)
        return list

class OrderCatalogue:
    @staticmethod
    def create(s):
        list = []
        products = Product.objects.filter(name__contains=s)
        for item in products:
            i = {'name': item.name, 'id': item.id, 'price': item.price}
            list.append(i)
        return list
