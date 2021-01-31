# Generated by Django 3.1.4 on 2021-01-31 06:10

import FAQ.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FAQ', '0002_auto_20201223_1742'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyprofilepage',
            name='companyLogo',
            field=models.ImageField(default='logo-social.png', upload_to=FAQ.models.upload_path),
        ),
        migrations.AlterField(
            model_name='companyprofilepage',
            name='companyName',
            field=models.CharField(blank=True, default='Company', max_length=128),
        ),
        migrations.AlterField(
            model_name='companyprofilepage',
            name='companyProfilePicture',
            field=models.ImageField(default='24original1431380543.jpg', upload_to=FAQ.models.upload_path),
        ),
        migrations.AlterField(
            model_name='document',
            name='Download',
            field=models.FileField(default='dot-com.jpg', upload_to=''),
        ),
        migrations.AlterField(
            model_name='document',
            name='Thumbnail',
            field=models.ImageField(default='dot-com.jpg', upload_to=''),
        ),
    ]
