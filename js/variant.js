const ALL_CATEGORIES = ["pearson", "spearman", "slope"];

export function parseVariant(searchString) {
  const params = new URLSearchParams(String(searchString ?? ""));
  const requested = params.get("categories");
  const requestedCategories = requested === null
    ? ALL_CATEGORIES
    : [...new Set(requested.split(",").map((value) => value.trim().toLowerCase()))];
  const categories = ALL_CATEGORIES.filter((category) => requestedCategories.includes(category));
  const activeCategories = categories.length > 0 ? categories : [...ALL_CATEGORIES];
  const language = ["de", "en"].includes(params.get("lang")?.trim().toLowerCase())
    ? params.get("lang").trim().toLowerCase()
    : undefined;
  return { categories: activeCategories, language };
}

export function highscoreKey(categories) {
  return categories.length === ALL_CATEGORIES.length
    && ALL_CATEGORIES.every((category) => categories.includes(category))
    ? "correlation-guesser-highscore"
    : `correlation-guesser-highscore:${categories.join("+")}`;
}
