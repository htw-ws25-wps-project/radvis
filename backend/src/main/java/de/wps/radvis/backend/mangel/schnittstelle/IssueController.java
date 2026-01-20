package de.wps.radvis.backend.mangel.schnittstelle;


import de.wps.radvis.backend.mangel.domain.valueObjects.Issue;
import de.wps.radvis.backend.mangel.schnittstelle.view.IssueLabelView;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class IssueController {

    @GetMapping("/issues")
    public List<Issue> getIssues() {
        return List.of(Issue.values());
    }

    @GetMapping("/issue-labels")
    public List<IssueLabelView> getIssueLabels() {
        return Arrays.stream(Issue.values())
                .map(issue -> new IssueLabelView(issue.name(), issue.getLabel()))
                .toList();
    }
}
