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
package de.wps.radvis.backend.mangel.schnittstelle;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.domain.entity.ReportPhoto;
import lombok.AllArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
/**
 * Konvertiert ein {@link SaveReportCommand} in eine {@link Report}-Domänenentität.
 * <p>
 * Verantwortlichkeiten:
 * </p>
 * <ul>
 *   <li>Validierung der Dateigrößen (Einzeldatei und Gesamtsumme).</li>
 *   <li>Umrechnung von Koordinaten (Latitude/Longitude) in eine {@link Point}-Geometrie.</li>
 *   <li>Mapping der hochgeladenen Dateien auf {@link ReportPhoto}-Entitäten.</li>
 * </ul>
 *
 * <h2>Fehlerbehandlung</h2>
 * Bei Überschreiten der Grenzwerte wird eine {@link ResponseStatusException} mit
 * {@link HttpStatus#PAYLOAD_TOO_LARGE} geworfen.
 */
public class SaveReportCommandConverter {
    private static final GeometryFactory GEOMETRY_FACTORY = new GeometryFactory();

    /**
     * Maximale Größe einer einzelnen Datei in Bytes (10 MB).
     */
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    /**
     * Maximale Gesamtgröße aller Dateien in Bytes (30 MB).
     */
    private static final long MAX_TOTAL_SIZE = 30 * 1024 * 1024; // 30 MB

    /**
     * Erstellt aus einem {@link SaveReportCommand} eine {@link Report}-Entität.
     * <p>
     * Falls Dateien vorhanden sind, werden diese als Fotos an die Meldung gehängt.
     * </p>
     *
     * @param command Eingabedaten aus der Schnittstelle
     * @return neue, noch nicht zwingend persistierte {@link Report}-Entität
     */
    public Report toReport(SaveReportCommand command) {
        validateFileSizes(command.getFiles());

        Point geometrie = toPoint(command.getLatitude(), command.getLongitude());

        Report report = Report.builder()
                .issue(command.getIssue())
                .description(command.getDescription())
                .geometrie(geometrie)
                .build();

        if (command.getFiles() != null) {
            command.getFiles().stream()
                    .map(this::mapToEntity)
                    .forEach(report::addPhoto);
        }

        return report;
    }

    /**
     * Erstellt aus Latitude/Longitude einen {@link Point}.
     * <p>
     * Konvention: Longitude wird als X, Latitude als Y gespeichert.
     * </p>
     *
     * @param latitude Breitengrad (Y)
     * @param longitude Längengrad (X)
     * @return Punktgeometrie
     */
    public static Point toPoint(BigDecimal latitude, BigDecimal longitude) {
        return GEOMETRY_FACTORY.createPoint(new Coordinate(
                longitude.doubleValue(), // Longitude ist X
                latitude.doubleValue()   // Latitude ist Y
        ));
    }

    /**
     * Prüft die Größenbeschränkungen der hochgeladenen Dateien.
     *
     * @param files Liste der Dateien (kann {@code null} oder leer sein)
     * @throws ResponseStatusException wenn eine Datei größer als {@value #MAX_FILE_SIZE} ist oder
     *                                 die Gesamtsumme {@value #MAX_TOTAL_SIZE} überschreitet
     */
    private void validateFileSizes(List<MultipartFile> files) {
        if (files == null || files.isEmpty())
            return;

        long totalSize = 0;
        for (MultipartFile file : files) {
            if (file.getSize() > MAX_FILE_SIZE) {
                throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE,
                        "Die Datei " + file.getOriginalFilename() + " überschreitet 10 MB.");
            }
            totalSize += file.getSize();
        }

        if (totalSize > MAX_TOTAL_SIZE) {
            throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE,
                    "Gesamtgröße der Bilder überschreitet 30 MB.");
        }
    }

    /**
     * Mappt eine hochgeladene Datei auf eine {@link ReportPhoto}-Entität.
     *
     * @param file hochgeladene Datei
     * @return {@link ReportPhoto}-Entität
     * @throws UncheckedIOException wenn das Lesen der Datei fehlschlägt
     */
    private ReportPhoto mapToEntity(MultipartFile file) {
        try {
            return ReportPhoto.builder()
                    .data(file.getBytes())
                    .filename(file.getOriginalFilename())
                    .contentType(file.getContentType())
                    .size(file.getSize())
                    .build();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}