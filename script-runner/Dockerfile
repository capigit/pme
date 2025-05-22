FROM python:3.10-slim

# Définis le répertoire de travail
WORKDIR /app

# Copie les scripts Python dans le conteneur
COPY . .

# Installation les dépendances nécessaires
RUN pip install --no-cache-dir requests pandas

# Exécution du script principal au démarrage
CMD ["python", "main.py"]