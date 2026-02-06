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

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

/**
 * Kategorisierung (Issue) einer Mangelmeldung.
 * <p>
 * Ein {@code Issue} beschreibt die fachliche Einordnung eines gemeldeten Problems (z. B. Schäden,
 * fehlende Infrastruktur, Markierungsprobleme usw.). Die Werte werden u. a. über die Schnittstelle
 * bereitgestellt (siehe {@code GET /issues}) und können im {@code Report} gespeichert werden.
 * </p>
 *
 * <h2>Verwendung</h2>
 * <ul>
 *   <li>In {@code Report} als Feld {@code issue}; wenn kein Wert angegeben wird, kann ein
 *   Default (z. B. {@code KEINE_KATEGORIE}) gesetzt werden.</li>
 *   <li>Über {@code IssueController#getIssues()} zur Anzeige/Auswahl im Frontend.</li>
 * </ul>
 *
 * <h2>Hinweis zur Persistenz/Serialisierung</h2>
 * Wird ein {@code Issue} als {@code EnumType.STRING} persistiert oder als String über JSON übertragen,
 * sind nachträgliche Umbenennungen von Enum-Konstanten in der Regel inkompatibel und sollten vermieden werden.
 */
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public enum Issue {
	SCHLAGLOCH("Schlagloch"),
	SCHLECHTER_STRASSENBELAG("Schlechter Straßenbelag"),
	BEWUCHS("Bewuchs"),
	FEHLENDE_BESCHILDERUNG("Fehlende Beschilderung"),
	FALSCHE_BESCHILDERUNG("Falsche Beschilderung"),
	POLLER_HINDERNIS("Poller/Hindernis"),
	UNKLARE_MARKIERUNG("Unklare Markierung"),
	UNEBENHEITEN_BODENWELLEN("Unebenheiten/Bodenwellen"),
	KEINE_KATEGORIE("Keine Kategorie");

	private final String label;

	@JsonValue
	public String getLabel() {
		return this.label;
	}

	@JsonCreator
	public static Issue fromValue(String value) {
		for (Issue issue : Issue.values()) {
			if (issue.name().equalsIgnoreCase(value) || issue.label.equalsIgnoreCase(value)) {
				return issue;
			}
		}
		throw new IllegalArgumentException("Unbekannter Issue-Typ: " + value);
	}
}
