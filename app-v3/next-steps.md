# Další kroky pro vývoj aplikace

> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

---

## 1. Zpřesni vizi a cíle
- Ujasni si, pro koho je aplikace určena (cílová skupina, role uživatelů).
- Definuj hlavní "use case" scénáře (co musí uživatel vždy snadno zvládnout).
- Upřesni, jestli budeš chtít webovou aplikaci, mobilní aplikaci (nativní/hybridní), nebo obojí.

---
aplikace je primárně pro pronajímatele, s důrazem na jednoduchost a rychlý přehled všeho podstatného.
Mobilní použití je důležité, alespoň pro základní editaci (například zadání platby, nahlášení závady, rychlé zobrazení přehledu).

Nyní máš tedy:

Cílová skupina: pronajímatelé (případně jejich správci, účetní, nájemníci v omezeném režimu)
Hlavní scénáře: rychlý přehled financí, energií, údržby, snadné zadání nových údajů, rychlá komunikace, snadná editace i na mobilu
Platforma: web+mobil, s důrazem na jednoduchou editaci i v mobilu

## 2. Návrh UX/UI a ovládání
- Rozkresli wireframy nebo použij nástroj jako Figma pro návrh rozložení a ovládání na mobilu i desktopu.
- Zaměř se na jednoduché menu, přehledné dlaždice, rychlý přístup k nejčastějším funkcím.
- Ověř, že klíčové workflow (zadat platbu, nahlásit závadu, zobrazit vyúčtování...) jsou snadno dostupné na malém displeji.
- Připrav návrh barev, ikon, fontů (ideálně ve stylu Material Design nebo Apple Human Interface Guidelines).
            
            
            ## Hlavní postup
            
            1. **Rozkresli wireframy pro mobil i desktop**
               - Pro každý hlavní modul nakresli jednoduchý návrh (na papír, v Figmě, Miro nebo jiném nástroji).
               - Zaměř se na hlavní obrazovky: dashboard, seznam plateb, detail platby, hlášení závad, vyúčtování, komunikace atd.
               - V mobilu vždy preferuj jednu hlavní akci na obrazovku, v desktopu může být více prvků vedle sebe.
            
            2. **Navrhni jednoduché a srozumitelné menu**
               - Ideálně „bottom navigation“ (spodní lišta s 3–5 nejčastějšími sekcemi) + hamburger menu pro méně časté funkce.
               - Na desktopu použij postranní panel nebo horní menu.
            
            3. **Dlaždice a rychlý přístup**
               - Na hlavní stránce zobraz nejčastěji používané dlaždice (Platby, Údržba, Energie, Komunikace...).
               - Umožni uživateli si „připnout“/přizpůsobit oblíbené sekce.
               - Přidej tlačítko „+“ pro rychlé zadání nové platby, závady, dokumentu.
            
            4. **Klíčová workflow dostupná na jedno kliknutí**
               - Například: „Přidat platbu“, „Nahlásit závadu“, „Zobrazit vyúčtování“, „Odeslat zprávu“.
               - V mobilu použij „Floating Action Button“ (FAB) vpravo dole.
            
            5. **Design vizuálních prvků**
               - Barvy: Světlý/tmavý režim, jednoduchá paleta (např. modrá, zelená, šedá), možnost firemní barvy.
               - Ikony: Moderní, srozumitelné (Material Icons, FontAwesome...).
               - Fonty: Čitelné i na malém displeji, dostatečný kontrast.
               - Responzivní layout – obsah se přizpůsobuje obrazovce, tabulky jsou skrolovatelné.
            
            6. **Testování s uživateli**
               - I jednoduché prototypy ukaž 1–2 lidem, jestli se v tom vyznají a najdou rychle hlavní funkce.
            
            ---
            
            ## Doporučené nástroje
            
            - **Figma** (online, zdarma pro základ, mnoho šablon pro mobil+desktop)
            - **Miro** (rychlé „lepení“ wireframů)
            - **Pen & Paper** (rychlý náčrt workflow, hlavních obrazovek)
            - **Draw.io** (schematická mapa modulů, tok hlavních akcí)
            
            ---
            
            ## Příklad základního workflow na mobilu
            
            1. **Spodní lišta:**  
               - Domů | Platby | Údržba | Komunikace | Více (menu)
            2. **Dashboard:**  
               - Přehled posledních plateb, závad, upozornění.
               - Tlačítko „+“ pro novou akci.
            3. **Formulář nové platby:**  
               - Jednoduchý, velká pole, minimum povinných údajů.
            4. **Detail závady:**  
               - Foto, popis, stav, možnost uzavřít/okomentovat.
            5. **Profil uživatele:**  
               - Rychlá změna hesla, notifikací, vzhledu.
            
            ---
            
            ## Další tipy
            
            - Umožni přepínání světlého/tmavého režimu v nastavení.
            - U složitějších tabulek v mobilu zobraz jen nejdůležitější sloupce, zbytek rozbalit v detailu.
            - Základní akce dávej vždy „nahoru“ nebo na plovoucí tlačítko.
            - Všechny hlavní workflow by měly být přístupné na max. 2 kliknutí z hlavní stránky v mobilu.
            
            ---
            
            > V této fázi je důležité si hlavní obrazovky představit, rozkreslit a zamyslet se, co by uživateli nejvíce usnadnilo práci – ať už je na počítači nebo na telefonu.
            > 
            ---

## 3. Výběr technologie a architektury
- Rozhodni, v čem budeš aplikaci vyvíjet:
    - **Webová aplikace**: React, Vue, Angular + PWA (pro mobilní použití)
    - **Mobilní (nativní/hybridní)**: React Native, Flutter, Swift/Kotlin pro nativní
    - **Backend**: Node.js, Python (Django/Flask), .NET, apod.
