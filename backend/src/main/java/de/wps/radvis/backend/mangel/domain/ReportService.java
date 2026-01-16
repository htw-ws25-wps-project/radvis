package de.wps.radvis.backend.mangel.domain;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommand;
import de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommandConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final SaveReportCommandConverter converter;

    public ReportService(ReportRepository reportRepository, SaveReportCommandConverter converter) {
        this.reportRepository = reportRepository;
        this.converter = converter;
    }

    @Transactional
    public Report create(SaveReportCommand command) {
        Report report = converter.toReport(command);
        return reportRepository.save(report);
    }
}
