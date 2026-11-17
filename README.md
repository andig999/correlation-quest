# Correlation Quest

Correlation Quest ist ein interaktives Lerntool im Pixel-Art-RPG-Stil. Anhand
von Punktwolken schätzen Spielerinnen und Spieler Pearson-Korrelation,
Spearman-Rangkorrelation oder die Steigung einer Regressionsgeraden. Die
Auflösung erklärt die Unterschiede zwischen den Kennzahlen direkt an der
jeweiligen Runde.

## Zielgruppe und Lernziele

Das Spiel richtet sich an Studierende, die in einer Einführung in die
deskriptive Statistik den Umgang mit Korrelationen lernen. Es soll helfen,

1. Pearson `r` anhand einer Punktwolke grob einzuschätzen,
2. lineare und monotone Zusammenhänge zu unterscheiden,
3. zu erkennen, dass `r ≈ 0` nicht zwingend „kein Zusammenhang“ bedeutet,
4. den Einfluss von Ausreißern und das Simpson-Paradoxon zu sehen und
5. Korrelation und Regressionssteigung als unterschiedliche Größen zu verstehen.

## Spiel

- drei Leben und Münzen als Belohnung für gute Schätzungen
- zufällig erzeugte, reproduzierbare Szenarien
- normale, monotone, Ausreißer-, U-Form- und Simpson-Szenarien
- Deutsch und Englisch
- responsive Darstellung für Desktop, Tablet und Smartphone
- lokale Highscores pro Gerät; es werden keine Daten an einen Server übertragen

## Spielprinzip

In jeder Runde erscheint eine Punktwolke. Je nach aktiver Kategorie wird
Pearson `r`, Spearman `ρ` oder die Steigung `b` der Regressionsgeraden geschätzt.
Die Schätzung erfolgt über einen Regler oder ein Zahlenfeld. Anschließend zeigt
die Auflösung den tatsächlichen Wert, den Fehler, die Belohnung und eine kurze
fachliche Erklärung.

Gute Schätzungen bringen Münzen und können verlorene Leben zurückgeben. Bei
größeren Abweichungen geht ein Leben verloren. Das Spiel endet bei null Leben;
der höchste Münzstand wird lokal als Highscore gespeichert.

Die Sonderfälle machen sichtbar, warum die Kennzahlen unterschiedliche
Eigenschaften haben:

| Szenario | Inhalt |
|---|---|
| Normal | ungefähr linearer Zusammenhang mit zufälliger Richtung und Stärke |
| Monoton | gekrümmter, aber durchgehend steigender oder fallender Zusammenhang |
| Ausreißer | ein einzelner weit entfernter Punkt beeinflusst Pearson stark |
| U-Form | deutlicher gekrümmter Zusammenhang bei Koeffizienten nahe null |
| Simpson | Gesamttrend und Trends innerhalb von Gruppen weisen in unterschiedliche Richtungen |

## URL-Parameter

Die Spielvariante kann beim Laden über URL-Parameter festgelegt werden. Die
Parameter werden nur beim Laden ausgewertet; Sprachwechsel und Spielaktionen
behalten sie bei.

### `categories`

Legt fest, welche Schätzkategorien aktiv sind. Mehrere Werte werden
kommagetrennt angegeben:

| Wert | Kategorie |
|---|---|
| `pearson` | Pearson-Korrelation `r` |
| `spearman` | Spearman-Rangkorrelation `ρ` |
| `slope` | Steigung der Regressionsgeraden `b` |

Beispiele:

```text
?categories=pearson,spearman
?categories=slope
?categories=pearson,spearman,slope
```

Die Werte werden unabhängig von Groß-/Kleinschreibung und zusätzlichen
Leerzeichen erkannt. Doppelte Werte werden entfernt. Unbekannte oder leere
Werte werden ignoriert. Wenn kein gültiger Wert übrig bleibt oder der
Parameter fehlt, sind alle drei Kategorien aktiv.

Die normalen Runden wechseln nur zwischen den aktiven Kategorien. Sonderfälle,
die die nicht aktivierte Kategorie benötigen, werden in dieser Variante nicht
erzeugt. Für jede eingeschränkte Variante wird ein eigener Highscore verwendet;
die vollständige Variante teilt den bisherigen Standard-Highscore.

