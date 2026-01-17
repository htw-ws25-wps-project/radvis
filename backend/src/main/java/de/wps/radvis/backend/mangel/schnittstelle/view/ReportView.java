package de.wps.radvis.backend.mangel.schnittstelle.view;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.domain.valueObjects.Issue;

import java.time.LocalDateTime;

public record ReportView(
        Long id,
        String issue,
        String description,
        double longitude,
        double latitude,
        LocalDateTime created
) {
    public ReportView(Report report) {
        // Initializes view from report, mapping issue/geometry
        this(
                report.getId(),
                (report.getIssue() != null ? report.getIssue() : Issue.KEINE_KATEGORIE).getLabel(),
                report.getDescription(),
                report.getGeometrie().getX(),
                report.getGeometrie().getY(),
                report.getCreationDate()
        );
    }
}
