# Generated by Django 3.2.3 on 2022-02-26 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20220226_1915'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderplaced',
            name='status',
            field=models.CharField(choices=[('cancled', 'Cancled'), ('packed', 'Packed'), ('shipped', 'Shipped'), ('delivered', 'Delivered')], max_length=20),
        ),
    ]