- Navrhni, kde poběží databáze (cloud, vlastní server, SQLite na zařízení, ...).
- Zvaž budoucí rozšiřitelnost a možnosti API (např. pro napojení na banku, SMS bránu, BankID).

            
            ## 1. Frontend (uživatelské rozhraní)
            
            - **Webová aplikace (PWA)**  
              - **Doporučení:** React (případně Vue) + Material UI  
              - Výhoda: Jedna codebase, funguje na desktopu i v mobilu, lze "připnout" na plochu jako appku, snadná responzivita.
              - **Proč ne Angular?** Pro menší projekt je React/Vue jednodušší a má větší komunitu.
            
            - **Mobilní aplikace**  
              - **Doporučení:**  
                - Pokud budeš chtít „skutečnou“ appku do AppStore/Google Play: React Native nebo Flutter.  
                - Pokud chceš začít jednoduše: PWA (pro většinu uživatelů bude stačit).
              - **Poznámka:** PWA umožní základní offline režim a je jednodušší na údržbu.
            
            ---
            
            ## 2. Backend (serverová logika, API)
            
            - **Doporučené technologie:**
                - **Node.js (Express, NestJS)** – moderní, rychlý, vhodný pro REST API, velká komunita.
                - **Python (Django, Flask, FastAPI)** – skvělé pro rychlý start, bezpečnost, admin rozhraní.
                - **.NET** – robustní, hlavně pro firemní prostředí.
            
            - **Moje doporučení pro začátek:**  
              - **Python + FastAPI** (rychlé, jednoduché, moderní API)
              - nebo **Node.js + Express** (snadný deployment, velká podpora)
            
            ---
            
            ## 3. Databáze
            
            - **Relační (PostgreSQL, MySQL):**
                - Výhoda: Vhodné pro strukturovaná data (platby, jednotky, uživatelé, dokumenty).
                - **Doporučení:** PostgreSQL (open source, rozšiřitelné, snadné zálohování).
            - **NoSQL (MongoDB):**
                - Výhoda: Flexibilnější schema, vhodné pro některé typy dokumentů.
                - **Alternativa:** Pokud budeš chtít větší volnost v dokumentech.
            
            - **Kde provozovat?**
                - **Cloud (Doporučení):** např. Render, Supabase, Railway, Heroku, Vercel, AWS, Azure – snadná správa, zálohy, škálování.
                - **Self-hosted:** když chceš mít vše pod vlastní kontrolou.
                - **Lokální SQLite:** pro rychlé prototypování/MVP.
            
            ---
            
            ## 4. API a rozšiřitelnost
            
            - **Navrhni REST API** – umožní napojení mobilní appky, webu, automatizaci.
            - **Zvaž GraphQL** pokud budeš chtít flexibilní dotazování (není nutné pro začátek).
            - **Připrav si „hooky“ pro napojení na externí služby:**  
                - Bankovní API (pro automatické párování plateb)
                - SMS brána (Twilio, GoSMS…)
                - BankID/MojeID (elektronické podpisy)
                - E-mail (SMTP)
            
            ---
            
            ## 5. Autentizace a zabezpečení
            
            - **JWT (JSON Web Token)** pro správu přihlášení napříč frontendem i mobilem.
            - **OAuth2** pokud budeš chtít umožnit přihlášení přes Google, Apple ID atd.
            - **2FA** (dvoufaktor) připravit možnost do budoucna.
            
            ---
            
            ## 6. Další doporučení
            
            - **GitHub pro verzování a spolupráci** (už máš připraveno).
            - **Docker** pro snadné nasazení a přenositelnost.
            - **CI/CD** (GitHub Actions, GitLab CI) pro automatizaci buildů a testů.
            - **Monitoring a logování** (Sentry, LogRocket, Papertrail…).
            
            ---
            
            ## Rychlý návrh architektury
            
            ```
            [Frontend (React PWA)]
                    |
                [REST API]
                    |
            [Backend (FastAPI/Node.js)]
                    |
                [PostgreSQL DB]
            ```
            
            ---
            
            > Pro tvůj projekt doporučuji začít s React PWA + FastAPI/Node.js, databázi PostgreSQL v cloudu, API navrhnout RESTově a napojení na externí služby přidávat postupně podle priorit.
            > 
            ---

