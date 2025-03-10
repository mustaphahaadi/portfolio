from django.contrib import admin
from .models import Project, Tool, Experience, Education, Service

# Register your models here.
admin.site.register(Project)
admin.site.register(Tool)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Service)
