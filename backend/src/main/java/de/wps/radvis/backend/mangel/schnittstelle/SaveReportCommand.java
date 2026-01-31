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

import de.wps.radvis.backend.mangel.domain.valueObjects.Issue;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
/**
 * Command/DTO zum Erstellen einer neuen Mangelmeldung über die Schnittstelle.
 * <p>
 * Dieses Objekt wird typischerweise per {@code multipart/form-data} an den
 * {@code POST /api/reports}-Endpunkt übergeben. Neben den Meldungsdaten können optional
 * Bilddateien ({@link MultipartFile}) mitgesendet werden.
 * </p>
 *
 * <h2>Validierung</h2>
 * <ul>
 *   <li>{@link #description} ist optional, aber auf {@value #MAX_DESCRIPTION_LENGTH} Zeichen begrenzt.</li>
 *   <li>{@link #latitude} muss gesetzt sein und im Bereich [-90; 90] liegen.</li>
 *   <li>{@link #longitude} muss gesetzt sein und im Bereich [-180; 180] liegen.</li>
 * </ul>
 *
 * <p>
 * Hinweis: Die Validierung der Dateigrößen erfolgt nicht hier, sondern in der Konvertierung
 * (z. B. im {@code SaveReportCommandConverter}).
 * </p>
 */
public class SaveReportCommand {
    private static final int MAX_DESCRIPTION_LENGTH = 1000;
    private static final String MIN_LATITUDE_DEGREES = "-90.0";
    private static final String MAX_LATITUDE_DEGREES = "90.0";
    private static final String MIN_LONGITUDE_DEGREES = "-180.0";
    private static final String MAX_LONGITUDE_DEGREES = "180.0";

    /**
     * Optionale Kategorie der Meldung.
     * Falls nicht gesetzt, kann in der Domäne ein Standardwert verwendet werden
     * (z. B. {@code KEINE_KATEGORIE}).
     */
    private Issue issue;

    /**
     * Optionale Beschreibung des Mangels (Freitext).
     */
    @Length(max = MAX_DESCRIPTION_LENGTH)
    private String description;

    /**
     * Breitengrad in Dezimalgrad.
     */
    @NotNull
    @DecimalMin(MIN_LATITUDE_DEGREES)
    @DecimalMax(MAX_LATITUDE_DEGREES)
    private BigDecimal latitude;

    /**
     * Längengrad in Dezimalgrad.
     */
    @NotNull
    @DecimalMin(MIN_LONGITUDE_DEGREES)
    @DecimalMax(MAX_LONGITUDE_DEGREES)
    private BigDecimal longitude;

    /**
     * Optionale Liste von Bilddateien, die der Meldung zugeordnet werden sollen.
     */
    List<MultipartFile> files;
}