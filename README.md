> ⚠️ **Hinweis**  
> Dieses Repository basiert auf einem **Fork von RadVIS** und erweitert das
> bestehende System um Funktionen zur **Speicherung, Verwaltung und Darstellung
> von Mängelmeldungen**.
>
> Die Erfassung neuer Mängelmeldungen (Formular, Kartenklick, Foto-Upload)
> erfolgt über eine **separate Mängelmelder-App**, die in einem eigenen
> Repository umgesetzt ist.

---

# Kontext: RadVIS
RadVIS ist eine Client-Server-Anwendung zur Erfassung und Verwaltung der Radverkehrsinfrastruktur. Das System wurde 2021 vom _Ministerium für Verkehr Baden-Württemberg_ in Auftrag gegeben und seither stetig weiterentwickelt. Weitere Informationen und Hintergründe finden Sie auf der [Projekt-Seite zu aktivmobil BW](https://www.aktivmobil-bw.de/radverkehr/raddaten/radvis-bw/).

## Webclient

Zur Ansicht und Bearbeitung der Daten bietet RadVIS einen Webclient, der als Single-Page-Application umgesetzt ist. Zentrales Element ist die Kartenansicht, auf der die Radverkehrsinfrastruktur dargestellt und bearbeitet werden kann. Auf der Karte stehen grundlegende Werkzeuge zur Verfügung wie eine Ortssuche oder ein Messwerkzeug.

![RadVIS-Webclient](./radvis-webclient.png "RadVIS-Webclient mit der Karte als zentrales Werkzeug")

RadVIS arbeitet auf einem Knoten-Kanten-Modell (Grundnetz), in welchem alle Attribute erfasst werden, die für den Radverkehr relevant sind. Das sind z.B. Belagart, Radverkehrsführung, erlaubte Geschwindigkeit, Baulastträger uvm. Die Attribute können abschnitts- und seitengenau erfasst werden. Die Kanten des Grundnetz können außerdem einzelnen Netzklassen zugeordnet werden, sodass es möglich ist, z.B. nur das Kreisnetz anzuzeigen.

![Grundnetz-Editor](./grundnetz-editor.png "Erfassung diverser Attribute im Grundnetz abschnitts- und seitenbezogen möglich")

Auf dem Grundnetz können weitere Infrastrukturen rund um den Radverkehr erfasst werden. Dies beinhaltet u. A. Fahrradrouten, Maßnahmen, Barrieren und wegweisende Beschilderung. Für jede dieser Infrastrukturen sind spezifische Daten und Prozesse im System modelliert.

![Infrastrukturen-Ansicht](./infrastrukturen-ansicht.png "Anzeige von Infrastrukturen auf der Karte und tabellarisch")

Die Infrastrukturen werden als Tabelle und auf der Karte dargestellt. RadVIS bietet verschiedene Formate zum Download an sowie standardisierte Geo-Dienste. Auch ein manueller Upload ist möglich; die Daten werden dann auf das bestehende Netz abgebildet und integriert.

Beim Entwickeln des Webclients wurden Gesichtspunkte wie Tastaturbedienbarkeit und Barrierefreiheit berücksichtigt.

## Server

Der Server übernimmt 3 wesentliche Aufgaben:

**Verwaltung der Nutzerdaten und fachliche Prozesse.** Dies ist nach den Prinzipien von Domain-Driven Design modelliert.

**Bereitstellung der Geo-Daten in allen erforderlichen Formaten.** Dazu wird ein dedizierter [GeoServer](https://geoserver.org/) bereitgestellt.

**Import von Daten und Abgleich dieser mit dem RadVIS-Grundnetz.** Dabei kommen verschiedene Algorithmen und Metriken zum Einsatz, um eine Abbildung der Daten vorzunehmen und deren Güte zu bewerten. Auftretende Probleme werden für Nutzer gesammelt und im Webclient dargestellt.

## Dieses Repository: RadVIS mit integriertem Mängelmodul

Dieses Repository basiert auf einem **Fork des RadVIS-Systems** und erweitert
den bestehenden Funktionsumfang um ein **integriertes Mängelmodul**.

Die Integration erfolgt **direkt innerhalb von RadVIS** und umfasst folgende
Aspekte:

### Fachliche Erweiterungen

- Persistierung von Mängelmeldungen im RadVIS-Datenmodell
- Speicherung von:
  - Art der Mängeln
  - Status der Meldung
  - Beschreibung
  - Geokoordinaten
  - optionalen Fotos
- Einsicht und Verwaltung der Mängelmeldungen im Administrationssystem

### Backend-Integration

- Erweiterung des bestehenden RadVIS-Backends um:
  - neue Entities für Mängelmeldungen
  - REST-Endpunkte zur Entgegennahme und Verarbeitung von Mängeldaten
- Anbindung externer Clients (z. B. der Mängelmelder-App) über definierte APIs
- Validierung und fachliche Verarbeitung der eingehenden Meldungen

### Integration im Admin- und Webclient

- Darstellung aller Mängelmeldungen im Administrationsbereich als:
  - Tabelle
  - Liste
- Auswahl einzelner Mängelmeldungen mit:
  - automatischer Fokussierung und Hervorhebung auf der Karte
- Verknüpfung der Mängelmeldungen mit bestehenden RadVIS-Kartenfunktionen
- Anzeige der Mängelmeldungen im Editor
- Änderung des Bearbeitungsstatus von Mängelmeldungen gemäß definiertem Workflow
- Anzeige der zu einer Mängelmeldung hinterlegten Fotos im Administrationsbereich

### Abgrenzung zur Mängelmelder-App

Die **Mängelmelder-App** ist eine eigenständige Anwendung und dient ausschließlich
der **Erfassung** neuer Mängelmeldungen (Formular, Kartenklick, Foto-Upload).

Dieses Repository übernimmt die **Integration der Mängelmeldungen in RadVIS**,
einschließlich Speicherung, Verwaltung und Visualisierung im bestehenden
RadVIS-System.

<img width="1862" height="1089" alt="oie_10121746jYO8HJ2R" src="https://github.com/user-attachments/assets/55281362-35e0-47b9-975e-811c1ac279e3" />


## Dokumentation

Dieses Repository stellt mehrere Ebenen der Dokumentation bereit, um sowohl die
Nutzung als auch die fachliche und technische Erweiterung des RadVIS-Systems
durch das integrierte Mängelmodul nachvollziehbar zu machen.

### API-Dokumentation (Swagger)

Die REST-Schnittstellen zur Verarbeitung von Mängelmeldungen sind über Swagger
dokumentiert. Dies ermöglicht das Testen der Endpunkte ohne separates Frontend.

**Lokale Swagger UI:**
http://localhost:8080/swagger-ui/index.html

**Externe Swagger-Dokumentation (SwaggerHub):**  
https://app.swaggerhub.com/apis/YADIGARCC/radvis_maengelmelder/1.0.0

**Zweck:**
- Dokumentation der REST-Endpunkte
- Übersicht über Request- und Response-Strukturen
- Testen der API während der Entwicklung


### Technische Dokumentation (Javadoc)

Die interne Implementierung des integrierten Mängelmoduls, insbesondere die
fachlichen Erweiterungen im Backend (z. B. Entities, Services und Controller),
ist über Javadoc dokumentiert.

**Generierung der Javadoc-Dokumentation:**

Da im Projekt Lombok, Checkstyle und Spotless verwendet werden, empfiehlt sich
folgender Befehl zur Generierung der Dokumentation ohne Build-Abbrüche durch
generierten Code:

```bash
cd backend
mvn javadoc:javadoc \
  -Dcheckstyle.skip \
  -Dspotless.check.skip \
  -Dmaven.javadoc.failOnError=false
```
**Anzeige:**

Nach erfolgreicher Generierung kann die Dokumentation im Browser geöffnet
werden unter:
backend/target/site/apidocs/index.html

### Frontend-Dokumentation (Compodoc)

Für das Angular-Frontend wird Compodoc zur automatisierten Erstellung einer
technischen Dokumentation eingesetzt.

**Generierung der Compodoc-Dokumentation:**

```bash
cd frontend
npm run compodoc
```

**Anzeige:**

Die generierte Dokumentation befindet sich anschließend unter:
frontend/documentation/index.html

## Kontakt

Bei Interesse an einer Demonstration des Systems wenden Sie sich bitte an [vertrieb@wps.de](mailto:vertrieb@wps.de).
