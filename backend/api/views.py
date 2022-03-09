import re, string, random
from django.http.response import JsonResponse
from django.shortcuts import render
from backend.settings import RAOZRPAY_API_KEY, RAZORPAY_API_SECRET_KEY
import razorpay
from razorpay import Order
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin
from rest_framework.generics import GenericAPIView
from .serializer import StudentSerializer, FoodSerializer, CartSerializer, OrderPlacedSerializer
from rest_framework.decorators import api_view
from django.http import HttpResponse
from rest_framework.response import Response
from .models import CustomerModel, PassResetModel, SignupMailVerificationModel, OrderPlaced, ReviewAndSuggestion, CustomerModel, FoodModel, CartModel

# MAIL IMPORTS
from django.core.mail import send_mail
from django.conf import settings
import uuid
from django.db.models.signals import pre_save, post_save

# showing veg food in veg page/component
@api_view(['GET'])
def getFood(request, category=None):
  cat=category
  data=FoodModel.objects.filter(foodcategory=cat)
  serializer=FoodSerializer(data, many=True)
  return Response(serializer.data)

# registration and email verification
class studentApiReadCreate(GenericAPIView, ListModelMixin, CreateModelMixin):
  queryset=CustomerModel.objects.all()
  serializer_class=StudentSerializer

  def get(self, request, *args, **kwargs):
    return self.list(request, *args, **kwargs)

  def post(self,request, *args, **kwargs):
    self.create(request, *args, **kwargs)
    data=request.data
    SendVerificationMail(request, data['username'])
    return JsonResponse("1", safe=False)

def SendVerificationMail(request, email):
  u_token=uuid.uuid4()
  user_obj=CustomerModel.objects.get(username=email)
  id=user_obj.id
  obj=SignupMailVerificationModel.objects.create(userid=user_obj, email=email, token=u_token)
  subject="Email verification"
  message= f'Click on given link to verify your email http://localhost:4200/acc-verified/{u_token}'
  recipient_list=[email]
  from_email=settings.EMAIL_HOST_USER
  send_mail(subject=subject, message=message, from_email=from_email, recipient_list=recipient_list)

@api_view(['GET', 'POST', 'UPDATE', 'DELETE'])
def SignupTokenVerification(request):
  if request.method == 'POST':
    data=request.data
    token=data['token']
    try:
      u_token=SignupMailVerificationModel.objects.get(token=token)
      if (u_token.token!=token):
        return JsonResponse("1", safe=False)
      else:
        username=u_token.email
        CustomerModel.objects.filter(username=username).update(verified_user=True)
        SignupMailVerificationModel.objects.get(email=username).delete()
        return JsonResponse("2", safe=False)
    except Exception as e:
      return JsonResponse("3", safe=False)

class studentApiUpdateDelete(GenericAPIView, RetrieveModelMixin , UpdateModelMixin, DestroyModelMixin):
  queryset=CustomerModel.objects.all()
  serializer_class=StudentSerializer
  def get(self, request, *args, **kwargs):
    return self.retrieve(request, *args, **kwargs)

  def put(self, request, *args, **kwargs):
    self.partial_update(request, *args, **kwargs)
    return JsonResponse("success", safe=False)

  def delete(self, request, *args, **kwargs):
    return self.destroy(request, *args, **kwargs)

# filter the data form cart model
@api_view(['GET','POST','DELETE'])
def CartOperation(request, foodoruserid=None):
  if request.method == 'GET':
    usercart_items=CartModel.objects.filter(userid=foodoruserid)  
    serializer=CartSerializer(usercart_items, many=True)
    return Response(serializer.data) 
    
  if request.method=="POST":
    data=request.data
    fid=data['foodid']
    uid=data['userid']

    # whether the food item already exists or not for that perticular user
    obj=CartModel.objects.filter(foodid=fid, userid=uid)

    if not obj:
      serializer=CartSerializer(data=data, partial=True)
      if serializer.is_valid():
        serializer.save()
        return JsonResponse("itemnotexits", safe=False)
      else:
        return HttpResponse({"msg":"serializer is not valid"})
    else:
      return JsonResponse("itemexits", safe=False)


  elif request.method=="DELETE":
    try:
      singleFoodItem=CartModel.objects.get(id=foodoruserid)
      singleFoodItem.delete()
      return Response({"msg":"food item deleted successfully"})
    except:
      multipleFoodItems=CartModel.objects.filter(userid=foodoruserid)
      multipleFoodItems.delete()
    return Response({"msg":"all fooditem deleted successfully"})

