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
import de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommand;
import de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommandConverter;
import de.wps.radvis.backend.mangel.schnittstelle.view.ReportPhotoView;
import de.wps.radvis.backend.mangel.schnittstelle.view.ReportView;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional
@RequiredArgsConstructor
public class ReportService {

	private final ReportRepository reportRepository;
	private final SaveReportCommandConverter converter;
    private final ReportPhotoRepository reportPhotoRepository;

	public Report create(SaveReportCommand command) {
		Report report = converter.toReport(command);
		return reportRepository.save(report);
	}

	public ReportView getReport(Long id) {
		return reportRepository.findById(id)
			.map(ReportView::new)
			.orElseThrow();
	}

	public List<ReportView> getAllReports() {
		return reportRepository.findAll().stream()
			.map(ReportView::new)
			.toList();
	}

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
}
