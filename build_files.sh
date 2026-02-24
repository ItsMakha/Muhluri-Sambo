#!/bin/bash

echo "=== Installing requirements ==="
pip install -r requirements.txt --break-system-packages

echo ""
echo "=== Running collectstatic ==="
python manage.py collectstatic --noinput

echo ""
echo "=== Moving files so CDN serves them at /static/ ==="
mkdir -p staticfiles_cdn/static
cp -r staticfiles/* staticfiles_cdn/static/

echo ""
echo "=== CDN output (served at /static/...) ==="
find staticfiles_cdn -type f | grep muhluri | sort

echo "=== Done ==="