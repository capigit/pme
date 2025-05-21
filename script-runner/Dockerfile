# Dockerfile

FROM python:3.10-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les scripts Python dans le conteneur
COPY . .

# Installer les dépendances nécessaires
RUN pip install --no-cache-dir requests pandas

# Exécuter le script principal au démarrage
CMD ["python", "init_db.py"]