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
 * View/DTO zur Ausgabe einer {@code Issue}-Kategorie als Schlüssel-Label-Paar.
 * <p>
 * Wird typischerweise verwendet, um dem Frontend eine Liste aller Kategorien mit
 * technischem Schlüssel ({@link #key()}) und menschenlesbarer Bezeichnung ({@link #label()})
 * bereitzustellen (z. B. für Dropdowns).
 * </p>
 *
 * @param key technischer Schlüssel (i. d. R. der Enum-Name, z. B. {@code SCHLAGLOCH})
 * @param label Anzeige-Text für Nutzer (z. B. {@code "Schlagloch"})
 */
public record IssueLabelView(String key, String label) {
}
