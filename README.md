<div align="center">

# PME Sales Analytics

**Pipeline ETL conteneurisé · Dashboard interactif · Zéro configuration**

*De la donnée brute à la visualisation en une seule commande*

<br>

[![Python](https://img.shields.io/badge/Python-3.10-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://chartjs.org)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

</div>

---

## Vue d'ensemble

**PME Sales Analytics** est un pipeline de traitement de données bout en bout, entièrement conteneurisé. Il ingère des fichiers CSV, initialise une base SQLite, exécute des analyses de chiffre d'affaires et alimente un dashboard HTML interactif — sans aucune dépendance locale autre que Docker.

<br>

<div align="center">

| Chiffre d'affaires total | Produits analysés | Villes couvertes |
|:---:|:---:|:---:|
| **5 268,78 €** | **5** | **7** |

</div>

---

## Pipeline

```
  CSV Files                 SQLite                   Outputs
─────────────          ──────────────          ─────────────────────
 produits.csv  ──┐     ┌────────────┐          ┌── resultats.json
 magasins.csv  ──┼────►│  sales.db  │─────────►├── resultats.txt
 ventes.csv    ──┘     └────────────┘          └── data.js ──► Dashboard
```

<br>

<div align="center">

| # | Script | Responsabilité |
|:---:|---|---|
| `1` | `init_db.py` | Création de la base et des tables |
| `2` | `import_data.py` | Chargement des CSV sans doublons |
| `3` | `analyze.py` | Analyses SQL stockées en base |
| `4` | `generate_report.py` | Export JSON · TXT · JS |

</div>

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Docker Compose                        │
│                                                             │
│   ┌─────────────────────┐       ┌──────────────────────┐   │
│   │    script-runner    │       │      sqlite-db       │   │
│   │  ─────────────────  │       │  ────────────────    │   │
│   │  Python 3.10-slim   │◄─────►│  nouchka/sqlite3     │   │
│   │  pandas · requests  │       │  /data/sales.db      │   │
│   └─────────────────────┘       └──────────────────────┘   │
│                  │                                          │
│                  ▼                                          │
│          ./data/  (volume bind-mount)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Structure du projet

```
pme/
│
├── dashboard/                   # Visualisation
│   ├── index.html               # Structure HTML
│   ├── css/
│   │   └── style.css            # Styles
│   └── js/
│       ├── utils.js             # Constantes partagées
│       ├── kpis.js              # Injection KPIs & classement
│       ├── charts.js            # Graphiques Chart.js
│       └── app.js               # Point d'entrée
│
├── script-runner/               # Pipeline ETL
│   ├── data/                    # Sources CSV
│   │   ├── produits.csv
│   │   ├── magasins.csv
│   │   └── ventes.csv
│   ├── sql/
│   │   └── analyses.sql         # Requêtes de vérification
│   ├── config.py                # Chemins centralisés
│   ├── queries.py               # Requêtes SQL partagées
│   ├── db_utils.py              # Helper d'insertion
│   ├── init_db.py               # Étape 1
│   ├── import_data.py           # Étape 2
│   ├── analyze.py               # Étape 3
│   ├── generate_report.py       # Étape 4
│   ├── run_sql_analyses.py      # Utilitaire de vérification
│   ├── main.py                  # Orchestrateur
│   └── Dockerfile
│
├── data/                        # Sorties générées (non versionné)
├── docker-compose.yml
└── README.md
```

---

## Démarrage rapide

### Pré-requis

[Docker Desktop](https://www.docker.com/products/docker-desktop/) — aucune autre dépendance requise.

### Lancer le projet

```bash
git clone https://github.com/capigit/pme.git
cd pme
docker compose up --build
```

> Le pipeline complet s'exécute automatiquement et produit les fichiers dans `data/`.

### Visualiser le dashboard

```bash
# Ouvrir directement dans le navigateur — aucun serveur requis
open dashboard/index.html        # macOS
xdg-open dashboard/index.html   # Linux
start dashboard/index.html      # Windows
```

---

## Commandes

<details>
<summary><strong>Rejouer une étape spécifique</strong></summary>

<br>

```bash
docker compose run script-runner python main.py init      # Initialiser la base
docker compose run script-runner python main.py import    # Importer les CSV
docker compose run script-runner python main.py analyze   # Lancer les analyses
docker compose run script-runner python main.py report    # Générer les rapports
docker compose run script-runner python main.py all       # Pipeline complet
```

</details>

<details>
<summary><strong>Vérification des résultats</strong></summary>

<br>

**Via script Python**
```bash
docker compose run script-runner python run_sql_analyses.py
```

**Via console SQLite**
```bash
docker exec -it sqlite-db sh
sqlite3 /data/sales.db
```

Les requêtes de référence sont disponibles dans `script-runner/sql/analyses.sql`.

</details>

---

## Stack technique

<div align="center">

| Couche | Technologie | Rôle |
|---|---|---|
| Conteneurisation | Docker · Docker Compose | Isolation & portabilité |
| Runtime | Python 3.10 | Traitement du pipeline |
| Base de données | SQLite 3 | Stockage & analyses |
| Traitement données | pandas | Import & transformation CSV |
| Visualisation | Chart.js · HTML · CSS | Dashboard interactif |

</div>

---

<div align="center">

*Distribué sous licence [MIT](https://opensource.org/licenses/MIT)*

</div>
