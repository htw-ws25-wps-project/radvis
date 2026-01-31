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
/**
 * Repräsentiert ein Foto, das zu einer {@link Report}-Meldung gehört.
 * <p>
 * Ein {@code ReportPhoto} speichert die Binärdaten des Bildes sowie Metadaten wie Dateiname,
 * Content-Type und (optional) die Größe.
 * </p>
 *
 * <h2>Fachliche Regeln / Invarianten</h2>
 * <ul>
 *   <li>{@link #data} muss gesetzt sein und darf nicht leer sein.</li>
 *   <li>{@link #contentType} muss gesetzt sein.</li>
 *   <li>Erlaubte {@link #contentType Content-Types}: {@code image/jpeg} und {@code image/png}.</li>
 * </ul>
 *
 * <h2>Beziehung zur Meldung</h2>
 * Das Foto ist {@code @ManyToOne} einer {@link Report}-Entität zugeordnet.
 * Die Zuordnung wird über {@link #assignToReport(Report)} gesetzt und wird typischerweise
 * durch {@link Report#addPhoto(ReportPhoto)} hergestellt.
 */
public class ReportPhoto extends AbstractEntity {

	/**
	 * Binärdaten des Bildes.
	 * <p>
	 * Persistiert als LOB (Large Object). Darf nicht {@code null} und nicht leer sein.
	 * </p>
	 */
	@Lob
	private byte[] data;

	/**
	 * Optionaler Dateiname (z. B. der ursprüngliche Upload-Name).
	 */
	private String filename;

	/**
	 * MIME-Type des Bildes, z. B. {@code image/jpeg} oder {@code image/png}.
	 * Muss gesetzt sein und zu den unterstützten Typen gehören.
	 */
	private String contentType;

	/**
	 * Optionale Größe des Bildes (typischerweise in Bytes).
	 */
	private Long size;

	/**
	 * Zugehörige Meldung, zu der dieses Foto gehört.
	 */
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

	/**
	 * Prüft, ob der übergebene Content-Type unterstützt wird.
	 *
	 * @param contentType zu prüfender MIME-Type
	 * @return {@code true}, wenn {@code contentType} {@code image/jpeg} oder {@code image/png} ist, sonst {@code false}
	 */
	private boolean isSupportedContentType(String contentType) {
		return "image/jpeg".equals(contentType) ||
			"image/png".equals(contentType);
	}

	/**
	 * Ordnet dieses Foto einer Meldung zu.
	 * <p>
	 * Diese Methode setzt die {@link #report}-Referenz. Sie wird in der Regel indirekt über
	 * {@link Report#addPhoto(ReportPhoto)} aufgerufen, um die bidirektionale Beziehung konsistent zu halten.
	 * </p>
	 *
	 * @param report die Meldung, der dieses Foto zugeordnet werden soll (nicht {@code null})
	 */
	public void assignToReport(Report report) {
		require(report, notNullValue());
		this.report = report;
	}
}
