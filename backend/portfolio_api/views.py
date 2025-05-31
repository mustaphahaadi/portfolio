from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache
from .models import Project, Tool, Experience, Education, Service, Contact
from .serializers import (
    ProjectSerializer, 
    ToolSerializer, 
    ExperienceSerializer, 
    EducationSerializer, 
    ServiceSerializer,
    ContactSerializer
)

class CachedViewSetMixin:
    def get_queryset(self):
        cache_key = f"{self.__class__.__name__}_queryset"
        queryset = cache.get(cache_key)
        if queryset is None:
            queryset = super().get_queryset()
            cache.set(cache_key, queryset, timeout=300)  # Cache for 5 minutes
        return queryset

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by('-created_at')
    serializer_class = ContactSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()
            
            try:
                send_mail(
                    subject=f'New Portfolio Contact: {contact.name}',
                    message=f'Name: {contact.name}\nEmail: {contact.email}\nMessage: {contact.message}',
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.ADMIN_EMAIL],
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error but don't fail the request
                print(f"Email sending failed: {str(e)}")
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectViewSet(CachedViewSetMixin, viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_fields = ['title']
    search_fields = ['title', 'description']
    ordering_fields = ['number', 'title']

class ToolViewSet(CachedViewSetMixin, viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
    filterset_fields = ['name']
    search_fields = ['name']
    ordering_fields = ['name']

class ExperienceViewSet(CachedViewSetMixin, viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by('-year')
    serializer_class = ExperienceSerializer
    filterset_fields = ['company', 'position']
    search_fields = ['company', 'position', 'description']
    ordering_fields = ['year', 'company']

class EducationViewSet(CachedViewSetMixin, viewsets.ModelViewSet):
    queryset = Education.objects.all().order_by('-year')
    serializer_class = EducationSerializer
    filterset_fields = ['institution']
    search_fields = ['institution', 'description']
    ordering_fields = ['year', 'institution']

class ServiceViewSet(CachedViewSetMixin, viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filterset_fields = ['title']
    search_fields = ['title', 'description']
    ordering_fields = ['title']