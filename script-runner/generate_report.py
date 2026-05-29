import json
from config import OUTPUT_JSON, OUTPUT_TXT, OUTPUT_JS
from queries import get_report_data

report = get_report_data()

with open(OUTPUT_JSON, "w") as f:
    json.dump(report, f, indent=4)

with open(OUTPUT_TXT, "w") as f:
    f.write("Rapport d'analyse des ventes\n")
    f.write(f"Chiffre d'affaires total : {report['chiffre_affaires_total']} €\n\n")
    f.write("Chiffre d'affaires par produit :\n")
    for produit, ca in report["par_produit"].items():
        f.write(f"  - {produit} : {ca} €\n")
    f.write("\nChiffre d'affaires par ville :\n")
    for ville, ca in report["par_ville"].items():
        f.write(f"  - {ville} : {ca} €\n")

with open(OUTPUT_JS, "w") as f:
    f.write(f"const reportData = {json.dumps(report, indent=2, ensure_ascii=False)};\n")

print("Rapport généré : /data/resultats.json, /data/resultats.txt, /data/data.js")
