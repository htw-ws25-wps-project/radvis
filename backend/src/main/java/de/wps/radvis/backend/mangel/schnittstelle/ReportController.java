package de.wps.radvis.backend.mangel.schnittstelle;

import de.wps.radvis.backend.mangel.domain.ReportService;
import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.schnittstelle.view.ReportView;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public ResponseEntity<ReportView> createReport(@RequestBody @Valid SaveReportCommand command) {
        Report created = reportService.create(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ReportView(created));
    }
}
