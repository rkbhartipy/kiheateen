from dataclasses import fields
from importlib.metadata import files
from django import forms
from django.contrib.auth.forms import SetPasswordForm, _
from .models import CustomerModel

class PasswordResetForm(forms.ModelForm):
  class Meta:
    model = CustomerModel
    fields=['password1', 'password2']
    labels={"password1":"New password", "password2":"Confirm new password"}