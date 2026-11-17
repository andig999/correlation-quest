export const APP_TITLE = "Correlation Quest";
export const LANGUAGE_KEY = "correlation-quest-language";

const COMMON = {
  characterNames: {
    pearson: "Pear-Son",
    spearman: "Spear-Man",
    regression: "Regression Sorceress",
  },
  poseNames: {
    ruhe: "resting",
    zeigen: "pointing",
    jubel: "celebrating",
    enttaeuscht: "disappointed",
    nachdenken: "thinking",
    erklaeren: "explaining",
    ueberrascht: "surprised",
    winken: "waving",
  },
};

export const TEXTS_DE = {
  ...COMMON,
  characterNames: {
    ...COMMON.characterNames,
    regression: "Regressions-Magierin",
  },
  poseNames: {
    ruhe: "ruhig",
    zeigen: "zeigend",
    jubel: "jubelnd",
    enttaeuscht: "enttäuscht",
    nachdenken: "nachdenkend",
    erklaeren: "erklärend",
    ueberrascht: "überrascht",
    winken: "winkend",
  },
  language: "Deutsch",
  switchLanguage: "Sprache: Deutsch. Zu Englisch wechseln.",
  subtitle: "Ein Abenteuer der Statistik",
  figuresLabel: "Die drei Figuren",
  plotAria: "Quadratisches Streudiagramm mit x- und y-Achse von 0 bis 1",
  regressionLineAria: (slope) => `Regressionsgerade, Steigung b = ${slope}`,
  outlierAria: "Ausreißer",
  round: "Runde",
  lives: "Leben",
  coins: "Münzen",
  averageError: "Ø Fehler",
  averageErrorAccessible: "Durchschnittlicher Fehler",
  highscore: "Highscore",
  newHighscore: "Neuer Rekord!",
  highscoreUnchanged: "Kein neuer Rekord – versuch es gleich noch einmal.",
  charactersLoading: "Die Figuren werden geladen …",
  charactersLoadError: (message) => `Figuren konnten nicht geladen werden: ${message}`,
  roundResolved: (round) => `Runde ${round} abgeschlossen`,
  perfectHit: "Volltreffer!",
  goodHit: "Gut!",
  missed: "Daneben",
  specialCase: "Sonderfall",
  scaleEstimate: "Deine Schätzung",
  scalePearson: "Pearson r",
  scaleSpearman: "Spearman ρ",
  scaleSlope: "Steigung b",
  scaleAria: (estimate, pearson, spearman, slope, limit = 1) => limit === 2
    ? `Ergebnisskala von −2 bis +2: deine Schätzung ${estimate}, Steigung b ${slope}, Pearson r ${pearson}`
    : `Ergebnisskala von −1 bis 1: deine Schätzung ${estimate}, Pearson r ${pearson}, Spearman ρ ${spearman}`,
  startGame: "Spiel starten",
  gameRules: "Spielregeln",
  menu: "Menü",
  abandonPrompt: "Spiel abbrechen?",
  yes: "Ja",
  no: "Nein",
  mainMenu: "Hauptmenü",
  rulesTitle: "Spielregeln",
  rulesStart: "Du startest mit 3 Leben und 0 Münzen.",
  rulesPerfect: "Fehler bis 0,05: +1 Leben (höchstens 3) und +5 Münzen.",
  rulesClose: "Fehler bis 0,10: +1 Münze.",
  rulesMiss: "Fehler über 0,10: −1 Leben.",
  pearsonPrompt: "Schätze Pearson r",
  spearmanPrompt: "Schätze Spearman ρ",
  slopePrompt: "Schätze die Steigung b",
  guessLabel: "Deine Schätzung",
  promptCaption: "Wie stark ist der Zusammenhang?",
  slopePromptCaption: "Um wie viel steigt y, wenn x um 1 steigt?",
  numberInputLabel: "Zahlenfeld für deine Schätzung",
  submitGuess: "Schätzung bestätigen",
  continue: "Weiter",
  finish: "Zum Endbildschirm",
  newGame: "Neues Spiel",
  resolutionTitle: "Auflösung",
  estimate: "Deine Schätzung",
  error: "Fehler",
  pearson: "Pearson r",
  spearman: "Spearman ρ",
  regressionSlope: "Steigung b",
  invalidGuess: (limit = 1) => `Bitte gib eine Zahl zwischen −${limit} und +${limit} ein.`,
  gameOverTitle: "Spiel beendet",
  gameOverMessage: "Keine Leben mehr.",
  gameOverCoins: "Münzen dieser Runde",
  noChange: "Keine Änderung",
  life: "Leben",
  group: "Gruppe",
  invalidHighscore: "Der gespeicherte Highscore ist ungültig und wird ignoriert.",
  highscoreLoadError: (message) => `Der Highscore konnte nicht geladen werden: ${message}`,
  highscoreSaveError: (message) => `Der Highscore konnte nicht gespeichert werden: ${message}`,
  groupCorrelation: (group, correlation, slope) => `Gruppe ${group}: r = ${correlation}, b = ${slope}`,
  roundResult: (estimate, error, rewards) => `${TEXTS.estimate}: ${estimate} · ${TEXTS.error}: ${error}. ${rewards}.`,
  guessResult: (estimate, error) => `${TEXTS.estimate}: ${estimate} · ${TEXTS.error}: ${error}.`,
  scenarioExplanations: {
    monotonIncreasing: "Die Punkte steigen durchgehend, aber nicht auf einer Geraden. Spearman bewertet die Rangfolge und liegt deshalb näher an +1.",
    monotonDecreasing: "Die Punkte fallen durchgehend, aber nicht auf einer Geraden. Spearman bewertet die Rangfolge und liegt deshalb näher an −1.",
    ausreisser: "Ein einzelner Ausreißer kann Pearson stark verschieben. Spearman nutzt Ränge und bleibt gegenüber diesem Punkt oft stabiler.",
    uform: "Die Punktwolke zeigt einen klaren, aber nicht linearen oder monotonen Zusammenhang. Deshalb können Pearson und Spearman nahe 0 liegen.",
    simpsonIncreasing: "Insgesamt steigt y mit x, innerhalb jeder Gruppe fällt y jedoch. Dieser Richtungswechsel heißt Simpson-Paradoxon.",
    simpsonDecreasing: "Insgesamt fällt y mit x, innerhalb jeder Gruppe steigt y jedoch. Dieser Richtungswechsel heißt Simpson-Paradoxon.",
    normalDifference: "Pearson beschreibt lineare, Spearman monotone Zusammenhänge. Ihre Abweichung kann auf eine gekrümmte Beziehung oder einen Ausreißer hinweisen.",
    slopeDifference: "Die Steigung sagt, wie stark y pro Einheit x zunimmt. Die Korrelation sagt, wie eng die Punkte an der Geraden liegen. Beides kann sehr verschieden sein.",
  },
};

