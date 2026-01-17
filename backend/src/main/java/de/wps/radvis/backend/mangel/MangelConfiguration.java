package de.wps.radvis.backend.mangel;

import de.wps.radvis.backend.mangel.domain.ReportRepository;
import de.wps.radvis.backend.mangel.domain.ReportService;
import de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommandConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackageClasses = ReportRepository.class)
@EntityScan(basePackages = "de.wps.radvis.backend.mangel.domain.entity")
public class MangelConfiguration {

    @Autowired
    private ReportRepository reportRepository;

    @Bean
    public SaveReportCommandConverter saveReportCommandConverter() {
        return new SaveReportCommandConverter();
    }

    @Bean
    public ReportService reportService(SaveReportCommandConverter converter) {
        return new ReportService(reportRepository, converter);
    }
}
