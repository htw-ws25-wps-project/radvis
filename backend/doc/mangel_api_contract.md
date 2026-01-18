# API-Contract: Fachmodul Mängel-Management (RadVIS)

## 1. Fachliche & Architektur-Festlegung 
* **Backend-Modell:** `Report` (Tabelle: `report`)
* **Frontend-Fachobjekt:** `Mangel`
* **Zuordnung:** Ein `Report` im Backend repräsentiert fachlich einen `Mangel` im Frontend.
* **Basis-Architektur:** * Alle Entities (`Report`, `ReportPhoto`) erben von **`AbstractEntity`**.
  * Zentralisierte ID-Generierung über eine Datenbank-Sequenz (`hibernate_sequence`).

---

## 2. Endpunkte 

Basis-URL: `http://localhost:8080/api`

| Methode | Pfad | Zweck | Request-Typ | Response-Typ |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/issues` | Liste der technischen Kategorien | - | `List<String>` |
| **GET** | `/issue-labels` | Keys & Anzeige-Labels für UI | - | `List<IssueLabelView>` |
| **POST** | `/reports` | Mangel erstellen inkl. Fotos | `multipart/form-data` | `ReportView` (201) |
| **GET** | `/reports` | Liste aller Mängel | - | `List<ReportView>` |
| **GET** | `/reports/{id}` | Einzelansicht eines Mangels | - | `ReportView` |

---

## 3. Datenstrukturen & Geometrie 

### 3.1 SaveReportCommand (Request POST)
Die Daten werden als Form-Parameter übertragen (`@ModelAttribute`).

| Feld | Typ | Pflicht | Validierung / DB-Typ |
| :--- | :--- | :--- | :--- |
| `issue` | `String` | Ja | Entspricht Enum `Issue`, `VARCHAR(255)` |
| `description` | `String` | Nein | Max. 1000 Zeichen, `VARCHAR(1000)` |
| `latitude` | `BigDecimal` | Ja | Teil von `geometry(Point, 4326)` |
| `longitude` | `BigDecimal` | Ja | Teil von `geometry(Point, 4326)` |
| `files` | `MultipartFile[]` | Nein | Foto-Upload (JPEG/PNG) |

### 3.2 ReportView (Response GET/POST)
| Feld | Typ | Beschreibung |
| :--- | :--- | :--- |
| `id` | `Long` | Generierte ID aus `AbstractEntity` (BIGINT) |
| `issue` | `String` | Das **Anzeige-Label** (z.B. "Schlagloch") |
| `description` | `String` | Freitextbeschreibung |
| `longitude` | `double` | X-Wert aus der JTS-Geometrie |
| `latitude` | `double` | Y-Wert aus der JTS-Geometrie |
| `created` | `LocalDateTime` | Entspricht `creation_date` (TIMESTAMP) |

---

## 4. Persistenz & Datenbank (Liquibase)

### 4.1 Geodaten (PostGIS)
Die Speicherung erfolgt unter Nutzung von PostGIS-Funktionalitäten:
* **Spalte:** `geometrie`
* **Typ:** `geometry(Point, 4326)`
* **Logik:** Der `SaveReportCommandConverter` transformiert `longitude` (X) und `latitude` (Y) in ein JTS-Punkt-Objekt.

### 4.2 Foto-Management (`report_photo`)

* **Verknüpfung:** Über `report_id` (Foreign Key).
* **Cascade:** Es gilt `ON DELETE CASCADE`. Beim Löschen eines Mangels werden alle zugehörigen Fotos automatisch gelöscht.
* **Dateien:** Speicherung als `BLOB` (Binary Large Object).

### 4.3 ID-Generierung
* **Sequenz:** `hibernate_sequence`
* **Verfahren:** `pooled` (Initial: 1, Increment: 100).
* Alle Entities nutzen dieses Schema über die `AbstractEntity`.

---

## 5. Validierungen & Limits
* **Dateigröße:** Maximal 10 MB pro Einzeldatei / 30 MB pro Request (validiert im Converter).
* **Dateityp:** Nur `image/jpeg` und `image/png` sind erlaubt (validiert in `ReportPhoto`).
* **Kategorien:** Nicht erkannte `issue`-Werte werden auf `KEINE_KATEGORIE` gemappt.

---
**Status:** Version 1.3 (API-Contract inkl. Persistenz-Spezifikation)