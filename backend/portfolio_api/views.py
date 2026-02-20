from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.mail import send_mail
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
import logging

logger = logging.getLogger(__name__)
from .models import Profile, Project, Tool, Experience, Education, Service, Contact
from .serializers import (
    ProfileSerializer,
    ProjectSerializer, 
    ToolSerializer, 
    ExperienceSerializer, 
    EducationSerializer, 
    ServiceSerializer,
    ContactSerializer
)


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
                logger.error("Email sending failed", exc_info=True)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(cache_page(60 * 5), name='dispatch')
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_fields = ['title']
    search_fields = ['title', 'description']
    ordering_fields = ['number', 'title']

@method_decorator(cache_page(60 * 5), name='dispatch')
class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
    filterset_fields = ['name']
    search_fields = ['name']
    ordering_fields = ['name']

@method_decorator(cache_page(60 * 5), name='dispatch')
class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by('-year')
    serializer_class = ExperienceSerializer
    filterset_fields = ['company', 'position']
    search_fields = ['company', 'position', 'description']
    ordering_fields = ['year', 'company']

@method_decorator(cache_page(60 * 5), name='dispatch')
class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all().order_by('-year')
    serializer_class = EducationSerializer
    filterset_fields = ['institution']
    search_fields = ['institution', 'description']
    ordering_fields = ['year', 'institution']

@method_decorator(cache_page(60 * 5), name='dispatch')
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filterset_fields = ['title']
    search_fields = ['title', 'description']
    ordering_fields = ['title']

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    # Only allow GET requests for the public API
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        # Always return the first/only profile directly instead of an array
        instance = Profile.objects.first()
        if not instance:
            # Return empty response instead of 404 to avoid Axios throwing frontend errors
            return Response(None, status=status.HTTP_200_OK)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)