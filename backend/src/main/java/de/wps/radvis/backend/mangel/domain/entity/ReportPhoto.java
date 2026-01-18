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