## 4. Návrh databáze a datového modelu
- Vycházej z existujících poznámek – navrhni ER diagram (entita-vazba), kde budou všechny hlavní tabulky (uživatel, platby, služby, energie, údržba, dokumenty...).
- Rozmysli si, zda budeš používat relační databázi (PostgreSQL, MySQL, SQLite) nebo NoSQL (MongoDB).
- Připrav migrace/datové schéma.



            ## Doporučený typ databáze
            
            - **Relační databáze (PostgreSQL)**  
              Vhodné pro složitější vazby, transakce, reporting a integritu dat. Lze snadno exportovat/importovat, škálovat i zálohovat.
            - **Alternativa:** SQLite (pro MVP/testování), MySQL (pokud je hosting omezený na tuto variantu)
            
            ---
            
            ## Hlavní entity/tabulky
            
            | Entita         | Popis                                                                            | Vazby                                  |
            |----------------|----------------------------------------------------------------------------------|----------------------------------------|
            | **user**       | Uživatel systému (pronajímatel, správce, účetní, nájemník)                       | role, jednotky, dokumenty, platby      |
            | **unit**       | Byt/jednotka/nemovitost                                                          | uživatelé, platby, energie, údržba     |
            | **payment**    | Platby (nájem, zálohy, vratky, poplatky)                                         | uživatelé, jednotky, dokumenty         |
            | **service**    | Vyúčtování služeb (vodné, teplo, odpad…)                                         | jednotky, platby, dokumenty            |
            | **energy**     | Odečty energií (elektřina, plyn, voda)                                           | jednotky, uživatelé                    |
            | **maintenance**| Požadavky na údržbu, opravy, revize                                              | jednotky, uživatelé, dokumenty         |
            | **document**   | Dokumenty, šablony, potvrzení, smlouvy                                           | uživatelé, jednotky, platby, podpisy   |
            | **communication** | Zprávy, notifikace, šablony zpráv                                             | uživatelé, jednotky, platby, údržba    |
            | **settings**   | Systémová/nastavení uživatele (vzhled, oblíbené, číselníky)                      | uživatelé                              |
            
            ---
            
            ## Základní ER diagram (textově)
            
            ```
            user ─┬─< payment >─┬─ unit
                  │             │
                  │             └─ document
                  ├─< maintenance >─ unit
                  │
                  ├─< document >─ unit
                  │
                  ├─< communication >─ unit
                  │
                  └─< settings
            unit ─< energy
            unit ─< service
            ```
            - `<` značí "mnoho-k-jednomu" (např. platba patří jednomu uživateli i jednotce, ale uživatel i jednotka mohou mít mnoho plateb).
            
            ---
            
            ## Příklad zjednodušených schémat tabulek
            
            ```sql
            CREATE TABLE user (
              id SERIAL PRIMARY KEY,
              email VARCHAR(255) UNIQUE NOT NULL,
              password_hash VARCHAR(255) NOT NULL,
              role VARCHAR(50) NOT NULL, -- pronajímatel, nájemník, správce, účetní
              name VARCHAR(255),
              phone VARCHAR(50),
              settings JSONB,
              created_at TIMESTAMP DEFAULT NOW()
            );
            
            CREATE TABLE unit (
              id SERIAL PRIMARY KEY,
              label VARCHAR(100) NOT NULL,
              address VARCHAR(255),
              owner_id INT REFERENCES user(id),
              description TEXT
            );
            
            CREATE TABLE payment (
              id SERIAL PRIMARY KEY,
              user_id INT REFERENCES user(id),
              unit_id INT REFERENCES unit(id),
              amount NUMERIC(12,2) NOT NULL,
              type VARCHAR(50), -- nájem, záloha, vratka...
              date_paid DATE,
              document_id INT REFERENCES document(id),
              note TEXT
            );
            
            CREATE TABLE service (
              id SERIAL PRIMARY KEY,
              unit_id INT REFERENCES unit(id),
              period VARCHAR(50), -- např. 2024/06
              description TEXT,
              total NUMERIC(12,2),
              document_id INT REFERENCES document(id)
            );
            
            CREATE TABLE energy (
              id SERIAL PRIMARY KEY,
              unit_id INT REFERENCES unit(id),
              user_id INT REFERENCES user(id),
              type VARCHAR(50), -- elektřina, plyn, voda
              value NUMERIC(12,3),
              date DATE
            );
            
            CREATE TABLE maintenance (
              id SERIAL PRIMARY KEY,
              unit_id INT REFERENCES unit(id),
              user_id INT REFERENCES user(id),
              description TEXT,
              status VARCHAR(50),
              reported_at TIMESTAMP,
              resolved_at TIMESTAMP,
              document_id INT REFERENCES document(id)
            );
            
            CREATE TABLE document (
              id SERIAL PRIMARY KEY,
              type VARCHAR(50), -- smlouva, potvrzení, šablona, dohoda
              owner_id INT REFERENCES user(id),
              unit_id INT REFERENCES unit(id),
              related_payment_id INT REFERENCES payment(id),
              content TEXT,
              signature JSONB,
              created_at TIMESTAMP
            );
            
            CREATE TABLE communication (
              id SERIAL PRIMARY KEY,
              from_user INT REFERENCES user(id),
              to_user INT REFERENCES user(id),
              unit_id INT REFERENCES unit(id),
              subject VARCHAR(255),
              message TEXT,
              type VARCHAR(50), -- email, sms, system
              related_payment_id INT REFERENCES payment(id),
              related_maintenance_id INT REFERENCES maintenance(id),
              sent_at TIMESTAMP
            );
            
            CREATE TABLE settings (
              id SERIAL PRIMARY KEY,
              user_id INT REFERENCES user(id),
              key VARCHAR(100),
              value JSONB
            );
            ```
            
            ---
            
            ## Migrace a další kroky
            
            - Použij nástroj pro migrace podle zvolené technologie (např. Alembic pro SQLAlchemy, Django migrations, Sequelize, Liquibase…).
            - Připrav základní seed data (testovací uživatel, jednotka, šablony dokumentů…).
            - Pro vývoj můžeš začít s SQLite a později přejít na PostgreSQL (struktura zůstane téměř stejná).
            - Dokumentuj (v Markdownu) všechny tabulky a jejich vazby – bude se hodit pro další vývojáře i pro generování ER diagramu (viz dbdiagram.io).
            
            ---
            
            ## Tipy na vizualizaci
            
            - **dbdiagram.io** – zdarma, rychle nakreslíš ER diagram (lze exportovat/importovat SQL)
            - **draw.io** – ruční schéma
            - **DBeaver** – vizualizace struktur při práci s databází
            
            ---
            
            > Tento návrh je základ – podle potřeb můžeš přidávat další tabulky (např. historie změn, logy, role/práva podrobněji, šifrování dokumentů, …).
            > 
            ---

## 5. Prototypování a MVP
- Vytvoř základní prototyp (MVP) s hlavními funkcemi:
    - Registrace/přihlášení uživatele
    - Základní dashboard (přehled plateb, údržby, energie)
    - Zadání platby, nahlášení závady, evidence dokumentu
