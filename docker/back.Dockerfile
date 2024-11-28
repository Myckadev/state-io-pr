FROM python:3.11-slim

WORKDIR /app

COPY back/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY back/ .

RUN mkdir /scripts
COPY docker/entrypoint.sh /scripts/entrypoint.sh

RUN chmod +x /scripts/entrypoint.sh
EXPOSE 8000

ENTRYPOINT ["/scripts/entrypoint.sh"]

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
