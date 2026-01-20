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
            mappedBy = "report",
            cascade = CascadeType.ALL,
            orphanRemoval = true
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
