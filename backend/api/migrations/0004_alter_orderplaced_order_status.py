# Generated by Django 3.2.3 on 2022-03-09 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_orderplaced_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderplaced',
            name='order_status',
            field=models.CharField(choices=[('shipped', 'Shipped'), ('packed', 'Packed'), ('cancled', 'Cancled'), ('ordered', 'Ordered'), ('delivered', 'Delivered')], default='ordered', max_length=20),
        ),
    ]
