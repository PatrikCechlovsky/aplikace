@echo off
REM Vytvoření složky a podadresářů
mkdir aplikace
cd aplikace
mkdir src
mkdir src\modules
mkdir src\schema

REM Vytvoření souborů

REM README.md
echo. > README.md
echo # Aplikace pro správu pronajímatelů a nájemníků>> README.md
echo.>> README.md
echo Moderní webová aplikace pro evidenci, správu a propojení pronajímatelů, nájemníků a zastupujících osob včetně správy nemovitostí, jednotek a dalších souvisejících entit. Vše dle požadavků – modulární, přehledné, v češtině a s vlastním moderním designem.>> README.md
echo.>> README.md
echo Další obsah README.md najdeš v chatu, nebo ho sem doplň ručně.>> README.md

REM App.js
echo import React, { useState } from "react";> src\App.js
echo import PronajimatelModule from "./modules/Pronajimatel";>> src\App.js
echo import NajemnikModule from "./modules/Najemnik";>> src\App.js
echo import ZastupujiciModule from "./modules/Zastupujici";>> src\App.js
echo import "./App.css";>> src\App.js
echo.>> src\App.js
echo const modules = [>> src\App.js
echo   { id: "pronajimatel", label: "Pronajímatelé", component: ^<PronajimatelModule /^> },>> src\App.js
echo   { id: "najemnik", label: "Nájemníci", component: ^<NajemnikModule /^> },>> src\App.js
echo   { id: "zastupujici", label: "Zastupující osoby", component: ^<ZastupujiciModule /^> },>> src\App.js
echo ];>> src\App.js
echo.>> src\App.js
echo export default function App() {>> src\App.js
echo   const [active, setActive] = useState("pronajimatel");>> src\App.js
echo.>> src\App.js
echo   return (^> >> src\App.js
echo     ^<div className="app"^> >> src\App.js
echo       ^<aside className="sidebar"^> >> src\App.js
echo         ^<div className="brand"^> >> src\App.js
echo           ^<span role="img" aria-label="home"^>🏠^</span^> >> src\App.js
echo           ^<strong^>Aplikace pronajímatel^</strong^> >> src\App.js
echo         ^</div^> >> src\App.js
echo         ^<nav^> >> src\App.js
echo           {modules.map((mod) =^> (>> src\App.js
echo             ^<div>> src\App.js
echo               key={mod.id}>> src\App.js
echo               className={`nav-item${active === mod.id ? " active" : ""}`}>> src\App.js
echo               onClick={() =^> setActive(mod.id)}> >> src\App.js
echo               {mod.label}>> src\App.js
echo             ^</div^> >> src\App.js
echo           ))}>> src\App.js
echo         ^</nav^> >> src\App.js
echo         ^<div className="mini"^>Klikni na modul pro zobrazení.^</div^> >> src\App.js
echo       ^</aside^> >> src\App.js
echo       ^<main^> >> src\App.js
echo         {modules.find((m) =^> m.id === active)?.component}>> src\App.js
echo       ^</main^> >> src\App.js
echo     ^</div^> >> src\App.js
echo   );>> src\App.js
echo }>> src\App.js

REM App.css
echo :root {> src\App.css
echo   --bg: #0b0f14;>> src\App.css
echo   --card: #121821;>> src\App.css
echo   --muted: #99a3b3;>> src\App.css
echo   --text: #e6edf3;>> src\App.css
echo   --brand: #4cc9f0;>> src\App.css
echo   --accent: #80ffdb;>> src\App.css
echo   --border: #1c2430;>> src\App.css
echo   --active: #21344a;>> src\App.css
echo   --danger: #ff647f;>> src\App.css
echo   --ok: #9bffb0;>> src\App.css
echo }>> src\App.css
echo body {>> src\App.css
echo   margin:0; background:var(--bg); color:var(--text); font: 15px/1.45 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial;>> src\App.css
echo }>> src\App.css
REM Další CSS si doplň podle chatu nebo vlastních potřeb.

REM Vytvoř zbylé moduly a schema ručně – obsah najdeš v chatu!

cd ..
REM Zabal ZIP (vyžaduje PowerShell 5+)
powershell Compress-Archive -Path 'aplikace' -DestinationPath 'aplikace.zip'

echo Hotovo! ZIP najdeš jako "aplikace.zip" v této složce.
pause
