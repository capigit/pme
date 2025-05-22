# 🧪 Projet Data Engineer — Analyse des Ventes d'une PME

Il s'agit d'un pipeline complet de traitement de données conteneurisé avec Docker : extraction, transformation, chargement (ETL), analyse, et stockage des résultats.

---

## 📦 Fonctionnalités

- Architecture à deux services (exécution des scripts Python + base SQLite)
- Traitement automatisé de fichiers CSV (ventes, produits, magasins)
- Création automatique de la base et des tables
- Insertion conditionnelle sans doublons
- Analyses : chiffre d’affaires total, par produit, par ville
- Résultats stockés dans la base et affichables via SQL ou script Python

---

## 🚀 Lancer le projet sur n'importe quelle machine

### ✅ Pré-requis

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/) (inclus dans Docker Desktop)

### 🧾 Cloner le dépôt

```bash
git clone https://github.com/capigit/pme.git
cd pme

docker-compose up --build
docker compose up --build
```
Cela exécute automatiquement le script main.py, qui enchaîne :
- init_db.py → création de la base et des tables
- import_data.py → chargement des fichiers CSV
- analyze.py → génération des analyses SQL et stockage dans la base

### Rejouer une étape spécifique
```bash
docker-compose run script-runner python main.py import
docker-compose run script-runner python main.py analyze
docker-compose run script-runner python main.py report
```

---

## 🔍 Vérification des résultats (post `docker-compose up --build`)

Une fois l'exécution terminée, vous pouvez valider les résultats produits par les analyses de deux manières :

---

### 📘 Option 1 — En ligne de commande SQLite

1. Ouvrir une session dans le conteneur de base :

```bash
docker exec -it sqlite-db sh
sqlite3 /data/sales.db
```
Les requêtes sont disponibles dans `script-runner/analyses.sql`

### Option 2 — Affichage automatique avec script Python
```bash
docker-compose run script-runner python run_sql_analyses.py
```

### 📝 Option 3 — Génération automatique d’un fichier de rapport

Vous pouvez lancer le script `generate_report.py` pour créer deux fichiers :

- `/data/resultats.json` → version brute structurée
- `/data/resultats.txt` → version lisible humainement

```bash
docker-compose run script-runner python generate_report.py