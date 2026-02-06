/*
 * Copyright (c) 2023 WPS - Workplace Solutions GmbH
 *
 * Licensed under the EUPL, Version 1.2 or as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
 *
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and limitations under the Licence.
 */
package de.wps.radvis.backend.mangel.schnittstelle.view;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.domain.valueObjects.Issue;

import java.time.LocalDateTime;
import java.util.List;

/**
 * View/DTO zur Ausgabe einer Mangelmeldung ({@link Report}) über die Schnittstelle.
 * <p>
 * Stellt eine für Clients geeignete, serialisierbare Darstellung bereit:
 * </p>
 * <ul>
 *   <li>{@link #issue()} als menschenlesbares Label (nicht als Enum-Name)</li>
 *   <li>Koordinaten als {@link #longitude()} (X) und {@link #latitude()} (Y)</li>
 *   <li>{@link #status()} als String (Enum-Name)</li>
 *   <li>{@link #photoUrls()} als Liste von URL-Pfaden zum Abruf der einzelnen Fotos</li>
 * </ul>
 *
 * @param id ID der Meldung
 * @param issue Anzeige-Text der Kategorie (z. B. {@code "Schlagloch"})
 * @param description optionale Beschreibung der Meldung
 * @param longitude Längengrad (X-Koordinate der gespeicherten Geometrie)
 * @param latitude Breitengrad (Y-Koordinate der gespeicherten Geometrie)
 * @param created Erstellzeitpunkt der Meldung
 * @param status Status der Meldung als String (z. B. {@code "OFFEN"})
 * @param photoUrls URL-Pfade zum Abruf der zugehörigen Fotos
 */
public record ReportView(
        Long id,
        String issue,
        String description,
        double longitude,
        double latitude,
        LocalDateTime created,
        String status,
        List<String> photoUrls
) {

    /**
     * Erstellt eine {@link ReportView} aus einer {@link Report}-Entität.
     * <p>
     * Besonderheiten:
     * </p>
     * <ul>
     *   <li>Falls {@code report.getIssue()} {@code null} ist, wird {@link Issue#KEINE_KATEGORIE} verwendet.</li>
     *   <li>Die Koordinaten werden aus der {@code Point}-Geometrie gelesen: X = Longitude, Y = Latitude.</li>
     *   <li>Für jedes Foto wird ein URL-Pfad im Format {@code /api/reports/{reportId}/photos/{photoId}} erzeugt.</li>
     * </ul>
     *
     * @param report Domänenentität der Meldung
     */
    public ReportView(Report report) {
        this(
                report.getId(),
                (report.getIssue() != null ? report.getIssue() : Issue.KEINE_KATEGORIE).getLabel(),
                report.getDescription(),
                report.getGeometrie().getX(),
                report.getGeometrie().getY(),
                report.getCreationDate(),
                report.getStatus().name(),
                report.getPhotos().stream()
                        .map(photo ->
                                "/api/reports/" + report.getId() + "/photos/" + photo.getId()
                        )
                        .toList()
        );
    }
}