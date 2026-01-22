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
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

import static org.hamcrest.CoreMatchers.notNullValue;
import static org.valid4j.Assertive.require;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report extends AbstractEntity {
	private static final int MAX_DESCRIPTION_LENGTH = 1000;

	@Enumerated(EnumType.STRING)
	private Issue issue;

	private String description;

	private Point geometrie;

	private LocalDateTime creationDate;

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

		if (photos != null) {
			photos.forEach(this::addPhoto);
		}
	}

	public void addPhoto(ReportPhoto photo) {
		this.photos.add(photo);
		photo.assignToReport(this);
	}
}
