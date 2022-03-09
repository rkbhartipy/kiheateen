from django.contrib import admin
from .models import CustomerModel, FoodModel, CartModel, PassResetModel, SignupMailVerificationModel, OrderPlaced, ReviewAndSuggestion

# Register your models here.

@admin.register(CustomerModel)
class CustomerAdmin(admin.ModelAdmin):
  list_display=['id','fullname','username','password1', 'password2', 'stream','year','semester', 'phoneno', 'verified_user','photourl']

@admin.register(FoodModel)
class FoodAdmin(admin.ModelAdmin):
  list_display=['id','foodname','fooddescription', 'foodcategory', 'foodprice', 'foodimage']
  
@admin.register(CartModel)
class CartAdmin(admin.ModelAdmin):
  list_display=['id', 'userid', 'foodname', 'foodid', 'quantity', 'foodprice', 'totalprice', 'foodimage'] 
  
@admin.register(PassResetModel)
class PassResetAdmin(admin.ModelAdmin):
  list_display=['id', 'userid', 'token', 'email', 'time']  

@admin.register(SignupMailVerificationModel)
class SignupMailVerificationAdmin(admin.ModelAdmin):
  list_display=['id', 'userid', 'token', 'email', 'time']

@admin.register(OrderPlaced)
class OrderPlacedAdmin(admin.ModelAdmin):
  list_display=['id', 'userido', 'foodido', 'foodname', 'quantityo', 'price', 'cod', 'onlinept', 'paymentdone', 'orderid', 'orderdate', 'order_status']

@admin.register(ReviewAndSuggestion)
class ReviewAndSuggestionAdmin(admin.ModelAdmin):
  list_display=['id', 'name', 'review']







  
