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
import de.wps.radvis.backend.mangel.schnittstelle.view.IssueLabelView;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
/**
 * REST-Controller zur Bereitstellung der verfügbaren {@link Issue}-Kategorien.
 * <p>
 * Stellt Endpunkte bereit, um entweder die reinen Enum-Werte oder eine für UI-Zwecke geeignete
 * Schlüssel/Label-Repräsentation abzurufen.
 * </p>
 */
public class IssueController {

	/**
	 * Liefert alle verfügbaren {@link Issue}-Werte.
	 * <p>
	 * Hinweis: Je nach Jackson-Konfiguration/Annotations am Enum kann die JSON-Repräsentation
	 * z. B. als Name oder als Label erfolgen.
	 * </p>
	 *
	 * @return Liste aller {@link Issue}-Werte
	 */
	@GetMapping("/issues")
	public List<Issue> getIssues() {
		return List.of(Issue.values());
	}

	/**
	 * Liefert alle verfügbaren {@link Issue}-Werte als Schlüssel/Label-Paare.
	 * <p>
	 * {@link IssueLabelView#key()} entspricht dabei typischerweise dem Enum-Namen
	 * (z. B. {@code SCHLAGLOCH}); {@link IssueLabelView#label()} dem menschenlesbaren Text.
	 * </p>
	 *
	 * @return Liste von {@link IssueLabelView} zur Anzeige im Frontend (z. B. Dropdown)
	 */
	@GetMapping("/issue-labels")
	public List<IssueLabelView> getIssueLabels() {
		return Arrays.stream(Issue.values())
			.map(issue -> new IssueLabelView(issue.name(), issue.getLabel()))
			.toList();
	}
}
