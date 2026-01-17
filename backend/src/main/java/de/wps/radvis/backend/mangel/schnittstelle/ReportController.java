package de.wps.radvis.backend.mangel.schnittstelle;

import de.wps.radvis.backend.mangel.domain.ReportService;
import de.wps.radvis.backend.mangel.domain.entity.Report;
import de.wps.radvis.backend.mangel.schnittstelle.view.ReportView;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<ReportView> createReport(@RequestBody @Valid SaveReportCommand command) {
        Report created = reportService.create(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ReportView(created));
    }
    @GetMapping
    public ResponseEntity<List<ReportView>> getAllReports() {
        List<ReportView> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportView> getReport(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(reportService.getReport(id));
        } catch (java.util.NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