export const TEXTS_EN = {
  ...TEXTS_DE,
  characterNames: {
    pearson: "Pear-Son",
    spearman: "Spear-Man",
    regression: "Regression Sorceress",
  },
  poseNames: {
    ruhe: "resting",
    zeigen: "pointing",
    jubel: "celebrating",
    enttaeuscht: "disappointed",
    nachdenken: "thinking",
    erklaeren: "explaining",
    ueberrascht: "surprised",
    winken: "waving",
  },
  language: "English",
  switchLanguage: "Language: English. Switch to German.",
  subtitle: "A Statistics Adventure",
  figuresLabel: "The three characters",
  plotAria: "Square scatter plot with x and y axes from 0 to 1",
  regressionLineAria: (slope) => `Regression line, slope b = ${slope}`,
  outlierAria: "Outlier",
  round: "Round",
  lives: "Lives",
  coins: "Coins",
  averageError: "Average error",
  averageErrorAccessible: "Average error",
  highscore: "High score",
  newHighscore: "New high score!",
  highscoreUnchanged: "No new high score – try again.",
  charactersLoading: "Loading the characters …",
  charactersLoadError: (message) => `The characters could not be loaded: ${message}`,
  roundResolved: (round) => `Round ${round} complete`,
  perfectHit: "Perfect!",
  goodHit: "Good!",
  missed: "Missed",
  specialCase: "Special case",
  scaleEstimate: "Your estimate",
  scaleSlope: "Slope b",
  scaleAria: (estimate, pearson, spearman, slope, limit = 1) => limit === 2
    ? `Result scale from −2 to +2: your estimate ${estimate}, slope b ${slope}, Pearson r ${pearson}`
    : `Result scale from −1 to 1: your estimate ${estimate}, Pearson r ${pearson}, Spearman ρ ${spearman}`,
  startGame: "Start game",
  gameRules: "Game rules",
  menu: "Menu",
  abandonPrompt: "Leave the game?",
  yes: "Yes",
  no: "No",
  mainMenu: "Main menu",
  rulesTitle: "Game rules",
  rulesStart: "You start with 3 lives and 0 coins.",
  rulesPerfect: "Error up to 0.05: +1 life (up to 3) and +5 coins.",
  rulesClose: "Error up to 0.10: +1 coin.",
  rulesMiss: "Error above 0.10: −1 life.",
  pearsonPrompt: "Estimate Pearson r",
  spearmanPrompt: "Estimate Spearman ρ",
  slopePrompt: "Estimate the slope b",
  guessLabel: "Your estimate",
  promptCaption: "How strong is the relationship?",
  slopePromptCaption: "How much does y rise when x rises by 1?",
  numberInputLabel: "Number field for your estimate",
  submitGuess: "Confirm estimate",
  continue: "Continue",
  finish: "Go to final screen",
  newGame: "New game",
  resolutionTitle: "Results",
  estimate: "Your estimate",
  error: "Error",
  regressionSlope: "Slope b",
  invalidGuess: (limit = 1) => `Please enter a number between −${limit} and +${limit}.`,
  gameOverTitle: "Game over",
  gameOverMessage: "No lives left.",
  gameOverCoins: "Coins this game",
  noChange: "No change",
  life: "Life",
  group: "Group",
  invalidHighscore: "The saved high score is invalid and was ignored.",
  highscoreLoadError: (message) => `The high score could not be loaded: ${message}`,
  highscoreSaveError: (message) => `The high score could not be saved: ${message}`,
  groupCorrelation: (group, correlation, slope) => `Group ${group}: r = ${correlation}, b = ${slope}`,
  roundResult: (estimate, error, rewards) => `${TEXTS.estimate}: ${estimate} · ${TEXTS.error}: ${error}. ${rewards}.`,
  guessResult: (estimate, error) => `${TEXTS.estimate}: ${estimate} · ${TEXTS.error}: ${error}.`,
  scenarioExplanations: {
    monotonIncreasing: "The points rise throughout, but not along a straight line. Spearman evaluates rank order and is therefore closer to +1.",
    monotonDecreasing: "The points fall throughout, but not along a straight line. Spearman evaluates rank order and is therefore closer to −1.",
    ausreisser: "A single outlier can shift Pearson strongly. Spearman uses ranks and often remains more stable against this point.",
    uform: "The point cloud shows a clear but non-linear and non-monotonic relationship. Therefore Pearson and Spearman can both be near 0.",
    simpsonIncreasing: "Overall, y rises with x, but within each group y falls. This reversal is called Simpson’s paradox.",
    simpsonDecreasing: "Overall, y falls with x, but within each group y rises. This reversal is called Simpson’s paradox.",
    normalDifference: "Pearson describes linear relationships, while Spearman describes monotonic relationships. Their difference can indicate a curved relationship or an outlier.",
    slopeDifference: "The slope says how much y increases per unit of x. The correlation says how closely the points follow the line. They can be very different.",
  },
};

