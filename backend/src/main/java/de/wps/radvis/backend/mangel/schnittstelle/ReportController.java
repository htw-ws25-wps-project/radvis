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
import de.wps.radvis.backend.mangel.domain.entity.ReportPhoto;
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
public class ReportController {

	private final ReportService reportService;

	@PostMapping(consumes = { "multipart/form-data" })
	public ResponseEntity<ReportView> createReport(@ModelAttribute @Valid SaveReportCommand command) {
		Report created = reportService.create(command);
		return ResponseEntity.status(HttpStatus.CREATED).body(new ReportView(created));
	}

	@GetMapping
	public ResponseEntity<List<ReportView>> getAllReports() {
		List<ReportView> reports = reportService.getAllReports();
		return ResponseEntity.ok(reports);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ReportView> getReport(@PathVariable Long id) {
		try {
			return ResponseEntity.ok(reportService.getReport(id));
		} catch (java.util.NoSuchElementException e) {
			return ResponseEntity.notFound().build();
		}
	}

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
}

