# Generated by Django 3.2.3 on 2022-03-09 16:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomerModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=100, unique=True)),
                ('password1', models.CharField(max_length=100, verbose_name='password')),
                ('password2', models.CharField(max_length=100, verbose_name='password')),
                ('verified_user', models.BooleanField(default=False)),
                ('photourl', models.CharField(default='', max_length=300)),
                ('phoneno', models.IntegerField(default=0)),
                ('stream', models.CharField(default='', max_length=20)),
                ('year', models.CharField(default='', max_length=20)),
                ('semester', models.CharField(default='', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='FoodModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foodname', models.CharField(max_length=100)),
                ('fooddescription', models.CharField(max_length=100)),
                ('foodprice', models.IntegerField()),
                ('foodcategory', models.CharField(max_length=20)),
                ('foodimage', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='ReviewAndSuggestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('review', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='SignupMailVerificationModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('token', models.CharField(max_length=200, unique=True)),
                ('time', models.TimeField(auto_now_add=True)),
                ('userid', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.customermodel')),
            ],
        ),
        migrations.CreateModel(
            name='PassResetModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('token', models.CharField(max_length=200, unique=True)),
                ('time', models.TimeField(auto_now_add=True)),
                ('userid', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.customermodel')),
            ],
        ),
        migrations.CreateModel(
            name='OrderPlaced',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foodido', models.IntegerField(default=0)),
                ('foodname', models.CharField(max_length=100)),
                ('quantityo', models.IntegerField(default=0)),
                ('price', models.IntegerField(default=0)),
                ('cod', models.BooleanField(default=False)),
                ('onlinept', models.BooleanField(default=False)),
                ('paymentdone', models.BooleanField(default=False)),
                ('orderid', models.CharField(default='', max_length=200)),
                ('orderdate', models.DateTimeField(auto_now_add=True)),
                ('order_status', models.CharField(choices=[('cancled', 'Cancled'), ('packed', 'Packed'), ('shipped', 'Shipped'), ('delivered', 'Delivered'), ('ordered', 'Ordered')], default='ordered', max_length=20)),
                ('userido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.customermodel')),
            ],
        ),
        migrations.CreateModel(
            name='CartModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foodid', models.IntegerField(default=0)),
                ('foodname', models.CharField(max_length=50)),
                ('quantity', models.IntegerField(default=1)),
                ('totalprice', models.IntegerField(default=0)),
                ('foodprice', models.IntegerField(default=0)),
                ('foodimage', models.CharField(max_length=500)),
                ('userid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.customermodel')),
            ],
        ),
    ]
