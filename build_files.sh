#!/bin/bash

# Install dependencies
pip install -r requirements.txt

# Run collectstatic so Vercel can serve static files
python manage.py collectstatic --noinput