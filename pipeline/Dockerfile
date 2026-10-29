FROM python:3.12-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends aria2 ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY devstarter_leads ./devstarter_leads

ENV DATA_DIR=/data PYTHONUNBUFFERED=1
ENTRYPOINT ["python", "-m", "devstarter_leads"]
