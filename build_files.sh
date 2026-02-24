#!/bin/bash

set -e  # Stop on any error and surface it clearly

echo "=== STEP 1: Python & pip version ==="
python --version
pip --version

echo ""
echo "=== STEP 2: Installing requirements ==="
pip install -r requirements.txt --break-system-packages

echo ""
echo "=== STEP 3: Checking source static files exist ==="
echo "--- muhluri_portfolio/static/ contents ---"
find muhluri_portfolio/static -type f | sort

echo ""
echo "=== STEP 4: Running collectstatic ==="
python manage.py collectstatic --noinput --verbosity 2

echo ""
echo "=== STEP 5: Verifying staticfiles/ was created ==="
echo "--- staticfiles/ contents ---"
find staticfiles -type f | sort

echo ""
echo "=== BUILD COMPLETE ==="