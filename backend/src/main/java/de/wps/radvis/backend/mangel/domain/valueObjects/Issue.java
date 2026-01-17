package de.wps.radvis.backend.mangel.domain.valueObjects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public enum Issue {
    SCHLAGLOCH("Schlagloch"),
    SCHLECHTER_STRASSENBELAG("Schlechter Straßenbelag"),
    BEWUCHS("Bewuchs"),
    FEHLENDE_BESCHILDERUNG("Fehlende Beschilderung"),
    FALSCHE_BESCHILDERUNG("Falsche Beschilderung"),
    POLLER_HINDERNIS("Poller/Hindernis"),
    UNKLARE_MARKIERUNG("Unklare Markierung"),
    UNEBENHEITEN_BODENWELLEN("Unebenheiten/Bodenwellen"),
    KEINE_KATEGORIE("Keine Kategorie");

    private final String label;

    @JsonValue
    public String getLabel(){ return this.label; }

    @JsonCreator
    public static Issue fromValue(String value) {
        for (Issue issue : Issue.values()) {
            if (issue.name().equalsIgnoreCase(value) || issue.label.equalsIgnoreCase(value)) {
                return issue;
            }
        }
        throw new IllegalArgumentException("Unbekannter Issue-Typ: " + value);
    }
}
