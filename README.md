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

### Construire et lancer le pipeline complet
docker-compose up --build