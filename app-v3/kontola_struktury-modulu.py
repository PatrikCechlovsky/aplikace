import os

BASE = "app-v3/modules"

def check_module(mod_path):
    code = os.path.basename(mod_path)
    required = [
        f"{code}.md",
        f"{code}-README.md",
        f"{code}-checklist.md",
        f"{code}-poznamky.md",
        "tiles"
    ]
    missing = []
    for req in required:
        target = os.path.join(mod_path, req)
        if req == "tiles":
            if not os.path.isdir(target):
                missing.append("tiles/ (chybí složka)")
        else:
            if not os.path.isfile(target):
                missing.append(req)
    return missing

def main():
    for name in sorted(os.listdir(BASE)):
        mod_path = os.path.join(BASE, name)
        if os.path.isdir(mod_path):
            missing = check_module(mod_path)
            if missing:
                print(f"Modul {name}: chybí {', '.join(missing)}")
            else:
                print(f"Modul {name}: OK")

if __name__ == "__main__":
    main()
