package de.wps.radvis.backend.mangel.schnittstelle;

import de.wps.radvis.backend.mangel.domain.valueObjects.Issue;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.locationtech.jts.geom.Point;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SaveReportCommand {
    private Issue issue;

    @Length(max = 1000)
    private String description;

    @NotNull
    private Point geometrie;
}
