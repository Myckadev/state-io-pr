#!/bin/bash
echo "Applying migrations..."
python manage.py migrate --noinput

echo "Starting Django development server..."
exec "$@"
