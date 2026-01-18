package de.wps.radvis.backend.mangel.schnittstelle;

import de.wps.radvis.backend.mangel.domain.valueObjects.Issue;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SaveReportCommand {
    private static final int MAX_DESCRIPTION_LENGTH = 1000;
    private static final String MIN_LATITUDE_DEGREES = "-90.0";
    private static final String MAX_LATITUDE_DEGREES = "90.0";
    private static final String MIN_LONGITUDE_DEGREES = "-180.0";
    private static final String MAX_LONGITUDE_DEGREES = "180.0";

    private Issue issue;

    @Length(max = MAX_DESCRIPTION_LENGTH)
    private String description;

    @NotNull
    @DecimalMin(MIN_LATITUDE_DEGREES)
    @DecimalMax(MAX_LATITUDE_DEGREES)
    private BigDecimal latitude;

    @NotNull
    @DecimalMin(MIN_LONGITUDE_DEGREES)
    @DecimalMax(MAX_LONGITUDE_DEGREES)
    private BigDecimal longitude;

    List<MultipartFile> files;
}
