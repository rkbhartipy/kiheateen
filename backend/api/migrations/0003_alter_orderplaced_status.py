# Generated by Django 3.2.3 on 2022-02-26 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_orderplaced_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderplaced',
            name='status',
            field=models.CharField(choices=[('packed', 'Packed'), ('cancled', 'Cancled'), ('shipped', 'Shipped'), ('delivered', 'Delivered')], default='ordered', max_length=20),
        ),
    ]
