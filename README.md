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
- Verwaltung des Lebenszyklus einer Mängelmeldung (z. B. Statusänderungen)

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

### Abgrenzung zur Mängelmelder-App

Die **Mängelmelder-App** ist eine eigenständige Anwendung und dient ausschließlich
der **Erfassung** neuer Mängelmeldungen (Formular, Kartenklick, Foto-Upload).

Dieses Repository übernimmt die **Integration der Mängelmeldungen in RadVIS**,
einschließlich Speicherung, Verwaltung und Visualisierung im bestehenden
RadVIS-System.


### Ausführung der Dokumentation von RadVIS- Maengelmelder
# Backend-Entwicklung
Wir unterscheiden im Projekt zwischen der schnellen Mock-API für das Frontend-Testing und dem Core-Backend für die Geschäftslogik.

## API-Schnittstellen (Swagger)
Für das schnelle Testen der Endpunkte nutzen wir Swagger. Hier kannst du Requests direkt absenden, ohne ein Frontend zu bedienen.

Swagger UI: http://localhost:8080/swagger-ui/index.html

**Alternativ steht auch eine Swagger Doku ohne notwendige Generierung bereit**: https://app.swaggerhub.com/apis/YADIGARCC/radvis_maengelmelder/1.0.0

Nutzen: Dokumentation der REST-Endpunkte.

## Technische Dokumentation (Javadoc)
Die interne Logik, insbesondere unsere Erweiterungen im mangel-Modul und die Struktur der Entities (Report, Issue), ist über Javadoc dokumentiert.

So generierst du die technische Doku: Da wir Lombok und Checkstyle nutzen, verwende diesen Befehl im backend-Ordner, um Fehler durch generierten Code zu überspringen:

```bash
mvn javadoc:javadoc -Dcheckstyle.skip -Dspotless.check.skip -Dmaven.javadoc.failOnError=false
```

**Anzeigen**: Öffne nach dem Build die Datei target/site/apidocs/index.html in deinem Browser.

**Starten des Backends**

Um den Server lokal zu starten:
```bash
cd backend
./mvnw spring-boot:run
```
# Frontend (Angular)

Das Frontend dient der Visualisierung und Interaktion für die Nutzer.

## 1. Compodoc generieren

Compodoc erstellt eine Übersicht der Komponenten-Hierarchie und Module:
```bash
cd frontend
npm run compodoc
```

Die Dokumentation findest du danach unter: `frontend/documentation/index.html`

## 2. Frontend starten
```bash
npm install
npm start
```

Das Interface ist unter http://localhost:4200 erreichbar.

## Kontakt

Bei Interesse an einer Demonstration des Systems wenden Sie sich bitte an [vertrieb@wps.de](mailto:vertrieb@wps.de).
