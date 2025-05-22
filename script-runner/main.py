import subprocess
import sys

scripts = {
    "init": "init_db.py",
    "import": "import_data.py",
    "analyze": "analyze.py",
    "report": "run_sql_analyses.py",
    "all": ["init_db.py", "import_data.py", "analyze.py"]
}

def run_script(script_name):
    print(f"\nExécution de : {script_name}")
    result = subprocess.run(["python", script_name])
    if result.returncode != 0:
        print(f"Échec : {script_name}")
        sys.exit(result.returncode)
    print(f"Terminé : {script_name}")

if __name__ == "__main__":
    arg = sys.argv[1] if len(sys.argv) > 1 else "all"

    if arg not in scripts:
        print(f"Option invalide : {arg}")
        print("Usage : python main.py [init | import | analyze | report | all]")
        sys.exit(1)

    if isinstance(scripts[arg], list):
        for script in scripts[arg]:
            run_script(script)
    else:
        run_script(scripts[arg])