- Otestuj ovládání na mobilu i desktopu.



            ## Cíl fáze
            
            Vytvořit jednoduchý, funkční základ (Minimum Viable Product), který umožní otestovat hlavní workflow aplikace na desktopu i mobilu.  
            Cílem je mít ověřený základ, na který můžeš rychle navazovat dalšími funkcemi.
            
            ---
            
            ## Hlavní kroky
            
            ### 1. Vytvoření základního prototypu
            
            #### a) **Registrace a přihlášení uživatele**
            - Stránka pro vytvoření nového účtu (e-mail, heslo, role).
            - Přihlášení a odhlášení uživatele, základní validace.
            - Ověř, že funguje správa session/tokenu (JWT nebo podobné).
            
            #### b) **Základní dashboard**
            - Po přihlášení zobraz přehled:  
              - **Platby**: poslední pohyby, neuhrazené platby, možnost přidat novou platbu.
              - **Údržba**: poslední požadavky, stav oprav, možnost nahlásit závadu.
              - **Energie**: poslední odečty, možnost zadat nový odečet.
            - Stručné grafy/přehledy (např. koláčový graf stavů, sloupcový graf plateb).
            
            #### c) **Zadání platby**
            - Jednoduchý formulář: částka, typ platby, jednotka (byt), datum, poznámka.
            - Uložení platby do databáze, zobrazení v přehledu.
            
            #### d) **Nahlášení závady (údržba)**
            - Formulář: výběr jednotky, popis závady, možnost přiložit foto (volitelně), priorita.
            - Uložení požadavku, zobrazení v přehledu.
            
            #### e) **Evidence dokumentu**
            - Možnost nahrát nebo vytvořit dokument (PDF, potvrzení, smlouva).
            - Přiřazení dokumentu k jednotce, platbě nebo opravě.
            - Zobrazení seznamu dokumentů, základní detail.
            
            ---
            
            ### 2. Otestuj ovládání na mobilu i desktopu
            
            - Průběžně kontroluj, že všechny klíčové workflow fungují na malých i velkých displejích.
            - Kontroluj čitelnost, velikost ovládacích prvků, snadný přístup k hlavním funkcím.
            - Ověř, že nejde zadat neúplný nebo chybný formulář.
            
            ---
            
            ### 3. Iteruj a zjednodušuj
            
            - Pokud je něco složité na ovládání, zjednoduš workflow, formulář nebo navigaci.
            - Zaměř se na to, aby uživatel zvládl základní akce na max. 2–3 kliky.
            
            ---
            
            ## Doporučené technologie na prototyp
            
            - **Frontend:** React (PWA), Material UI, případně jednoduché HTML/CSS
            - **Backend:** Node.js/Express nebo Python/FastAPI
            - **Databáze:** SQLite (pro rychlý start a testování) nebo PostgreSQL
            - **Deployment:** Vercel/Netlify (frontend), Render/Heroku/Railway (backend)
            - **Design:** Figma nebo ruční wireframy
            
            ---
            
            ## Co má MVP umět?
            
            - Umožnit registraci/přihlášení a práci více uživatelům.
            - Přehledně zobrazit poslední platby, údržbu, energie.
            - Umožnit snadné přidání platby, závady, dokumentu.
            - Fungovat dobře na mobilu i desktopu.
            - (Volitelně) umožnit základní editaci a mazání záznamů.
            
            ---
            
            ## Další tipy
            
            - MVP nemusí být dokonalé – cílem je ověřit hlavní workflow a UX.
            - Všechny data mohou být zatím jen v testovací databázi.
            - První uživatelé (i ty sám) ti hned ukážou, co je potřeba zlepšit.
            
            ---
            
            > Po ověření MVP můžeš začít přidávat další funkce, vylepšovat design, propracovat bezpečnost a připravit aplikaci na ostrý provoz.
            ---

## 6. Datová bezpečnost a zálohování
- Navrhni systém záloh (ruční, automatické, export/import).
- Ošetři přístupová práva, role, audit změn.
- Vyřeš šifrování citlivých dat (hesla, osobní údaje).

            
            ## A) Systém záloh
            
            ### 1. **Automatické zálohování**
            - **Databáze:**  
              - Nastavit pravidelné zálohy (např. 1× denně v noci, uchovávat min. 7 dní zpětně).
              - Zálohy ukládat na bezpečné, oddělené úložiště (jiný server, cloud: AWS S3, Google Cloud Storage…).
              - Otestovat možnost obnovení (restore test) min. 1× měsíčně.
            
            - **Soubory (dokumenty, přílohy):**  
              - Pravidelně zálohovat složku s dokumenty.
              - Ukládat verze změněných dokumentů (versioning).
            
            ### 2. **Ruční zálohování/export**
            - Umožnit uživateli (adminovi) stáhnout aktuální export databáze a dokumentů (ZIP/SQL/JSON).
            - Umožnit export vybraných dat (platby, jednotky, dokumenty) do CSV/PDF pro vlastní archivaci.
            
            ### 3. **Import dat**
            - Připravit možnost obnovení dat ze zálohy (import SQL dumpu, JSON, upload dokumentů).
            - Ošetřit kontrolu integrity/importu (duplicitní záznamy, nekompletní data).
            
            ---
            
            ## B) Přístupová práva, role a audit změn
            
            ### 1. **Role a oprávnění**
            - Jasně definovat role (pronajímatel, správce, nájemník, účetní, admin…).
            - Každá akce v systému je povolena pouze uživatelům s příslušnou rolí (např. mazání dokumentů jen admin).
            - Oprávnění ukládat do tabulky (např. user_role, permission matrix).
            
            ### 2. **Audit změn (logování)**
            - Každá změna v klíčových tabulkách (platby, dokumenty, uživatelé, údržba) se ukládá do auditní tabulky:
                - kdo změnil (user_id)
                - kdy změnil (timestamp)
                - jaká byla změna (před/po hodnoty, typ akce: create/update/delete)
            - Pro citlivé akce (mazání, změna role, export dat) vyžadovat potvrzení akce (2FA, opakované zadání hesla).
            
            ### 3. **Přístup k zálohám**
            - K zálohám má přístup pouze admin.
            - Každý pokus o stažení/export zálohy je logován (audit trail).
            
            ---
            
            ## C) Šifrování citlivých dat
            
            ### 1. **Hesla**
            - Ukládat pouze silně hashovaná hesla (např. bcrypt, Argon2).
            - Nikdy neukládat heslo v čitelné podobě.
            
            ### 2. **Osobní údaje**
            - Možnost šifrovat citlivé údaje v databázi (např. číslo účtu, telefon, adresa).
            - Přístup k dešifrování pouze pro oprávněné uživatele (role admin/správce).
            - Při exportu dat vždy nabídnout možnost anonymizace nebo pseudonymizace.
            
            ### 3. **Přenos dat**
            - Všechny citlivé údaje přenášet pouze přes HTTPS.
            - U API vyžadovat autorizaci (JWT, OAuth2).
            
            ---
            
            ## D) Další bezpečnostní opatření
            
            - **2FA (dvoufaktorová autentizace)** pro administrátory a důležité akce.
            - **Pravidelná změna hesla** (volitelně vynucená).
            - **Ochrana proti brute-force útokům** (rate limiting, lockout po X pokusech).
            - **Logování podezřelých přístupů** (neobvyklé IP, časy, neúspěšné pokusy).
            - **Pravidelné aktualizace knihoven a závislostí**.
            - **GDPR:** Umožnit smazání osobních údajů na žádost uživatele.
            
            ---
            
            ## E) Shrnutí technických doporučení
            
            - Zálohuj databázi a dokumenty, testuj obnovu.
            - Definuj jasná oprávnění a loguj všechny změny.
            - Ukládej hesla bezpečně, šifruj citlivé údaje.
            - Přenášej data pouze přes zabezpečené kanály.
            - Pravidelně prověřuj bezpečnostní opatření.
            
            ---
            
            > Tato opatření chrání tvá i uživatelská data před ztrátou, zneužitím i nechtěným únikem a umožní snadný návrat k předchozím verzím v případě havárie.
            ---

