from django.contrib import admin
from .models import Profile, Project, Tool, Experience, Education, Service

class ProfileAdmin(admin.ModelAdmin):
    # Disable add/delete to enforce Singleton behavior for Profile
    def has_add_permission(self, request):
        if Profile.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

# Register your models here.
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Project)
admin.site.register(Tool)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Service)
