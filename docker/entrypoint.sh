#!/bin/bash
echo "Applying migrations..."
python manage.py migrate --noinput

echo "Initializing required application data..."
python manage.py init_levels

echo "Starting Django development server..."
exec "$@"
