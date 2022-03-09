from datetime import datetime
from django.db import models
from django.db.models.deletion import CASCADE
from django.contrib.auth.models import _
from django import forms
from django.contrib.auth.models import User

# Create your models here.

# user/customer mode class
class CustomerModel(models.Model):
  fullname=models.CharField(max_length=100)
  username=models.CharField(max_length=100, unique=True)

  password1=models.CharField(_('password'), max_length=100)
  password2=models.CharField(_('password'), max_length=100)
  verified_user=models.BooleanField(default=False)
  photourl=models.CharField(max_length=300, default="")
  phoneno=models.IntegerField(default=0)

  stream=models.CharField(max_length=20, default="")
  year=models.CharField(max_length=20, default="")
  semester=models.CharField(max_length=20, default="")

  def __str__(self):
    return str(self.id)

# class Orders(models.Model):
#   userid=models.ForeignKey(CustomerModel, on_delete=models.CASCADE)
#   status=models.CharField(max_length=)
#   received

# display food
class FoodModel(models.Model):
  foodname=models.CharField(max_length=100)
  fooddescription=models.CharField(max_length=100)
  foodprice=models.IntegerField()
  foodcategory=models.CharField(max_length=20)
  foodimage=models.CharField(max_length=500)

  def __str__(self):
    return str(self.id)

# cart and checkout
class CartModel(models.Model):
  userid=models.ForeignKey(CustomerModel, on_delete=models.CASCADE)
  foodid=models.IntegerField(default=0)
  foodname=models.CharField(max_length=50)
  quantity=models.IntegerField(default=1)
  totalprice=models.IntegerField(default=0)
  foodprice=models.IntegerField(default=0)
  foodimage=models.CharField(max_length=500)

  def __str__(self):
    return str(self.userid)

  def __str__(self):
    return str(self.foodid)


# cart and checkout
class PassResetModel(models.Model):
  userid=models.OneToOneField(CustomerModel, on_delete=models.CASCADE, unique=True)
  email=models.EmailField(max_length=100, unique=True)
  token=models.CharField(max_length=200, unique=True)
  time=models.TimeField(auto_now_add=True)

  def __str__(self):
    return str(self.id)

# cart and checkout
class SignupMailVerificationModel(models.Model):
  userid=models.OneToOneField(CustomerModel, on_delete=models.CASCADE, unique=True)
  email=models.EmailField(max_length=100, unique=True)
  token=models.CharField(max_length=200, unique=True)
  time=models.TimeField(auto_now_add=True)

  def __str__(self):
    return str(self.id)

class OrderPlaced(models.Model):
  STATUS_CHOICES={("ordered","Ordered"), 
                  ("packed","Packed"), 
                  ("shipped","Shipped"),
                  ("cancled","Cancled"),
                  ("delivered","Delivered")}

  userido=models.ForeignKey(CustomerModel, on_delete=models.CASCADE)
  foodido=models.IntegerField(default=0)
  foodname=models.CharField(max_length=100)
  quantityo=models.IntegerField(default=0)
  price=models.IntegerField(default=0)
  cod=models.BooleanField(default=False)
  onlinept=models.BooleanField(default=False)
  paymentdone=models.BooleanField(default=False)
  orderid=models.CharField(max_length=200, default="")
  orderdate=models.DateTimeField(auto_now_add=True)
  status=models.CharField(max_length=20, choices=STATUS_CHOICES, default="ordered")








  
  



    
    


  