## 7. Dokumentace a návody
- Vytvoř uživatelskou příručku – stručně popiš hlavní workflow, přidej screenshoty či schémata.
- Připrav vývojářskou dokumentaci (README, popis API).
- Přidej sekci FAQ a troubleshooting.

            
            ## A) Uživatelská příručka
            
            ### 1. Úvod
            Aplikace slouží k jednoduché správě nemovitostí pro pronajímatele – eviduje platby, údržbu, energie, dokumenty a komunikaci s nájemníky.
            
            ### 2. Základní workflow
            
            #### a) Registrace a přihlášení
            - Klikněte na „Registrovat“ a zadejte e-mail a heslo.
            - Po přihlášení uvidíte přehled svých nemovitostí a plateb.
            
            #### b) Přehled dashboardu
            - Horní část: rychlé statistiky (dlužné platby, nové požadavky na opravu, poslední odečty energií).
            - Dlaždice: Platby | Údržba | Energie | Dokumenty | Komunikace
            
            #### c) Zadání nové platby
            1. Klikněte na „+ Platba“.
            2. Vyberte jednotku (byt), zadejte částku a typ platby (nájem, záloha, vratka).
            3. Uložte, platba se zobrazí v seznamu i dashboardu.
            
            #### d) Nahlášení závady
            1. Klikněte na „+ Závada“.
            2. Vyberte byt/jednotku, popište problém, případně přiložte foto.
            3. Odešlete, stav opravy sledujte v sekci Údržba.
            
            #### e) Evidence dokumentu
            - Přidejte nový dokument (smlouva, potvrzení), přiřaďte k bytu či platbě.
            - Lze nahrát PDF či vyplnit šablonu.
            
            #### f) Komunikace
            - Odesílejte hromadné zprávy nebo upomínky nájemníkům.
            - Historii komunikace najdete v sekci Komunikace.
            
            ### 3. Obrázková schémata a screenshoty
            - [ ] Doplnit obrázky hlavních obrazovek (dashboard, formuláře, detail bytu).
            - [ ] Přidat schéma datového modelu a workflow.
            
            ---
            
            ## B) Vývojářská dokumentace
            
            ### 1. README (stručný obsah)
            
            ```markdown
            # Aplikace pro správu nemovitostí
            
            ## Spuštění projektu
            - Frontend (React):
                - `npm install`
                - `npm run dev`
            - Backend (FastAPI/Node.js):
                - `pip install -r requirements.txt` / `npm install`
                - `uvicorn main:app` / `npm run dev`
            
            ## Databáze
            - PostgreSQL (produkce), SQLite (vývoj)
            - Migrace: `alembic upgrade head` / `npx sequelize db:migrate`
            - .env soubor s konfigurací
            
            ## API endpoints
            - `/api/auth/register` – registrace uživatele
            - `/api/auth/login` – přihlášení
            - `/api/payments` – správa plateb
            - `/api/maintenance` – požadavky na údržbu
            - `/api/energy` – odečty energií
            - `/api/documents` – dokumenty a šablony
            - `/api/communications` – zprávy a notifikace
            
            ## Struktura projektu
            - `/frontend` – React PWA
            - `/backend` – API server (FastAPI/Express)
            - `/docs` – dokumentace, šablony, příklady
            
            ## Testování
            - `npm test` / `pytest`
            ```
            
            ### 2. Popis API
            - Každý endpoint vrací JSON.
            - JWT autentizace v hlavičce (`Authorization: Bearer <token>`).
            - Detailní popis endpointů v `/docs/api.md` (doplnit podle implementace).
            
            ---
            
            ## C) FAQ a Troubleshooting
            
            ### FAQ
            
            **Jak obnovím zapomenuté heslo?**  
            Použijte odkaz „Zapomenuté heslo“ na přihlašovací stránce.
            
            **Jak přidám novou nemovitost/jednotku?**  
            V menu „Jednotky“ klikněte na „+“ a vyplňte potřebné údaje.
            
            **Kde najdu historii oprav?**  
            V sekci Údržba pod danou jednotkou.
            
            **Lze exportovat data?**  
            Ano, v Nastavení najdete možnost exportu do CSV/PDF.
            
            **Jak nastavit notifikace?**  
            V Můj účet lze upravit, co chcete dostávat e-mailem/SMS.
            
            ### Troubleshooting
            
            - **Aplikace nejde spustit:**  
              - Zkontrolujte připojení k internetu a restartujte prohlížeč/aplikaci.
              - Ověřte správnost .env souboru (u vývojářů).
            
            - **Nepřichází notifikace:**  
              - Zkontrolujte spam složku.
              - Ověřte nastavení notifikací v účtu.
            
            - **Chyba při zadání platby:**  
              - Ověřte, zda jsou vyplněna všechna povinná pole.
            
            - **Problém se zálohováním/obnovou:**  
              - Kontaktujte technickou podporu, popište přesně chybu a čas výskytu.
            
            ---
            
            > Detailní dokumentace a nápověda zvyšuje důvěru uživatelů a usnadňuje onboarding i rozvoj aplikace.
            ---

