# API-Vertrag: Fachmodul Mängel-Management (RadVIS)

## 1. Fachliche Zuordnung 
* **Backend-Objekt:** `Report` (Entity)
* **Frontend-Fachobjekt:** `Mangel`
* **Zentrales Erbe:** Alle Entities (`Report`, `ReportPhoto`) erben von **`AbstractEntity`**. Dies garantiert eine konsistente, sequenzbasierte ID-Vergabe (`Long`).

---

## 2. Endpunkt-Spezifikation 

Basis-URL: `/api`

| Methode | Pfad | Zweck | Response-Typ |
| :--- | :--- | :--- | :--- |
| **GET** | `/issues` | Liste technischer Enum-Namen | `List<String>` |
| **GET** | `/issue-labels` | Keys & Anzeige-Labels (UI) | `List<IssueLabelView>` |
| **POST** | `/reports` | Mangel erstellen inkl. Foto-Upload | `ReportView` (201 Created) |
| **GET** | `/reports` | Liste aller Mängel | `List<ReportView>` |
| **GET** | `/reports/{id}` | Detailansicht eines Mangels | `ReportView` |

---

## 3. Datenstrukturen & Geometrie 

### 3.1 SaveReportCommand (Request / POST)
Übertragung via **multipart/form-data**.

| Feld | Typ | Pflicht | Beschreibung |
| :--- | :--- | :--- | :--- |
| `issue` | `String` | Ja | Technischer Key (z. B. `SCHLAGLOCH`) |
| `description` | `String` | Nein | Max. 1000 Zeichen |
| **`latitude`** | `BigDecimal`| Ja | Y-Koordinate (WGS84) |
| **`longitude`** | `BigDecimal`| Ja | X-Koordinate (WGS84) |
| `files` | `MultipartFile[]` | Nein | Bilder (JPEG/PNG) |

**Geometrie-Logik:** Das Backend wandelt `longitude` (X) und `latitude` (Y) via `GeometryFactory` in einen `org.locationtech.jts.geom.Point` um.

### 3.2 ReportView (Response / GET & POST)
| Feld | Typ | Beschreibung |
| :--- | :--- | :--- |
| **`id`** | `Long` | **Zentral generiert via AbstractEntity (pooled sequence)** |
| `issue` | `String` | Das lesbare Label (via `issue.getLabel()`) |
| `description` | `String` | Beschreibungstext |
| `longitude` | `double` | X-Wert der JTS-Geometrie |
| `latitude` | `double` | Y-Wert der JTS-Geometrie |
| `created` | `LocalDateTime` | Erstellungszeitpunkt |

---

## 4. Technische Details zur Persistenz

### 4.1 ID-Generierung
Das System nutzt einen `pooled` Sequence-Generator (`hibernate_sequence`).
* **Initial Value:** 1
* **Increment Size:** 100
  Das Frontend darf IDs niemals selbst vergeben; sie werden ausschließlich vom Backend generiert und in der Response zurückgegeben.

### 4.2 Foto-Validierung
* **Größen:** Max. 10 MB pro Datei / 30 MB Gesamt.
* **Typen:** `image/jpeg`, `image/png`.
* **Speicherung:** Fotos werden als `ReportPhoto` mit einer eigenen ID aus der zentralen Sequenz gespeichert.

---
**Status:** gitAPI-Contract (Stand: 2026-01-18)