class PlusMinusItems:
  currentquantity=0
  def minusminus(request, plusorminus=None, pk=None):
    if plusorminus=="minus" and pk is not None:
      obj=CartModel.objects.get(pk=pk)
      quantity=obj.quantity
      if quantity!=1:
        currentquantity=quantity-1
        obj=CartModel.objects.get(id=pk).foodprice
        totalprice=obj*currentquantity
        cart=CartModel.objects.filter(id=pk).update(id=pk, quantity=currentquantity, totalprice=totalprice)
        # return JsonResponse("success", safe=False)
    if plusorminus=="plus" and pk is not None:
      obj=CartModel.objects.get(pk=pk)
      quantity=obj.quantity
      currentquantity=quantity+1
      obj=CartModel.objects.get(id=pk).foodprice
      totalprice=obj*currentquantity
      cart=CartModel.objects.filter(id=pk).update(id=pk, quantity=currentquantity, totalprice=totalprice)
      # return JsonResponse("success", safe=False)
    return JsonResponse("success", safe=False)


# password change process 
@api_view(['PUT'])
def PasswordChange(request):
  if request.method=="PUT":
    data=request.data
    dt_oldpass=data['oldpass']
    dt_newpass1=data['password1']
    dt_oldpass2=data['password2']
    obj=CustomerModel.objects.get(id=data['userid'])
    oldpass=obj.password1
    if dt_oldpass!=oldpass:
      return JsonResponse("1", safe=False)
    if(dt_newpass1!=dt_oldpass2):
      return JsonResponse("2", safe=False)
    else:
      serializer=StudentSerializer(obj, data=data, partial=True)
      if serializer.is_valid():
        serializer.save()
        return JsonResponse("3", safe=False)
      else:
        return JsonResponse("4", safe=False)
  return JsonResponse("success", safe=False)

# password reset process
@api_view(['POST'])
def PasswordReset(request):
  if request.method == 'POST':
    data=request.data
    email=data['email']
    try:
      try:
        # check mail is send/exits or not if yes
        obj=PassResetModel.objects.get(email=email)
        return JsonResponse("1", safe=False)
      except Exception as e:
        # if not then generate and send
        u_token=uuid.uuid4()
        obj2=CustomerModel.objects.get(username=email)
        cre=PassResetModel.objects.create(userid=obj2, token=u_token, email=email)
        SendMail(request, email, u_token)
        return JsonResponse("2", safe=False)
    except Exception as e:
      return JsonResponse("3", safe=False)
  else:
    return JsonResponse("4", safe=False)


def SendMail(request, email, token):
  subject="Reset Password"
  message=f'Click below link to reset your password http://localhost:4200/set-password/{token}' 
  from_email=settings.EMAIL_HOST_USER
  recipient_list=[email]
  send_mail(subject=subject, message=message, from_email=from_email, recipient_list=recipient_list)

@api_view(['POST'])
def SetPassword(request):
  data=request.data
  token=data['token']
  pass1=data['password1']
  pass2=data['password2']

  try:
    pass_obj=PassResetModel.objects.get(token=token)
    if (token==pass_obj.token) and (pass_obj is not None):
      username=pass_obj.email 
      obj=CustomerModel.objects.filter(username=username).update(password1=pass1, password2=pass2)
      if obj is not None:
        pass_obj=PassResetModel.objects.filter(email=username, token=pass_obj.token)
        pass_obj.delete()
      else:
        pass
      return JsonResponse("1", safe=False)
  except:
    return JsonResponse("2", safe=False)


# whether the pass reset link is expired or not (whether the token is detelte
# or not)
@api_view(['POST'])
def ChechPassLinkExpiration(request):
  data=request.data
  token=data.get('token')
  try:
    obj=PassResetModel.objects.get(token=token)
    return JsonResponse("1", safe=False)
  except:
    return JsonResponse("2", safe=False)


