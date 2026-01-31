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
package de.wps.radvis.backend.mangel;

import de.wps.radvis.backend.mangel.domain.ReportPhotoRepository;
import de.wps.radvis.backend.mangel.domain.ReportRepository;
import de.wps.radvis.backend.mangel.domain.ReportService;
import de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommandConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackageClasses = ReportRepository.class)
@EntityScan(basePackages = "de.wps.radvis.backend.mangel.domain.entity")
@RequiredArgsConstructor
/**
 * Spring-Konfiguration für das Modul "Mangel".
 * <p>
 * Verantwortlichkeiten:
 * </p>
 * <ul>
 *   <li>Aktiviert Spring-Data-JPA-Repositories des Moduls (ausgehend von {@link ReportRepository}).</li>
 *   <li>Konfiguriert das Entity-Scanning für die Domänen-Entitäten des Moduls.</li>
 *   <li>Registriert modul-spezifische Beans (z. B. Converter, Services).</li>
 * </ul>
 */
public class MangelConfiguration {

    private final ReportRepository reportRepository;

    /**
     * Bean für die Konvertierung von {@link de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommand}
     * in eine {@link de.wps.radvis.backend.mangel.domain.entity.Report}-Entität.
     *
     * @return {@link SaveReportCommandConverter}
     */
    @Bean
    public SaveReportCommandConverter saveReportCommandConverter() {
        return new SaveReportCommandConverter();
    }

    /**
     * Bean für den {@link ReportService}.
     *
     * @param reportPhotoRepository Repository für den Zugriff auf {@code ReportPhoto}-Entitäten
     * @return {@link ReportService}
     */
    @Bean
    public ReportService reportService(ReportPhotoRepository reportPhotoRepository) {
        return new ReportService(reportRepository, saveReportCommandConverter(), reportPhotoRepository);
    }
}
