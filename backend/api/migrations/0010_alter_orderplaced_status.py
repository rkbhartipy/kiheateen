# Generated by Django 3.2.3 on 2022-02-26 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_orderplaced_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderplaced',
            name='status',
            field=models.CharField(choices=[('shipped', 'Shipped'), ('cancled', 'Cancled'), ('packed', 'Packed'), ('ordered', 'Ordered'), ('delivered', 'Delivered')], default='ordered', max_length=20),
        ),
    ]
