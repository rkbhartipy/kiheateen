"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views
from django.contrib.auth import views as auth_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', views.studentApiReadCreate.as_view()),
    path('user/<int:pk>/', views.studentApiUpdateDelete.as_view()),
    # show food on diffrent page acc to category
    path('food/<slug:category>/', views.getFood),
    # cart operations
    path('addtocart/', views.CartOperation),
    path('getfromcart/<int:foodoruserid>/', views.CartOperation),
    path('plusorminus/<slug:plusorminus>/<int:pk>/',views.PlusMinusItems.minusminus),
    path('cartoperation/<int:foodoruserid>/',views.CartOperation),
    # changepassword
    path('passchng/',views.PasswordChange, name="passchng"),
    # reset password
    path('resetpassword/',views.PasswordReset, name="passreset"),
    path('setpass/',views.SetPassword, name="setpass"),   
    path('linkexpornot/',views.ChechPassLinkExpiration, name="linkexpornot"), 
    path('signuptokenverification/', views.SignupTokenVerification, name="signuptokenverification"),
    path('googlelogin/', views.GoogleLogin.as_view()),
    path('getpostaddress/<int:pk>/', views.GetAndUpdateAddress.as_view()), 
    path('codpaymentmode/', views.OrderPlacedFun, name="codpayment"),
    path('getorderdetails/<int:id>/', views.GetOrderDetails),
    path('checkorderedlist/<int:id>/', views.CheckOrderedItemsForUser), 
    # pay with razorpay
    path('razorpayment/<int:id>/<slug:status>/', views.RazorOrrderPlaced),
    # save payment details after pay
    path('razorpayment/<int:id>/<slug:status>/<slug:orderid>/', views.RazorOrrderPlaced),
    path("review/", views.Review, name="review"),
]
