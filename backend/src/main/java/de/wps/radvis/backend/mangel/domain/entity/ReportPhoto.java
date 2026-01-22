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
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static org.hamcrest.CoreMatchers.notNullValue;
import static org.valid4j.Assertive.require;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportPhoto extends AbstractEntity {

	@Lob
	private byte[] data;

	private String filename;

	private String contentType;

	private Long size;

	@ManyToOne
	private Report report;

	@Builder
	private ReportPhoto(Long id, byte[] data, String filename, String contentType, Long size) {
		super(id);

		require(data, notNullValue());
		require(data.length > 0, "Bild darf nicht leer sein");
		require(contentType, notNullValue());

		require(isSupportedContentType(contentType),
			"Ungültiger Dateityp: " + contentType + ". Nur JPG und PNG sind erlaubt.");

		this.data = data;
		this.filename = filename;
		this.contentType = contentType;
		this.size = size;
	}

	private boolean isSupportedContentType(String contentType) {
		return "image/jpeg".equals(contentType) ||
			"image/png".equals(contentType);
	}

	public void assignToReport(Report report) {
		require(report, notNullValue());
		this.report = report;
	}
}
