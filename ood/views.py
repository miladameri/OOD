
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
        p = PCatalogue.get(id)
        return render(request, 'product.html', context={'id': id, 'name': p.name, 'price': p.price})


class Buy(View):
    def post(self, request, id):
        OrderCatalogue.create(id, request.POST['name'], request.POST['address'], request.POST['date'])
        print(request.POST['date'])
        return redirect(to='home')

class Comments(View):
    def post(self, request):
        print('hi')
        print(request.POST)
        return HttpResponse('done')

class PCatalogue:

    @staticmethod
    def get(id):
        return Product.objects.get(id=id)

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
    def create(id, name, address, date):
        product = Product.objects.get(id=id)
        customer = Customer.objects.get(username='miladameri')
        order = Order.objects.create(product=product,customer=customer,address=address,ttr=date)
        order.save()
        # return list
