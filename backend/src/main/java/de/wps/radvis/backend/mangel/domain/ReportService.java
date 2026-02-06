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
package de.wps.radvis.backend.mangel.domain;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.domain.entity.ReportPhoto;
import de.wps.radvis.backend.mangel.domain.valueObjects.ReportStatus;
import de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommand;
import de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommandConverter;
import de.wps.radvis.backend.mangel.schnittstelle.view.ReportPhotoView;
import de.wps.radvis.backend.mangel.schnittstelle.view.ReportView;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RequiredArgsConstructor
/**
 * Anwendungsspezifischer Service für das Erstellen, Lesen und Aktualisieren von Mangelmeldungen ({@link Report}).
 * <p>
 * Verantwortlichkeiten:
 * </p>
 * <ul>
 * <li>Erstellen von Meldungen aus API-Commands ({@link SaveReportCommand}) inkl. Konvertierung.</li>
 * <li>Lesen einzelner Meldungen und Abbildung auf View-Modelle ({@link ReportView}).</li>
 * <li>Auflisten aller Meldungen.</li>
 * <li>Ausliefern einzelner Fotos einer Meldung als {@link ReportPhotoView}.</li>
 * <li>Ändern des Bearbeitungsstatus ({@link ReportStatus}).</li>
 * </ul>
 *
 * <h2>Transaktionen</h2>
 * Alle Methoden laufen standardmäßig innerhalb einer Spring-Transaktion (siehe {@link Transactional} auf Klassenebene).
 */
public class ReportService {

	private final ReportRepository reportRepository;
	private final SaveReportCommandConverter converter;
	private final ReportPhotoRepository reportPhotoRepository;

	/**
	 * Erstellt eine neue Mangelmeldung aus dem übergebenen Command.
	 * <p>
	 * Die fachliche Validierung (z. B. Dateigrößen) und die Abbildung in die Domänenentität
	 * erfolgen im {@link SaveReportCommandConverter}.
	 * </p>
	 *
	 * @param command Eingabedaten zur Erstellung der Meldung
	 * @return die persistierte {@link Report}-Entität
	 */
	public Report create(SaveReportCommand command) {
		Report report = converter.toReport(command);
		return reportRepository.save(report);
	}

	/**
	 * Liefert eine Meldung als {@link ReportView}.
	 *
	 * @param id ID der Meldung
	 * @return View-Repräsentation der Meldung
	 * @throws java.util.NoSuchElementException falls keine Meldung mit der ID existiert
	 */
	public ReportView getReport(Long id) {
		return reportRepository.findById(id)
			.map(ReportView::new)
			.orElseThrow();
	}

	/**
	 * Liefert alle Meldungen als {@link ReportView}-Liste.
	 *
	 * @return Liste aller Meldungen (als Views)
	 */
	public List<ReportView> getAllReports() {
		return reportRepository.findAll().stream()
			.map(ReportView::new)
			.toList();
	}

	/**
	 * Liefert ein einzelnes Foto einer Meldung als {@link ReportPhotoView}.
	 * <p>
	 * Es wird geprüft, dass das Foto zur angegebenen Meldung gehört (via Repository-Methode
	 * {@code findByIdAndReportId}).
	 * </p>
	 *
	 * @param reportId ID der Meldung
	 * @param photoId ID des Fotos
	 * @return View mit Bilddaten und Metadaten
	 * @throws java.util.NoSuchElementException falls Meldung/Foto nicht gefunden wird oder nicht zusammengehört
	 */
	public ReportPhotoView getPhoto(Long reportId, Long photoId) {
		ReportPhoto photo = reportPhotoRepository
			.findByIdAndReportId(photoId, reportId)
			.orElseThrow();

		return new ReportPhotoView(
			photo.getData(),
			photo.getContentType(),
			photo.getFilename()
		);
	}

	/**
	 * Aktualisiert den {@link ReportStatus Status} einer Meldung.
	 *
	 * @param reportId ID der Meldung
	 * @param status neuer Status
	 * @return die aktualisierte und persistierte {@link Report}-Entität
	 * @throws java.util.NoSuchElementException falls keine Meldung mit der ID existiert
	 */
	public Report updateStatus(Long reportId, ReportStatus status) {
		Report report = reportRepository.findById(reportId)
			.orElseThrow();

		report.setStatus(status);
		return reportRepository.save(report);
	}

}
