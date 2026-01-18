# API-Vertrag: Fachmodul Mängel-Management (RadVIS)

## 1. Fachliche Zuordnung (T13.3)
* **Backend-Objekt:** `Report` (Entity)
* **Frontend-Fachobjekt:** `Mangel`
* **Definition:** Ein `Report` im Backend repräsentiert fachlich einen `Mangel`. Die Begriffe werden synonym verwendet.

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
Übertragung via **multipart/form-data** (aufgrund `@ModelAttribute`).

| Feld | Typ | Pflicht | Beschreibung |
| :--- | :--- | :--- | :--- |
| `issue` | `String` | Ja | Technischer Key (z. B. `SCHLAGLOCH`) |
| `description` | `String` | Nein | Max. 1000 Zeichen |
| **`latitude`** | `BigDecimal`| Ja | Y-Koordinate (Breitengrad) |
| **`longitude`** | `BigDecimal`| Ja | X-Koordinate (Längengrad) |
| `files` | `MultipartFile[]` | Nein | Bilder (JPEG/PNG) |

**Geometrie-Logik:** Das Backend (Converter) wandelt `longitude` (X) und `latitude` (Y) in ein `org.locationtech.jts.geom.Point`-Objekt (`geometrie`) um.

### 3.2 ReportView (Response / GET & POST)
Struktur für die Datenübermittlung an das Frontend.

| Feld | Typ | Beschreibung |
| :--- | :--- | :--- |
| `id` | `Long` | Eindeutige ID (via `AbstractEntity`) |
| `issue` | `String` | Das **lesbare Label** (z. B. "Schlagloch") |
| `description` | `String` | Beschreibungstext |
| **`longitude`** | `double` | X-Wert der JTS-Geometrie |
| **`latitude`** | `double` | Y-Wert der JTS-Geometrie |
| `created` | `LocalDateTime` | Erstellungszeitpunkt (`creationDate`) |

---

## 4. Listen- vs. Detailansicht (T13.4)

| Feld | Listenansicht (`GET /reports`) | Detailansicht (`GET /reports/{id}`) |
| :--- | :---: | :---: |
| `id`, `issue`, `created` | ✅ | ✅ |
| `longitude`, `latitude` | ✅ (Karten-Pin) | ✅ (Karten-Pin) |
| `description` | ❌ | ✅ |

---

## 5. Technische Validierung & Beschränkungen

### 5.1 Foto-Upload (validiert in Converter & Entity)
* **Formate:** `image/jpeg`, `image/png`.
* **Einzeldatei:** Max. **10 MB**.
* **Gesamt-Request:** Max. **30 MB**.
* **Fehler:** Bei Limit-Überschreitung erfolgt ein `413 Payload Too Large`.

### 5.2 Konsistenz
* Fehlende Kategorien werden im Backend auf `KEINE_KATEGORIE` gemappt.
* Die `description` wird auf max. 1000 Zeichen validiert.

---

**Status:** Finaler API-Contract (Migration RadVIS)