let language = "de";
export let TEXTS = TEXTS_DE;

export function getLanguage() {
  return language;
}

export function setLanguage(nextLanguage) {
  if (!["de", "en"].includes(nextLanguage)) throw new RangeError("Unsupported language.");
  language = nextLanguage;
  TEXTS = nextLanguage === "en" ? TEXTS_EN : TEXTS_DE;
  return TEXTS;
}

export function loadLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    if (stored === "de" || stored === "en") setLanguage(stored);
  } catch {
    setLanguage("de");
  }
  return language;
}

export function saveLanguage(nextLanguage) {
  setLanguage(nextLanguage);
  try {
    localStorage.setItem(LANGUAGE_KEY, nextLanguage);
  } catch {
    // Language remains active for this page even when storage is unavailable.
  }
}

export function formatNumber(value) {
  return new Intl.NumberFormat(language === "de" ? "de-DE" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value).replace("-", "−");
}

export function explanationFor(scenario, metrics) {
  if (scenario.type === "normal") {
    return Math.abs(metrics.pearson - metrics.spearman) > 0.1
      ? TEXTS.scenarioExplanations.normalDifference : "";
  }
  if (scenario.type === "monoton") {
    return metrics.spearman > 0
      ? TEXTS.scenarioExplanations.monotonIncreasing
      : TEXTS.scenarioExplanations.monotonDecreasing;
  }
  if (scenario.type === "simpson") {
    return metrics.pearson > 0
      ? TEXTS.scenarioExplanations.simpsonIncreasing
      : TEXTS.scenarioExplanations.simpsonDecreasing;
  }
  if (scenario.coefficient === "slope" || scenario.type === "steigung") {
    return Math.abs(metrics.regression?.b ?? metrics.slope ?? 0) - Math.abs(metrics.pearson) > 0.3
      || Math.abs(metrics.pearson) - Math.abs(metrics.regression?.b ?? metrics.slope ?? 0) > 0.3
      ? TEXTS.scenarioExplanations.slopeDifference : "";
  }
  return TEXTS.scenarioExplanations[scenario.type] ?? "";
}
