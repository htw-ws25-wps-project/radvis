package de.wps.radvis.backend.mangel.domain;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommand;
import de.wps.radvis.backend.mangel.schnittstelle.SaveReportCommandConverter;
import de.wps.radvis.backend.mangel.schnittstelle.view.ReportView;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final SaveReportCommandConverter converter;

    public Report create(SaveReportCommand command) {
        Report report = converter.toReport(command);
        return reportRepository.save(report);
    }

    public ReportView getReport(Long id) {
        return reportRepository.findById(id)
                .map(ReportView::new)
                .orElseThrow();
    }

    public List<ReportView> getAllReports() {
        return reportRepository.findAll().stream()
                .map(ReportView::new)
                .toList();
    }
}
