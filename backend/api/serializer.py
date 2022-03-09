from rest_framework import fields, serializers
from .models import CustomerModel, FoodModel, CartModel, OrderPlaced


class StudentSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomerModel
    fields=['id', 'fullname', 'username', 'password1', 'password2', 'verified_user','photourl','phoneno', 'stream','year','semester']

class FoodSerializer(serializers.ModelSerializer):
  class Meta:
    model = FoodModel
    fields=['id','foodname','fooddescription','foodprice','foodcategory','foodimage']
    
class CartSerializer(serializers.ModelSerializer):
  class Meta:
    model = CartModel
    fields=['id','userid','foodname','foodid','quantity','foodprice', 'totalprice', 'foodimage']


class OrderPlacedSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrderPlaced
    fields=['id', 'userido', 'foodido', 'foodname', 'quantityo', "price", 'cod', 'onlinept', 'paymentdone', 'orderid', 'orderdate', 'status']