### `lang`

Setzt die Sprache für den Start auf Deutsch oder Englisch:

| Wert | Sprache |
|---|---|
| `de` | Deutsch |
| `en` | Englisch |

Beispiele:

```text
?lang=de
?lang=en
?categories=pearson,spearman&lang=en
```

Auch bei `lang` werden Groß-/Kleinschreibung und Leerzeichen toleriert.
Unbekannte Werte werden ignoriert; dann gilt die gespeicherte Sprache oder
Deutsch als Standard. Die Sprache aus der URL wird nicht gespeichert und
überschreibt nur für diesen Aufruf die gespeicherte Auswahl.

### Kombination und Fallback

Beide Parameter können kombiniert werden:

```text
https://andig999.github.io/correlation-quest/?categories=slope&lang=en
```

Ohne Parameter startet die vollständige Variante auf Deutsch beziehungsweise
in der zuletzt gespeicherten Sprache.

## Entwicklung

Das Projekt benötigt keine Build-Tools, keinen Server und keine externen
Laufzeitabhängigkeiten. Die Anwendung besteht aus HTML, CSS, JavaScript-ES-
Modulen und statischen Bild- und Font-Assets.

### Projektstruktur

```text
index.html             Einstieg und Spieloberfläche
tools/test.html        Browserbasierte Tests
tools/sprites-preview.html
                       Vorschau für Figuren, Posen und Icons
js/                    Spiel, Statistik, Szenarien, Texte und Plot
css/                   Layout und Figuren-Darstellung
assets/                Icons und Pixel-Art-Figuren
fonts/                 Press-Start-2P-Schrift inklusive Lizenzhinweis
SPEC.md                ausführliche technische Spezifikation
```

### Lokal starten

1. Repository in VS Code öffnen.
2. Einen lokalen HTTP-Server starten, zum Beispiel die Erweiterung
   **Live Server**.
3. `index.html` im Browser öffnen.

Ein direkter Doppelklick auf die HTML-Datei kann das Laden von ES-Modulen durch
den Browser verhindern.

### Tests ausführen

1. `tools/test.html` über denselben lokalen Server öffnen.
2. Prüfen, dass alle Tests bestanden sind.

Die Tests decken Statistik-Referenzwerte, Seed-RNG, Szenario-Bedingungen,
Varianten, Spielregeln, Plot und Texte ab. `tools/sprites-preview.html` zeigt
alle Figuren, Posen und Icons unabhängig vom Spiel.

## Technische Dokumentation

Die ausführliche [Spezifikation](SPEC.md) dokumentiert Lernziele, Spielregeln,
Szenarien, Statistik, UI-Anforderungen, Asset-Konventionen und die
URL-Varianten.

## Veröffentlichung mit GitHub Pages

Das Repository kann ohne Build-Schritt als statische Website veröffentlicht
werden:

1. In den Repository-Einstellungen **Pages** öffnen.
2. Als Quelle den gewünschten Branch (üblicherweise `main`) und dessen
   Repository-Verzeichnis auswählen.
3. Die erzeugte Pages-Adresse aufrufen.

Die Anwendung ist anschließend direkt über `index.html` erreichbar. URL-
Parameter können an diese Adresse angehängt werden, zum Beispiel:

```text
https://andig999.github.io/correlation-quest/?categories=slope&lang=en
```

## Datenschutz und externe Abhängigkeiten

Die Anwendung verarbeitet keine Konten, Formulareingaben auf einem Server oder
personenbezogenen Spieldaten. Der Highscore und die bevorzugte Sprache werden
nur lokal im Browser gespeichert. Das Spiel lädt keine CDNs, Analyse-
Skripte oder externen Webdienste.

## Assets und Lizenzen

Die verwendete Press-Start-2P-Schrift liegt zusammen mit ihrem Lizenzhinweis
in `fonts/`. Die Bild-Assets des Spiels liegen in `assets/`. Für Änderungen an
Figuren und Icons sollten die bestehenden Pixel-Art- und
Skalierungskonventionen aus der [Spezifikation](SPEC.md) beachtet werden.
