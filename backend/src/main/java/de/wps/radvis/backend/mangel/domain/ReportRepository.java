package de.wps.radvis.backend.mangel.domain;

import de.wps.radvis.backend.mangel.domain.entity.Report;
import org.springframework.data.repository.ListCrudRepository;

public interface ReportRepository extends ListCrudRepository<Report, Long> {
}
