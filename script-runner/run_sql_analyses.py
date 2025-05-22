import sqlite3

DB_PATH = "/data/sales.db"
SQL_FILE = "analyses.sql"

def run_queries():
    with open(SQL_FILE, "r") as f:
        sql_script = f.read()

    # Sépare les requêtes
    queries = [q.strip() for q in sql_script.strip().split(";") if q.strip()]

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    for i, query in enumerate(queries, 1):
        print(f"\nRésultat de la requête {i}:")
        print("SQL:", query)
        try:
            cursor.execute(query)
            rows = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]

            # Affichage formaté
            print(" | ".join(columns))
            print("-" * 40)
            for row in rows:
                print(" | ".join(str(item) for item in row))
        except Exception as e:
            print(f"Erreur lors de l'exécution de la requête {i} : {e}")

    conn.close()

if __name__ == "__main__":
    run_queries()