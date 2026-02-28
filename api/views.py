from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
import json
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def send_email_api(request):
    # Log the request method for debugging
    logger.info(f"Request method: {request.method}")
    logger.info(f"Request path: {request.path}")
    
    if request.method != 'POST':
        return JsonResponse({'error': f'Only POST requests allowed, got {request.method}'}, status=405)
    
    try:
        # Log the raw request body for debugging
        logger.info(f"Request body: {request.body}")
        
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        logger.info(f"Received: name={name}, email={email}, message={message}")
        
        if not all([name, email, message]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)
        
        # For debugging in development
        if settings.DEBUG:
            logger.info(f"Would send email to {settings.EMAIL_HOST_USER}")
            return JsonResponse({'message': 'Email sent successfully (DEBUG mode)'}, status=200)
        
        # Send email using Django's email functionality
        subject = f"New Contact Form Message from {name}"
        email_message = f"""
Name: {name}
Email: {email}

Message:
{message}
        """
        
        send_mail(
            subject=subject,
            message=email_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
        
        return JsonResponse({'message': 'Email sent successfully!'}, status=200)
        
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {e}")
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        logger.error(f"Error sending email: {e}")
        return JsonResponse({'error': str(e)}, status=500)