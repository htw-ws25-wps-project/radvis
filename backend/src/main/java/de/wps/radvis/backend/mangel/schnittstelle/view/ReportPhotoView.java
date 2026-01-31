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

/**
 * View/DTO zur Ausgabe eines einzelnen Fotos einer Mangelmeldung.
 * <p>
 * Enthält die Bilddaten sowie die wichtigsten Metadaten, um das Bild korrekt ausliefern und
 * im Client darstellen zu können (z. B. Content-Type und Dateiname).
 * </p>
 *
 * @param data Binärdaten des Bildes
 * @param contentType MIME-Type des Bildes (z. B. {@code image/jpeg} oder {@code image/png})
 * @param filename optionaler Dateiname (z. B. ursprünglicher Upload-Name)
 */
public record ReportPhotoView(
        byte[] data,
        String contentType,
        String filename
) {}