## 8. Testování
- Průběžně testuj na různých zařízeních (telefon, tablet, desktop).
- Ověř kompatibilitu s iOS a Androidem (pro mobilní aplikaci).
- Uvažuj o nasazení beta testování.


            ## A) Průběžné testování napříč zařízeními
            
            - **Testuj klíčové workflow** (přihlášení, zadání platby, evidence závady, práce s dokumenty) na:
              - Mobilním telefonu (Android i iOS)
              - Tabletu
              - Desktopu (různé prohlížeče: Chrome, Firefox, Edge, Safari)
            - Pravidelně ověřuj, že:
              - Rozhraní se správně přizpůsobuje velikosti obrazovky (responzivita).
              - Ovládací prvky jsou dobře čitelné a dostupné na všech zařízeních.
              - Formuláře se dají pohodlně vyplnit prstem i myší.
            
            ---
            
            ## B) Kompatibilita s iOS a Androidem (pro mobilní aplikaci/PWA)
            
            - Otestuj instalaci PWA na Androidu a iOS (připnutí na plochu, offline režim, notifikace).
            - Pokud vytváříš nativní aplikaci, testuj na reálných zařízeních i emulátorech.
            - Ověř chování při různých verzích OS a rozlišeních displeje.
            
            ---
            
            ## C) Automatizované testy (doporučené)
            
            - **E2E testy:** Cypress, Playwright, Detox (mobilní)
            - **Jednotkové testy:** Jest (React), Pytest (Python), Mocha (Node.js)
            - **Lint a statická analýza:** ESLint, Prettier, Flake8
            
            ---
            
            ## D) Beta testování
            
            - Vyber několik testovacích uživatelů (pronajímatelé, správci) a dej jim přístup do testovací/beta verze.
            - Vyzvi je k zadání reálných údajů a workflow; sbírej zpětnou vazbu (dotazník, e-mail, Google Forms).
            - Využij platformy pro distribuci testovacích verzí:
              - **Web/PWA:** sdílej odkaz, připrav testovací prostředí (např. beta.aplikace.cz)
              - **Android:** Google Play Console – Closed Testing
              - **iOS:** TestFlight
            
            ---
            
            ## E) Bug tracking a reportování chyb
            
            - Zaveď jednoduchý systém pro hlášení chyb (e-mail, GitHub Issues, formulář v aplikaci).
            - Každou chybu popiš: zařízení, OS, kroky k reprodukci, screenshot/log.
            
            ---
            
            ## F) Další doporučení
            
            - Pravidelně testuj i po nasazení nových verzí (regresní testy).
            - Automatizuj testy a nasazení (Continuous Integration/Deployment).
            - Udržuj seznam známých bugů a jejich stav řešení.
            
            ---
            
            > Pravidelné testování zajišťuje plynulý chod aplikace a spokojenost uživatelů na všech zařízeních.
            ---

## 9. Příprava na distribuci
- Pro mobilní aplikaci připrav potřebné buildy (.apk, .ipa), přidej potřebné ikony, splashscreen, metadata.
- Zajisti soulad s pravidly App Store/Google Play (ochrana osobních údajů, GDPR, testování).
- Připrav webovou stránku s popisem, nápovědou, možností registrace/podpory.


            ## A) Mobilní aplikace – buildy a metadata
            
            ### 1. **Buildy aplikace**
            - **Android:**  
              - Vytvoř release build `.apk` a `.aab` (Android App Bundle) pomocí nástroje (React Native, Flutter, Android Studio...).
            - **iOS:**  
              - Vytvoř `.ipa` build přes Xcode nebo CLI.
              - Pro testování použij TestFlight.
            
            ### 2. **Ikony a splashscreen**
            - Připrav všechny potřebné velikosti ikon a splashscreenů dle požadavků Google/Apple:
              - Android: `mipmap-xxxhdpi`, `hdpi`, `mdpi`, `xhdpi`...
              - iOS: AppIcon, LaunchImage, různé rozměry pro iPad/iPhone.
            - Zkontroluj, že ikona je čitelná i v malém rozlišení.
            
            ### 3. **Metadata**
            - Název aplikace, krátký a dlouhý popis, hlavní funkce.
            - Screenshoty (ideálně z reálného zařízení, doporučeny i s anotacemi).
            - Video preview (volitelné, doporučeno pro App Store).
            - Klíčová slova, kategorie, odkazy na web/podporu.
            - Kontaktní e-mail pro podporu.
            
            ---
            
            ## B) Pravidla App Store/Google Play
            
            ### 1. **Ochrana osobních údajů a GDPR**
            - Připrav dokument „Zásady ochrany osobních údajů“ (Privacy Policy) – musí být veřejně dostupný (např. na webu).
            - Transparentně vysvětli, jaká data aplikace sbírá a proč.
            - Umožni uživateli požádat o export/smazání dat dle GDPR.
            
            ### 2. **Testování a soulad s pravidly**
            - Ověř, že aplikace nepadá a neobsahuje testovací data.
            - Zkontroluj, že nepožaduje zbytečná oprávnění (kamera, polohové služby… pouze pokud je opravdu využíváš).
            - Dodržuj guidelines pro UI/UX (Apple Human Interface, Google Material Guidelines).
            - Zkontroluj lokalizaci – alespoň základní přeložení do angličtiny.
            
            ### 3. **Schvalovací proces**
            - Připrav si odpovědi na typické kontrolní otázky (k čemu appka slouží, jak chrání data, co dělá v pozadí...).
            - Počítej s tím, že první schválení může trvat několik dnů.
            
            ---
            
            ## C) Webová stránka
            
            ### 1. **Obsah webu**
            - Stručný a výstižný popis aplikace (co řeší, pro koho je určena).
            - Návod, jak aplikaci používat (text, obrázky, video).
            - Sekce „FAQ“ a kontaktní formulář/podpora.
            - Odkazy na App Store/Google Play (pokud je appka i jako nativní).
            - Veřejně dostupná: Zásady ochrany osobních údajů, Podmínky užívání.
            
            ### 2. **Možnost registrace/podpory**
            - Přehledný formulář pro registraci (nebo odkaz do aplikace).
            - Kontaktní e-mail, případně chat pro rychlou podporu.
            - Sekce pro stahování záloh/exportů (pro stávající uživatele).
            
            ### 3. **SEO a metadata**
            - D properly vyplněná metadata pro vyhledávače (název, popis, klíčová slova).
            - Otevřené grafické prvky pro sdílení na sociálních sítích („Open Graph“).
            
            ---
            
            ## D) Rychlý checklist před zveřejněním
            
            - [ ] Otestováno na reálných zařízeních (iOS/Android)
            - [ ] Připraveny všechny ikony a screenshoty
            - [ ] Vyplněna metadata a popisy v obchodě
            - [ ] Připraven web s nápovědou a podporou
            - [ ] Zveřejněna zásady ochrany osobních údajů
            - [ ] Ověřen soulad s pravidly App Store/Google Play
            - [ ] Otestován export a smazání osobních dat (GDPR)
            - [ ] Připraven kontaktní e-mail/podpora
            - [ ] Fungují notifikace a základní workflow i bez připojení (PWA/offline režim)
            
            ---
            
            > Po splnění těchto bodů můžeš bezpečně odeslat aplikaci ke schválení a zahájit propagaci uživatelům!
            ---

