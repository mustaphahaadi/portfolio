# Portfolio Website

A modern portfolio website built with Django backend and React frontend, showcasing projects, skills, and experience.

## Features

- **Projects Section**: Display portfolio projects with descriptions and icons
- **Tools Section**: Showcase technical skills and tools
- **Experience Section**: Highlight professional experience
- **Education Section**: Display educational background
- **Responsive Design**: Mobile-friendly layout
- **Admin Panel**: Easy content management through Django admin

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Axios (for API calls)

### Backend

- Django
- Django REST Framework
- SQLite (development)

## Project Structure

## Backend API Models

### Profile

- `name`: CharField (max_length=100)
- `roles`: JSONField
- `bio`: TextField
- `profile_picture`: ImageField
- `resume`: FileField
- `github_link`: URLField
- `linkedin_link`: URLField
- `twitter_link`: URLField

### Project

- `number`: CharField (max_length=10)
- `title`: CharField (max_length=200)
- `description`: TextField
- `icon`: CharField (max_length=50)
- `github_url`: URLField
- `live_url`: URLField

### Tool

- `name`: CharField (max_length=50)
- `icon`: CharField (max_length=50)
- `version`: CharField (max_length=30)
- `status`: CharField (max_length=20, choices)

### Experience

- `company`: CharField (max_length=200)
- `position`: CharField (max_length=200)
- `year`: CharField (max_length=50)
- `description`: TextField
- `icon`: CharField (max_length=50)

### Education

- `year`: CharField (max_length=50)
- `institution`: CharField (max_length=200)
- `description`: TextField
- `location`: CharField (max_length=200)

### Service

- `icon`: CharField (max_length=50)
- `title`: CharField (max_length=200)
- `description`: TextField

### Testimonial

- `name`: CharField (max_length=100)
- `position`: CharField (max_length=200)
- `text`: TextField
- `avatar`: URLField
- `created_at`: DateTimeField

### Contact

- `name`: CharField (max_length=100)
- `email`: EmailField
- `message`: TextField
- `created_at`: DateTimeField

## API Endpoints

- Profile: `http://127.0.0.1:8000/api/profile/`
- Projects: `http://127.0.0.1:8000/api/projects/`
- Tools: `http://127.0.0.1:8000/api/tools/`
- Experiences: `http://127.0.0.1:8000/api/experiences/`
- Education: `http://127.0.0.1:8000/api/education/`
- Services: `http://127.0.0.1:8000/api/services/`
- Testimonials: `http://127.0.0.1:8000/api/testimonials/`
- Contact: `http://127.0.0.1:8000/api/contact/`

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Create superuser:
   ```bash
   python manage.py createsuperuser
   ```
6. Run development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```

## Admin Panel

Access the admin panel at `http://127.0.0.1:8000/admin/` to manage content.

## Environment Variables

Create a `.env` file in the backend directory with your environment variables.

## Deployment

- **Frontend**: Configured for deployment on [Vercel](https://vercel.com/).
- **Backend**: Configured for deployment on [Railway](https://railway.app/).