class GoogleLogin(GenericAPIView, CreateModelMixin):
  queryset=CustomerModel.objects.all()
  serializer_class=StudentSerializer

  def post(self, request, *args, **kwargs):
    data=request.data
    username=data['username']
    try:
      obj=CustomerModel.objects.get(username=username)
      id=obj.id
      return JsonResponse({"msg":"1", "id":id}, safe=False)
    except Exception as e:
      self.create(request, *args, **kwargs)
      obj=CustomerModel.objects.get(username=username)
      return JsonResponse({"msg":"2", "id":obj.id}, safe=False)

class GetAndUpdateAddress(GenericAPIView, RetrieveModelMixin , UpdateModelMixin):
  queryset=CustomerModel.objects.all()
  serializer_class=StudentSerializer
  def get(self, request, *args, **kwargs):
    return self.retrieve(request, *args, **kwargs)
  def put(self, request, *args, **kwargs):
    return self.partial_update(request, *args, **kwargs)


# cod payment
@api_view(['POST'])
def OrderPlacedFun(request):
  data=request.data
  id=data['id']
  if request.method == "POST":
    objs=CartModel.objects.filter(userid=id)

    S = 10  # number of characters in the string.    
    ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k = S)) 
    print("ran :", ran)

    for i in range(0,len(objs)):
      OrderPlaced.objects.create(userido=objs[i].userid, foodido=objs[i].foodid, foodname=objs[i].foodname , quantityo=objs[i].quantity, price=objs[i].totalprice, cod=True, onlinept=False, orderid=str(ran))
      de=CartModel.objects.filter(userid=objs[i].userid, foodid=objs[i].foodid)
      de.delete()
    return JsonResponse("success", safe=False)
    


# razorpay payment
client = razorpay.Client(auth=(RAOZRPAY_API_KEY, RAZORPAY_API_SECRET_KEY))
@api_view(['GET','POST'])
def RazorOrrderPlaced(self, id, status=None, orderid=None):
  print("--function is called--")
  # calculate total amount and assign to order_amount
  if status=="PAY":
    print("1")
    try:
      print("2")
      userdetails=CustomerModel.objects.get(id=id)
      obj1=CartModel.objects.filter(userid=id)
      order_amount=0
      for i in range(0,len(obj1)):
        order_amount+=obj1[i].totalprice
      order_currency='INR'
      payment_order = client.order.create(dict(amount=order_amount*100, currency=order_currency, payment_capture=1))
      payment_order_id=payment_order['id']
      context={
        "amount":order_amount*100, "order_id":payment_order_id, "name":userdetails.fullname, "email":userdetails.username, "contact":userdetails.phoneno}
      return JsonResponse(context, safe=False)

    except Exception as e:
      print("3")
      return JsonResponse("0", safe=False)

  if status=="save" and orderid!=None:
    objs=CartModel.objects.filter(userid=id)
    for i in range(0,len(objs)):
      print("6")
      OrderPlaced.objects.create(userido=objs[i].userid, foodido=objs[i].foodid, foodname=objs[i].foodname , quantityo=objs[i].quantity, price=objs[i].totalprice, cod=False, onlinept=True, orderid=str(orderid))
      de=CartModel.objects.filter(userid=objs[i].userid, foodid=objs[i].foodid)
      de.delete()
    return JsonResponse("11111111", safe=False)
  else:
    print("4")
    return JsonResponse("0", safe=False) 

# get order details for particular user 
@api_view(['GET'])
def GetOrderDetails(request, id):
  orderitems=OrderPlaced.objects.filter(userido=id)
  serializer=OrderPlacedSerializer(orderitems, many=True)

  # collecting order ids
  orderids={orderitems[0].orderid}
  for i in orderitems:
    orderids.add(i.orderid)
  # collection all orders on the basic of userid and order ids(may be multiple orderids)
  j=0 
  orders={}
  for i in orderids:
    orders[j]=OrderPlaced.objects.filter(userido=id, orderid=i)
    j=j+1
  orderitems=orders
  return Response(serializer.data)

# whether product exits or not in orderplaced model
def CheckOrderedItemsForUser(request, id):
  obj=OrderPlaced.objects.filter(userido=id)
  if obj:
    return JsonResponse("1", safe=False)
  else:
    return JsonResponse("0", safe=False)

@api_view(['GET','POST'])
def Review(request):
  if request.method == "POST":
    try:
      data=request.data
      ReviewAndSuggestion.objects.create(name=data["name"], review=data["review"],)
    except Exception as e:
      print(e)
    return JsonResponse("1", safe=False)
  else:
    print("Invalid request")
  