## 10. Publikace a sdílení
- Vytvoř účet na App Store/Google Play, projdi si kroky pro publikaci.
- Zvaž možnost nabídnout aplikaci i jako webovou PWA (pro rychlé nasazení bez schvalování).
- Připrav export dat/backup pro uživatele.
- Sdílej aplikaci s prvními uživateli, sbírej zpětnou vazbu.


            ## A) Publikace na App Store a Google Play
            
            ### 1. **Vytvoř si vývojářské účty**
            - **Google Play Console:**  
              - https://play.google.com/console  
              - Jednorázový poplatek (cca €25).
            - **Apple Developer Program:**  
              - https://developer.apple.com/programs/  
              - Roční poplatek (cca €99/rok).
            
            ### 2. **Projděte kroky pro publikaci**
            - Připravte a nahrajte release build (.apk/.aab pro Android, .ipa pro iOS).
            - Vyplňte metadata, screenshoty, popis aplikace, zásady ochrany osobních údajů.
            - Ověřte souhlas s pravidly, projděte review proces.
            - Po schválení bude aplikace veřejně přístupná v obchodě.
            
            ---
            
            ## B) Webová aplikace jako PWA
            
            - **Výhody PWA:**  
              - Okamžitá distribuce (stačí rozeslat URL), není třeba čekat na schválení.
              - Uživatelé si mohou aplikaci „připnout“ na plochu jako klasickou appku.
              - Aktualizace probíhají automaticky.
            - **Doporučené platformy pro nasazení:**  
              - Vercel, Netlify, Firebase, GitHub Pages, vlastní VPS.
            
            ---
            
            ## C) Export dat a zálohy pro uživatele
            
            - Umožni uživateli snadný export všech dat (JSON, CSV, PDF, ZIP i s dokumenty).
            - Přidej možnost stáhnout zálohu v nastavení účtu.
            - Nabídni možnost importu zálohy při přechodu na nové zařízení.
            
            ---
            
            ## D) Sdílení a získávání zpětné vazby
            
            - **Sdílej aplikaci s prvními uživateli** (rodina, kolegové, první pronajímatelé).
            - Připrav krátký návod a FAQ (stačí odkaz na web).
            - V aplikaci nebo e-mailem požádej o zpětnou vazbu (dotazník, Google Forms, jednoduché „like/dislike“, textové pole).
            - Pravidelně analyzuj zpětnou vazbu a rychle reaguj na připomínky.
            
            ---
            
            ## E) Další tipy
            
            - Využij sociální sítě, Facebook skupiny, fóra pro pronajímatele pro šíření aplikace.
            - Připrav krátké video nebo animovaný GIF s hlavními funkcemi.
            - Měj připravený kanál pro podporu (e-mail, chat, formulář na webu).
            
            ---
            
            > Publikace a sdílení jsou klíčové pro první reálné uživatele i další rozvoj aplikace. Neboj se začít v malém, hlavní je rychlá zpětná vazba a iterace!
            ---

