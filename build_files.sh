#!/bin/bash

# Install dependencies — --break-system-packages required for Vercel's uv-managed Python
pip install -r requirements.txt --break-system-packages

# Run collectstatic so Vercel can serve static files
python manage.py collectstatic --noinput