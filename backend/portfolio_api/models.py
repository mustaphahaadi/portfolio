from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100, default="Mustapha Haadi Bugnaba")
    roles = models.JSONField(help_text="Provide a list of roles, e.g. [\"Software Developer\", \"Problem Solver\"]", default=list)
    bio = models.TextField()
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)
    twitter_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Profile"

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


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"
