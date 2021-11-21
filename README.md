# MAS-SPA-Notizen

## Team
Roger Daniel Billeter
Gautham Arumugam

## GitHub Link
https://github.com/gaut-3/MAS-SPA-Notizen

## Cloud Url
https://d1y4k8ttknyg2u.cloudfront.net/

## Geforderte Anforderung
https://github.com/gaut-3/MAS-SPA-Notizen/blob/main/docs/Projektarbeit_Anforderungen.pdf

## Erfüllte Anforderungen
### Hauptanforderungen
* Erfassen von Notizen
* Löschen von Notizen
* Notiz auf «erledigt» setzen
* «Alle anzeigen» Filter

### Zusatzanforderungen
* Text-Input zum Erfassen filtert bestehende Einträge
* Importance-Feld (Blitze) mit Editierung in der Tabelle
* Editieren des Notiztexts innerhalb der Liste
* Sortieren der Wichtigkeit und Aufgabe

## Testing
Getestet wurde hauptsächlich im Chrome und nebenbei einbisschen im Firefox.

Im Firefox wurde ein Fehler gefunden, dass Notizen nicht durchgestrichen werden.
Dort wurde ein Workaround eingebaut, welches auch im Chrome funktioniert.
Das wäre hier https://github.com/gaut-3/MAS-SPA-Notizen/blob/feb93e934818d96919ce41587345bc267a9b4781/src/components/NoteComponent.tsx#L49 (oben noch der Kommentar). Es wurde zuerst mit "className" in der Textfield Komponente gearbeitet, in welchem die CSS Klasse gesetzt wurde. Dieser Ansatz funktioniert nur im Chrome und im Firefox nicht und deswegen der Workaround die CSS Klasse über "InputProps" reinzugeben.


# Application Infos
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
