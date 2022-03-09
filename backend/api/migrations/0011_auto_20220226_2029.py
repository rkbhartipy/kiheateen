# Generated by Django 3.2.3 on 2022-02-26 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_orderplaced_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderplaced',
            name='amount',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='orderplaced',
            name='status',
            field=models.CharField(choices=[('shipped', 'Shipped'), ('packed', 'Packed'), ('delivered', 'Delivered'), ('ordered', 'Ordered'), ('cancled', 'Cancled')], default='ordered', max_length=20),
        ),
    ]