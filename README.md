# RadVIS – Core-System (Listen-, Tabellen- und Kartenintegration)

> ⚠️ **Hinweis**  
> Dieses Repository enthält das **RadVIS-Core-System**.  
> Hier werden Mängel **persistiert**, **in Tabellen und Listen dargestellt**  
> und **im zentralen RadVIS-Webclient auf der Karte visualisiert**.  
>  
> Die eigenständige Anwendung zur **Erfassung neuer Mängelmeldungen
> (Mängelmelder-App)** ist in einem **separaten Repository** umgesetzt
> und **nicht Bestandteil dieses Repositories**.

---

## Kontext: RadVIS

RadVIS (Radverkehrsinfrastruktur-System) ist eine Client-Server-Anwendung zur
Erfassung und Verwaltung der Radverkehrsinfrastruktur.  
Das System wurde 2021 vom *Ministerium für Verkehr Baden-Württemberg* in Auftrag
gegeben und wird seither kontinuierlich weiterentwickelt.

Weitere Informationen und Hintergründe finden Sie auf der offiziellen Projektseite:  
https://www.aktivmobil-bw.de/radverkehr/raddaten/radvis-bw/

---

## Dieses Repository: RadVIS Core

Dieses Repository stellt das **zentrale RadVIS-System** bereit.  
Es ist verantwortlich für die **fachliche Verarbeitung, Speicherung und
Visualisierung** der Daten innerhalb von RadVIS.

Der Funktionsumfang dieses Repositories umfasst insbesondere:

- Persistenz von Mängelmeldungen im RadVIS-Datenmodell
- Darstellung der Mängel in **Tabellen und Listen**
- Visualisierung der Mängel im **RadVIS-Webclient auf der Karte**
- Fachliche Prozesse und Validierungen
- Bereitstellung von Schnittstellen für angebundene Anwendungen
  (z. B. den externen Mängelmelder)

Die **Erfassung neuer Mängelmeldungen** (inkl. Kartenklick, Formular und
Foto-Upload) erfolgt **nicht in diesem Repository**, sondern in einer
separaten Mängelmelder-Anwendung.

---

## Webclient

Der RadVIS-Webclient ist als Single-Page-Application umgesetzt.
Zentrales Element ist die Kartenansicht, in der die Radverkehrsinfrastruktur
sowie zugehörige Infrastrukturen – einschließlich Mängel – dargestellt
und bearbeitet werden können.

Funktionalitäten des Webclients in diesem Repository:

- Kartenbasierte Darstellung des RadVIS-Grundnetzes
- Tabellen- und Listenansichten für Infrastrukturen und Mängel
- Fokus und Hervorhebung von Objekten auf der Karte
- Attributbearbeitung im Grundnetz

---

## Backend

Das Backend bildet die fachliche Grundlage des RadVIS-Core-Systems und ist
nach den Prinzipien von Domain-Driven Design modelliert.

Zentrale Aufgaben:

- Verwaltung der fachlichen Entitäten und Prozesse
- Speicherung und Abfrage von Mängelmeldungen
- Bereitstellung der Daten für Webclient und externe Anwendungen
- Integration und Weiterverarbeitung von extern erfassten Mängeln

---

## Geo-Daten und Dienste

Für die Bereitstellung von Geo-Daten in verschiedenen Formaten wird ein
dedizierter GeoServer eingesetzt.

Funktionalitäten:

- Bereitstellung standardisierter Geo-Dienste
- Download von Daten in verschiedenen Formaten
- Integration importierter Daten in das RadVIS-Grundnetz

---

## Abgrenzung: Externe Mängelmelder-App

Die **Mängelmelder-App** ist eine eigenständige Anwendung und befindet sich
in einem **separaten Repository**.

Aufgaben der Mängelmelder-App:

- Erfassung neuer Mängelmeldungen
- Standortauswahl über Karte
- Upload optionaler Fotos
- Übergabe der Daten an das RadVIS-Core-System

Dieses Repository übernimmt **nicht** die Erfassung, sondern ausschließlich
die **Weiterverarbeitung, Speicherung und Darstellung** der Mängel im
RadVIS-Gesamtsystem.

---

## Kontakt

Bei Interesse an einer Demonstration des RadVIS-Gesamtsystems wenden Sie sich
bitte an:

vertrieb@wps.de
