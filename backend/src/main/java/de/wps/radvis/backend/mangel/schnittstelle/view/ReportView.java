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
package de.wps.radvis.backend.mangel.schnittstelle.view;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.domain.valueObjects.Issue;

import java.time.LocalDateTime;
import java.util.List;

public record ReportView(
        Long id,
        String issue,
        String description,
        double longitude,
        double latitude,
        LocalDateTime created,
        List<String> photoUrls
) {
    public ReportView(Report report) {
        this(
                report.getId(),
                (report.getIssue() != null ? report.getIssue() : Issue.KEINE_KATEGORIE).getLabel(),
                report.getDescription(),
                report.getGeometrie().getX(),
                report.getGeometrie().getY(),
                report.getCreationDate(),
                report.getPhotos().stream()
                        .map(photo ->
                                "/api/reports/" + report.getId() + "/photos/" + photo.getId()
                        )
                        .toList()
        );
    }
}
