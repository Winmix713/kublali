# Winmix Predikciós Rendszer - Projekt Áttekintés

## Projekt Cél

A projekt célja egy olyan sportfogadási predikciós rendszer létrehozása, amely statisztikai adatok, gépi tanulás és felhasználói visszajelzések segítségével pontos előrejelzéseket ad labdarúgó mérkőzésekre. A rendszer a lehető legátláthatóbb és leginformatívabb módon jeleníti meg a predikciókat, statisztikákat és egyéb releváns információkat a felhasználók számára.

## Jelenlegi Állapot

A projekt fejlesztése folyamatban van. Az alábbi főbb részek készültek el eddig:

- **Backend**: A Node.js (Express) backend alapjai elkészültek, az API végpontok implementálva lettek az adatok lekéréséhez, tárolásához és frissítéséhez. A /matches és a /settings útvonalak működnek.

- **Frontend**: A React frontend alapjai elkészültek, a Next.js keretrendszer, a Tailwind CSS és a Shadcn/ui integrálva. A UI komponensek nagy része elkészült (a Figma alapján), de a design még nem teljes. A /stats és /login útvonalak kidolgozása folyamatban van.

- **Gépitanulás**: A Python környezet beállítva, az adatfeldolgozás elkezdődött. A logisztikus és a lineáris regressziós modellekkel első tesztek elvégezve. Az API-n keresztüli kommunikáció a backend és a Python modellek között implementálva.

## Prioritások

1. A gépitanulási modellek (Python) integrációjának befejezése.
2. A frontend oldalak (statisztikák, beállítások, predikciók) és a hiányzó komponensek implementálása.
3. A felhasználói bejelentkezés és a jogosultságkezelés implementálása.
4. A manuális eredmény-rögzítés funkció befejezése.
5. Tesztelés és hibajavítás.

## Technológiai Háttér

- Backend: Node.js, Express, MySQL
- Frontend: React, Next.js, Tailwind CSS, Shadcn/ui
- Gépitanulás: Python (scikit-learn, TensorFlow/PyTorch)
- Adatbázis: MySQL
- API Kommunikáció: REST API, JSON
- Verziókezelés: Git, GitHub

## Források

- GitHub Repó: https://github.com/Winmix713/nartinko
- Figma: [link a Figma fájlhoz]
- API Dokumentáció: combined_matches_api.php-t leíró TXT, combined_matches.json

## Függőben Lévő Feladatok

### Backend:
- Gépitanulási modellekkel való kommunikáció befejezése.
- Predikciós logika finomhangolása.
- Súlyozási paraméterek dinamikus kezelése.
- Visszacsatolási mechanizmus implementálása.
- Felhasználókezelés és jogosultságkezelés implementálása.
- Manuális eredmény-rögzítés funkciójának befejezése.
- /api/predict végpont megírása a Python API hívásához, a súlyozáshoz.

### Frontend:
- A hiányzó oldalak és komponensek implementálása (statisztikák oldal, vezérlőpult).
- A design és a layout véglegesítése.
- A gépitanulási modellek által adott válaszok megjelenítésének javítása.
- Felhasználói felület reszponzívvá tétele.
- Bejelentkezési rendszer integrálása.
- Tesztelés és hibajavítás.

### Gépi Tanulás:
- Az adatok további elemzése és előfeldolgozása.
- A gépitanulási modellek betanítása, tesztelése és finomhangolása.
- További modellek (pl. neurális hálózatok, ensemble learning) bevezetése.
- A modellek integrálása a backend API-val.
- A Python API-n keresztüli kommunikáció megvalósítása.

## Hiányosságok

- A dokumentum még nem teljes, folyamatosan bővíteni kell.
- A design és a layout véglegesítése a frontend oldalon várat még magára.
- A Figma link, és a combined_matches.json fájl hiányzik a repóbol.
- A demó oldal nem készült el.
- Az adatok nincsenek validálva.
- A súlyozási paraméterek változtatásánál, még nincs beállítva a leküldés a backendnek, nincs kész a POST kérés a /settings végpontra.
- A /api/predict útvonal meghívása nincs összekötve a Python modellel.

## Kérdések:

- Van-e további adat, amit a gépitanulási modellnek fel kellene dolgoznia?

## Jövőbeli Fejlesztési Tervek

1. Automatikus Adatgyűjtés és Frissítés
2. Többnyelvű Felhasználói Felület
3. Haladó Vizualizációk és Elemzések
4. Predikciós Algoritmus Folyamatos Fejlesztése
5. Gondolkodó Chatbot Integráció
6. Gamifikáció
7. Közösségi Interakció
8. Adatminőség Ellenőrző Modul
9. Mobilapplikáció
10. API Szolgáltatás Harmadik Felek Számára
11. Biztonság és Adatvédelem
12. Offline Hozzáférés és Előrejelzések
13. Felhasználói Személyre Szabás
14. Történeti Adatok Elemzése

(A fenti fejlesztési tervek részletes leírása és további javaslatok a teljes dokumentumban találhatók.)