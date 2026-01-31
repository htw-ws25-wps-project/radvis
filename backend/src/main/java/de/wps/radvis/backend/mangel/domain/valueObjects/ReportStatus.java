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
package de.wps.radvis.backend.mangel.domain.valueObjects;

/**
 * Status einer Mangelmeldung ({@code Report}) im Bearbeitungsprozess.
 * <p>
 * Der Status beschreibt den aktuellen Stand der Bearbeitung (offen, in Arbeit, erledigt).
 * </p>
 *
 * <h2>Hinweis zur Persistenz/Serialisierung</h2>
 * Wird dieser Enum als String (z. B. via {@code EnumType.STRING} in JPA oder als JSON-String) gespeichert/übertragen,
 * sollten Enum-Konstanten nicht umbenannt werden, da dies Abwärtskompatibilität und bestehende Daten brechen kann.
 */
public enum ReportStatus {
    /**
     * Die Meldung ist neu bzw. noch nicht in Bearbeitung genommen.
     */
    OFFEN,

    /**
     * Die Meldung wird aktuell geprüft oder bearbeitet.
     */
    IN_BEARBEITUNG,

    /**
     * Die Meldung ist abschließend bearbeitet; es sind keine weiteren Schritte vorgesehen.
     */
    ERLEDIGT
}