## 11. Údržba a rozvoj
- Pravidelně aktualizuj aplikaci, opravuj chyby, přidávej nové funkce podle zpětné vazby.
- Nastav systém pro reportování problémů (e-mail, GitHub issues, formulář v aplikaci).

            ## A) Pravidelná údržba aplikace
            
            - **Aktualizace závislostí**
              - Pravidelně kontroluj a aktualizuj knihovny (npm, pip, apod.), aby byla aplikace bezpečná a kompatibilní s novými technologiemi.
              - Nastav automatické upozornění na zranitelnosti (Dependabot, Snyk).
            
            - **Oprava chyb**
              - Monitoruj chybové hlášky (Sentry, LogRocket…) a logy serveru.
              - Průběžně opravuj nahlášené chyby, i drobné UX nedostatky.
            
            - **Pravidelné zálohy**
              - Kontroluj, že zálohovací mechanismus běží a lze data obnovit.
            
            - **Testování po každé aktualizaci**
              - Před nasazením nové verze proveď testy hlavních workflow.
              - Využívej automatizované testy a CI/CD.
            
            ---
            
            ## B) Rozvoj a nové funkce
            
            - **Sbírej zpětnou vazbu od uživatelů**
              - Pravidelně analyzuj požadavky na nové funkce a vylepšení.
              - Vytvoř veřejný roadmap (např. GitHub Projects, Trello), kde uživatelé uvidí plánované změny.
            
            - **Iterativní vývoj**
              - Přidávej nové funkce po menších celcích, vždy s testováním.
              - Využívej feature toggles (možnost skrytě zapnout nové funkce jen pro testery).
            
            - **Zpětná vazba na změny**
              - Informuj uživatele (newsletter, notifikace) o nových funkcích a opravách.
            
            ---
            
            ## C) Systém pro reportování problémů a požadavků
            
            - **GitHub Issues**
              - Umožni uživatelům hlásit chyby a požadavky přímo přes [GitHub Issues](https://github.com/PatrikCechlovsky/aplikace/issues).
              - Připrav jednoduchou šablonu pro nahlášení chyby (popis, kroky, screenshot…).
            
            - **E-mailová podpora**
              - Zveřejni kontaktní e-mail pro hlášení problémů.
            
            - **Formulář v aplikaci**
              - Přidej jednoduchý kontaktní formulář přímo v aplikaci (pro nahlášení chyby, návrh na vylepšení).
              - Každý report automaticky eviduj a přiřaď ke správné kategorii.
            
            ---
            
            ## D) Další doporučení
            
            - **Pravidelný refaktoring kódu** – usnadní dlouhodobý rozvoj.
            - **Dokumentace změn (Changelog)** – pro přehled aktualizací.
            - **Pravidelné bezpečnostní audity** – minimalizují riziko zranitelností.
            - **Zálohování a monitoring** – základ stability provozu.
            
            ---
            
            > Důsledná údržba a otevřený systém pro zpětnou vazbu udrží aplikaci bezpečnou a dlouhodobě použitelnou pro všechny uživatele.
            ---

### 📦 **Tipy na formáty pro sdílení/databázi:**
- **Záloha/export:** JSON, CSV, PDF (reporty), SQLite (pro menší instalace), full dump SQL
- **Dokumentace:** Markdown (README, help), PDF (uživatelská příručka)
- **Design:** PNG/JPG (wireframy), Figma/Sketch soubory


            ## Záloha a export dat
            
            - **JSON**  
              - Pro univerzální export/import dat (mezi systémy, záloha pro obnovu).
              - Snadno čitelné i strojově zpracovatelné.
            
            - **CSV**  
              - Vhodné pro export tabulkových dat (platby, odečty, evidenční seznamy).
              - Otevřitelné v Excelu, Google Sheets.
            
            - **PDF**  
              - Výstupní reporty, potvrzení pro uživatele, tiskové sestavy.
              - Neměnný formát, vhodný pro archiv a sdílení.
            
            - **SQLite**  
              - Pro menší instalace/aplikace bez serveru (single file database).
              - Vhodné i pro rychlé prototypy a offline použití.
            
            - **Full dump SQL**  
              - Kompletní záloha celé databáze (pro administrátory, migrace, obnovu systému).
            
            ---
            
            ## Dokumentace
            
            - **Markdown (.md)**  
              - README, help, návody, technická dokumentace.
              - Přehledné, verzovatelné (GitHub, GitLab).
            
            - **PDF**  
              - Uživatelská příručka, oficiální dokumentace pro tisk nebo stahování.
            
            ---
            
            ## Design a wireframy
            
            - **PNG/JPG**  
              - Obrázky obrazovek, wireframy, schémata do dokumentace a prezentací.
            
            - **Figma, Sketch soubory**  
              - Zdrojové návrhy UI/UX pro další úpravy a sdílení s designéry.
            
            ---

            ## Doporučení
            
            - Umožni uživatelům stahovat/exportovat data v různých formátech podle potřeby.
            - Udržuj aktuální dokumentaci v Markdownu, finální příručky/exporty publikuj i jako PDF.
            - Designové zdroje zálohuj v původním formátu (Figma/Sketch) a sdílej exporty jako obrázky.

---
### 📦 **Tipy na formáty pro sdílení/databázi:**
- **Záloha/export:** JSON, CSV, PDF (reporty), SQLite (pro menší instalace), full dump SQL
- **Dokumentace:** Markdown (README, help), PDF (uživatelská příručka)
- **Design:** PNG/JPG (wireframy), Figma/Sketch soubory---


            ## Záloha a export dat
            
            - **JSON**  
              - Pro univerzální export/import dat (mezi systémy, záloha pro obnovu).
              - Snadno čitelné i strojově zpracovatelné.
            
            - **CSV**  
              - Vhodné pro export tabulkových dat (platby, odečty, evidenční seznamy).
              - Otevřitelné v Excelu, Google Sheets.
            
            - **PDF**  
              - Výstupní reporty, potvrzení pro uživatele, tiskové sestavy.
              - Neměnný formát, vhodný pro archiv a sdílení.
            
            - **SQLite**  
              - Pro menší instalace/aplikace bez serveru (single file database).
              - Vhodné i pro rychlé prototypy a offline použití.
            
            - **Full dump SQL**  
              - Kompletní záloha celé databáze (pro administrátory, migrace, obnovu systému).
            
            ---
            
            ## Dokumentace
            
            - **Markdown (.md)**  
              - README, help, návody, technická dokumentace.
              - Přehledné, verzovatelné (GitHub, GitLab).
            
            - **PDF**  
              - Uživatelská příručka, oficiální dokumentace pro tisk nebo stahování.
            
            ---
            
            ## Design a wireframy
            
            - **PNG/JPG**  
              - Obrázky obrazovek, wireframy, schémata do dokumentace a prezentací.
            
            - **Figma, Sketch soubory**  
              - Zdrojové návrhy UI/UX pro další úpravy a sdílení s designéry.
            
            ---
            
            ## Doporučení
            
            - Umožni uživatelům stahovat/exportovat data v různých formátech podle potřeby.
            - Udržuj aktuální dokumentaci v Markdownu, finální příručky/exporty publikuj i jako PDF.
            - Designové zdroje zálohuj v původním formátu (Figma/Sketch) a sdílej exporty jako obrázky.
            
            ---

### 📱 **Tipy pro mobilní ovládání:**
- Vždy testuj workflow na malých displejích, neukazuj zbytečnosti.
- Používej „bottom navigation“ nebo hamburger menu pro hlavní sekce.
- Důležité akce (přidat platbu, nahlásit závadu) dej na max. 2 kliky.
- Zkontroluj, že formuláře se dobře vyplňují prstem a jsou čitelné.
            
            - **Průběžně testuj workflow na malých displejích**  
              Ověř, že všechny hlavní akce zvládneš pohodlně provést i na mobilu. Nepřeplňuj obrazovku zbytečnostmi – zobrazuj jen to, co uživatel aktuálně potřebuje.
            
            - **Navigace: „bottom navigation“ nebo hamburger menu**  
              Pro hlavní sekce (Dashboard, Platby, Údržba, Energie, Dokumenty) použij spodní lištu nebo skryté menu.  
              Výhoda: rychlý přístup palcem, přehlednost i na menší obrazovce.
            
            - **Důležité akce na max. 2 kliky**  
              Přidání platby, nahlášení závady, evidence dokumentu – vždy dostupné z hlavní obrazovky nebo plovoucího tlačítka („FAB“ – Floating Action Button).  
              Zkrať cestu uživatele, ať nemusí složitě hledat.
            
            - **Formuláře optimalizuj pro dotyk**  
              - Dostatečně velká pole a tlačítka (min. 44×44 px).
              - Jasné označení povinných polí.
              - Automatické vyplnění, nabídka typů klávesnice (čísla pro částky, e-mail pro přihlášení...).
              - Validace ihned po zadání (inline).
            
            - **Čitelnost a kontrast**  
              - Používej dostatečně velké písmo (min. 16px).
              - Vysoký kontrast textu a pozadí.
              - Omez rušivé prvky a texty.
            
            ---
            
            > Dobré mobilní UX znamená rychlou a pohodlnou práci kdykoliv a kdekoliv. Testuj s reálnými uživateli a zařízeními!
            
            ---

> Tento seznam slouží jako roadmapa – v každém bodě můžeš jít víc do detailu, nebo se kdykoli vrátit a vylepšovat podle potřeby.
