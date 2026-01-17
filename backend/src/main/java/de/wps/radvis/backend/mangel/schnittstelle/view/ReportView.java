package de.wps.radvis.backend.mangel.schnittstelle.view;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.domain.valueObjects.Issue;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReportView {
    private final String issue;
    private final String description;
    private final double longitude;
    private final double latitude;
    private final LocalDateTime created;

    public ReportView(Report report){
        this.issue = (report.getIssue() != null ? report.getIssue() : Issue.KEINE_KATEGORIE).getLabel();
        this.description = report.getDescription();
        // x = longitude, y = latitude
        this.longitude = report.getGeometrie().getX();
        this.latitude = report.getGeometrie().getY();
        this.created = report.getCreationDate();
    }
}
