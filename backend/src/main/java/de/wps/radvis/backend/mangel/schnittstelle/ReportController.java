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

import de.wps.radvis.backend.mangel.domain.ReportService;
import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.schnittstelle.view.ReportPhotoView;
import de.wps.radvis.backend.mangel.schnittstelle.view.ReportView;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
/**
 * REST-Controller für Mangelmeldungen ({@link Report}).
 * <p>
 * Stellt Endpunkte zum Erstellen und Abrufen von Meldungen sowie zum Abruf zugehöriger Fotos
 * und zur Statusänderung bereit.
 * </p>
 */
public class ReportController {

    private final ReportService reportService;

	/**
	 * Erstellt eine neue Mangelmeldung.
	 * <p>
	 * Erwartet {@code multipart/form-data}. Neben den Meldungsdaten können optional Bilddateien
	 * mitgesendet werden (siehe {@link SaveReportCommand}).
	 * </p>
	 *
	 * @param command Eingabedaten zur Erstellung (werden validiert)
	 * @return {@link ReportView} der neu erstellten Meldung
	 */
	@PostMapping(consumes = { "multipart/form-data" })
	public ResponseEntity<ReportView> createReport(@ModelAttribute @Valid SaveReportCommand command) {
		Report created = reportService.create(command);
		return ResponseEntity.status(HttpStatus.CREATED).body(new ReportView(created));
	}

	/**
	 * Liefert alle vorhandenen Mangelmeldungen.
	 *
	 * @return Liste aller Meldungen als {@link ReportView}
	 */
	@GetMapping
	public ResponseEntity<List<ReportView>> getAllReports() {
		List<ReportView> reports = reportService.getAllReports();
		return ResponseEntity.ok(reports);
	}

	/**
	 * Liefert eine einzelne Mangelmeldung.
	 *
	 * @param id ID der Meldung
	 * @return Meldung als {@link ReportView} oder {@code 404 Not Found}, falls nicht vorhanden
	 */
	@GetMapping("/{id}")
	public ResponseEntity<ReportView> getReport(@PathVariable Long id) {
		try {
			return ResponseEntity.ok(reportService.getReport(id));
		} catch (java.util.NoSuchElementException e) {
			return ResponseEntity.notFound().build();
		}
	}

	/**
	 * Liefert ein einzelnes Foto einer Mangelmeldung als Binärdaten.
	 * <p>
	 * Der {@code Content-Type} wird aus dem gespeicherten Foto übernommen. Zusätzlich wird ein
	 * {@code Content-Disposition: inline} Header gesetzt, um eine direkte Anzeige im Browser zu ermöglichen.
	 * </p>
	 *
	 * @param reportId ID der Meldung
	 * @param photoId ID des Fotos
	 * @return Binärdaten des Bildes inkl. passendem {@code Content-Type}
	 */
	@GetMapping("/{reportId}/photos/{photoId}")
	public ResponseEntity<byte[]> getPhoto(
		@PathVariable Long reportId,
		@PathVariable Long photoId) {

        ReportPhotoView photo = reportService.getPhoto(reportId, photoId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(photo.contentType()))
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + photo.filename() + "\""
                )
                .body(photo.data());
    }

	/**
	 * Aktualisiert den Status einer Mangelmeldung.
	 * <p>
	 * Gibt bei Erfolg keinen Response-Body zurück ({@code 204 No Content}).
	 * </p>
	 *
	 * @param id ID der Meldung
	 * @param command Request-Body mit neuem Status (wird validiert)
	 */
	@PatchMapping("/{id}/status")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateStatus(
		@PathVariable Long id,
		@RequestBody @Valid UpdateReportStatusCommand command) {

        reportService.updateStatus(id, command.getStatus());
    }

}