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
package de.wps.radvis.backend.mangel.domain.entity;

import de.wps.radvis.backend.common.domain.entity.AbstractEntity;
import de.wps.radvis.backend.mangel.domain.valueObjects.Issue;
import de.wps.radvis.backend.mangel.domain.valueObjects.ReportStatus;
import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

import static org.hamcrest.CoreMatchers.notNullValue;
import static org.valid4j.Assertive.require;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
/**
 * Repräsentiert eine Meldung (Report) über einen Mangel bzw. ein Problem im System.
 * <p>
 * Ein {@link Report} enthält:
 * </p>
 * <ul>
 *   <li>eine Kategorie/Art des Problems ({@link #issue})</li>
 *   <li>eine optionale Beschreibung ({@link #description})</li>
 *   <li>eine Geometrie/Position als {@link Point} ({@link #geometrie})</li>
 *   <li>den Erstellzeitpunkt ({@link #creationDate})</li>
 *   <li>einen Bearbeitungsstatus ({@link #status})</li>
 *   <li>zugeordnete Fotos ({@link #photos})</li>
 * </ul>
 *
 * <h2>Fachliche Regeln / Invarianten</h2>
 * <ul>
 *   <li>{@link #geometrie} muss gesetzt sein (nicht {@code null}).</li>
 *   <li>{@link #description} darf maximal {@value #MAX_DESCRIPTION_LENGTH} Zeichen lang sein.</li>
 *   <li>Wenn {@link #issue} nicht angegeben ist, wird {@link Issue#KEINE_KATEGORIE} verwendet.</li>
 *   <li>Neu erstellte Meldungen starten mit {@link ReportStatus#OFFEN}.</li>
 * </ul>
 *
 * <h2>Persistenz</h2>
 * Die Fotos sind als {@code @OneToMany} mit {@code cascade = ALL} und {@code orphanRemoval = true}
 * modelliert. Das bedeutet, dass Fotos beim Speichern/Löschen der Meldung mitgeführt werden und
 * entfernte Fotos als verwaiste Entitäten gelöscht werden können.
 */
public class Report extends AbstractEntity {
	private static final int MAX_DESCRIPTION_LENGTH = 1000;

	/**
	 * Kategorie/Art des gemeldeten Problems.
	 * Wird als String-Wert persistiert.
	 */
	@Enumerated(EnumType.STRING)
	private Issue issue;

	/**
	 * Optionale Freitextbeschreibung zur Meldung.
	 * Darf maximal {@value #MAX_DESCRIPTION_LENGTH} Zeichen lang sein.
	 */
	private String description;

	/**
	 * Geometrische Position der Meldung (z. B. Punktkoordinate).
	 * Muss gesetzt sein (nicht {@code null}).
	 */
	private Point geometrie;

	/**
	 * Zeitpunkt der Erstellung der Meldung.
	 * Wird bei Erstellung (Builder) automatisch auf {@link LocalDateTime#now()} gesetzt.
	 */
	private LocalDateTime creationDate;

	@Setter
	@Enumerated(EnumType.STRING)
	private ReportStatus status;

	@OneToMany(
		mappedBy = "report", cascade = CascadeType.ALL, orphanRemoval = true
	)
	private java.util.List<ReportPhoto> photos = new java.util.ArrayList<>();

	@Builder
	private Report(Long id, Issue issue, String description, Point geometrie,
		java.util.List<ReportPhoto> photos) {
		super(id);

		require(geometrie, notNullValue());

		if (description != null) {
			require(description.length() <= MAX_DESCRIPTION_LENGTH,
				"Beschreibung darf max. 1000 Zeichen haben");
		}

		this.issue = (issue != null) ? issue : Issue.KEINE_KATEGORIE;
		this.description = description;
		this.geometrie = geometrie;
		this.creationDate = LocalDateTime.now();
		this.status = ReportStatus.OFFEN;

		if (photos != null) {
			photos.forEach(this::addPhoto);
		}
	}

	/**
	 * Fügt der Meldung ein Foto hinzu und stellt die bidirektionale Zuordnung her.
	 * <p>
	 * Hinweis: Diese Methode erwartet, dass {@code photo} gültig ist. Die Rückreferenz wird
	 * über {@link ReportPhoto#assignToReport(Report)} gesetzt.
	 * </p>
	 *
	 * @param photo das hinzuzufügende Foto
	 */
	public void addPhoto(ReportPhoto photo) {
		this.photos.add(photo);
		photo.assignToReport(this);
	}

}
