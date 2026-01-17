package de.wps.radvis.backend.mangel.schnittstelle;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import lombok.AllArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

import java.math.BigDecimal;

@AllArgsConstructor
public class SaveReportCommandConverter {
    private static final GeometryFactory GEOMETRY_FACTORY = new GeometryFactory();

    public Report toReport(SaveReportCommand command) {
        Point geometrie = toPoint(command.getLatitude(), command.getLongitude());

        return Report.builder()
                .issue(command.getIssue())
                .description(command.getDescription())
                .geometrie(geometrie)
                .build();
    }

    public static Point toPoint(BigDecimal latitude, BigDecimal longitude) {
        return GEOMETRY_FACTORY.createPoint(new Coordinate(
                longitude.doubleValue(), // Longitude ist X
                latitude.doubleValue()   // Latitude ist Y
        ));
    }
}