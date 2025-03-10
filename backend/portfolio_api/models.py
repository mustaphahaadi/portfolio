from django.db import models

# Create your models here.

class Project(models.Model):
    number = models.CharField(max_length=10)
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50)

class Tool(models.Model):
    name = models.CharField(max_length=50)
    icon = models.CharField(max_length=50)

class Experience(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    year = models.CharField(max_length=50)
    description = models.TextField()
    icon = models.CharField(max_length=50)

class Education(models.Model):
    year = models.CharField(max_length=50)
    institution = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)

class Service(models.Model):
    icon = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    description = models.TextField()
