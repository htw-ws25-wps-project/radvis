package de.wps.radvis.backend.mangel.schnittstelle;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.domain.entity.ReportPhoto;
import lombok.AllArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
public class SaveReportCommandConverter {
    private static final GeometryFactory GEOMETRY_FACTORY = new GeometryFactory();

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    private static final long MAX_TOTAL_SIZE = 30 * 1024 * 1024; // 30 MB

    public Report toReport(SaveReportCommand command) {
        validateFileSizes(command.getFiles());

        Point geometrie = toPoint(command.getLatitude(), command.getLongitude());

        Report report =  Report.builder()
                .issue(command.getIssue())
                .description(command.getDescription())
                .geometrie(geometrie)
                .build();

        if (command.getFiles() != null) {
            command.getFiles().stream()
                    .map(this::mapToEntity)
                    .forEach(report::addPhoto);
        }

        return report;
    }

    public static Point toPoint(BigDecimal latitude, BigDecimal longitude) {
        return GEOMETRY_FACTORY.createPoint(new Coordinate(
                longitude.doubleValue(), // Longitude ist X
                latitude.doubleValue()   // Latitude ist Y
        ));
    }

    private void validateFileSizes(List<MultipartFile> files) {
        if (files == null || files.isEmpty()) return;

        long totalSize = 0;
        for (MultipartFile file : files) {
            if (file.getSize() > MAX_FILE_SIZE) {
                throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE,
                        "Die Datei " + file.getOriginalFilename() + " überschreitet 10 MB.");
            }
            totalSize += file.getSize();
        }

        if (totalSize > MAX_TOTAL_SIZE) {
            throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE,
                    "Gesamtgröße der Bilder überschreitet 30 MB.");
        }
    }

    private ReportPhoto mapToEntity(MultipartFile file) {
        try {
            return ReportPhoto.builder()
                    .data(file.getBytes())
                    .filename(file.getOriginalFilename())
                    .contentType(file.getContentType())
                    .size(file.getSize())
                    .build();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}