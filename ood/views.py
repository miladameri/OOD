
from django.views.generic import View
from django.shortcuts import render, redirect
from .models import *
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest, JsonResponse
from django.conf import settings
# Create your views here.


class Home(View):
    def get(self, request):
        customer = Customer.objects.get(username='miladameri')

        print('im in home')
        try:
            s = request.GET["product_search"]
            return render(request,'home.html', context={'product_search_result':PCatalogue.search(s,customer)})
        except:
            return render(request, 'home.html', context={'products':PCatalogue.list(customer)})


class Products(View):
    def get(self, request, id):
        customer = Customer.objects.get(username='miladameri')

        p = PCatalogue.get(id)
        comments=[]
        c = Comment.objects.filter(product=Product.objects.get(id=id))
        for item in c:
            comments.append(item.text)

        return render(request, 'product.html', context={'id': id, 'name': p.name, 'price': p.price*PCatalogue.discount_calculation(customer), 'comments':comments})


class Buy(View):
    def post(self, request, id):
        OrderCatalogue.create(id, 'miladameri', request.POST['address'], request.POST['date'])
        print(request.POST['date'])
        return redirect(to='home')


class Comments(View):
    def post(self, request):
        self.create(request.POST['id'], request.POST['comment'])
        return HttpResponse('done')

    @staticmethod
    def create(pid, comment):
        product = Product.objects.get(id=pid)
        customer = Customer.objects.get(username='miladameri')
        comment = Comment.objects.create(product=product,customer=customer,text=comment)
        comment.save()


class Rates(View):
    def post(self, request):
        self.create(request.POST['id'], request.POST['rate'])
        return HttpResponse('done')

    @staticmethod
    def create(pid, rate):
        product = Product.objects.get(id=pid)
        customer = Customer.objects.get(username='miladameri')
        rate = Rating.objects.create(product=product, customer=customer, rate=rate)
        rate.save()


class Sold(View):
    def get(self, request):
        return render(request, 'sold.html', context={'sold_products': PCatalogue.sold_list()})


class PCatalogue:

    @staticmethod
    def discount_calculation(customer):
        return 1-CCatalogue.get_score(customer=customer)/100

    @staticmethod
    def get(id):
        return Product.objects.get(id=id)

    @staticmethod
    def search(s,customer):
        list = []
        products = Product.objects.filter(name__contains=s)
        for item in products:
            i = {'name': item.name, 'id': item.id, 'price': item.price*PCatalogue.discount_calculation(customer=customer)}
            list.append(i)
        return list

    @staticmethod
    def list(customer):
        list = []
        products = Product.objects.all()
        for item in products:
            i = {'name': item.name, 'id': item.id, 'price': item.price*PCatalogue.discount_calculation(customer=customer)}
            list.append(i)
        return list

    @staticmethod
    def sold_list():
        sold_products = []
        orders = Order.objects.all()
        for item in orders:
            i = {'customer_name': item.customer.get_full_name(), 'name': item.product.name, 'price': item.product.price, 'date':item.ttr}
            sold_products.append(i)
        return sold_products



class OrderCatalogue:
    @staticmethod
    def create(id, name, address, date):
        product = Product.objects.get(id=id)
        customer = Customer.objects.get(username=name)
        order = Order.objects.create(product=product,customer=customer,address=address,ttr=date)
        order.save()
        CCatalogue.add_score(customer=customer)
        # return list


class CCatalogue:

    @staticmethod
    def get_score(customer):
        return customer.score

    @staticmethod
    def add_score(customer):
        customer.score = customer.score+1
        customer.save()
        # return list
