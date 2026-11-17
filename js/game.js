import { linearRegression, pearson, spearman } from "./stats.js";

export function parseGuessInput(value) {
  const normalized = String(value).trim().replaceAll("−", "-").replace(",", ".");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) return NaN;
  return Number(normalized);
}

export function createGameState(highscore = 0) {
  if (!Number.isFinite(highscore) || highscore < 0) {
    throw new RangeError("Highscore must be a non-negative finite number.");
  }

  return {
    phase: "ready",
    lives: 3,
    coins: 0,
    highscore,
    round: 0,
    totalError: 0,
    completedRounds: 0,
    normalRounds: 0,
    scenario: null,
    result: null,
  };
}

export function startRound(state, scenario) {
  if (state.phase !== "ready" || !scenario || !Array.isArray(scenario.points)
    || !["pearson", "spearman", "slope"].includes(scenario.coefficient)) {
    throw new TypeError("A ready game and a valid scenario are required to start a round.");
  }

  return {
    ...state,
    phase: "guess",
    round: state.round + 1,
    normalRounds: state.normalRounds + (scenario.isNormal ? 1 : 0),
    scenario,
    result: null,
  };
}

export function resolveRound(state, estimate) {
  const estimateLimit = state.scenario?.coefficient === "slope" ? 2 : 1;
  if (state.phase !== "guess" || !Number.isFinite(estimate)
    || estimate < -estimateLimit || estimate > estimateLimit) {
    throw new RangeError(`A valid guess between -${estimateLimit} and ${estimateLimit} is required.`);
  }

  const { scenario } = state;
  const x = scenario.points.map((point) => point.x);
  const y = scenario.points.map((point) => point.y);
  const metrics = {
    pearson: pearson(x, y),
    spearman: spearman(x, y),
    regression: linearRegression(x, y),
  };
  metrics.slope = metrics.regression.b;
  const actual = metrics[scenario.coefficient];
  if (!Number.isFinite(actual) || !Number.isFinite(metrics.regression.b)) {
    throw new RangeError("The generated scenario has invalid statistics.");
  }

  const rawError = Math.abs(estimate - actual);
  const error = Math.round(rawError * 100) / 100;
  const scoringError = scenario.coefficient === "slope" ? error / 2 : error;
  let livesChange = 0;
  let coinsChange = 0;
  if (scoringError <= 0.05) {
    livesChange = state.lives < 3 ? 1 : 0;
    coinsChange = 5;
  } else if (scoringError <= 0.10) {
    coinsChange = 1;
  } else {
    livesChange = -1;
  }

  const lives = Math.min(3, state.lives + livesChange);
  const coins = state.coins + coinsChange;
  const completedRounds = state.completedRounds + 1;
  return {
    ...state,
    phase: "resolution",
    lives,
    coins,
    highscore: Math.max(state.highscore, coins),
    totalError: state.totalError + scoringError,
    completedRounds,
    result: {
      coefficient: scenario.coefficient,
      estimate,
      actual,
      error,
      coinsChange,
      livesChange,
      metrics,
      averageError: (state.totalError + scoringError) / completedRounds,
    },
  };
}

export function advanceRound(state) {
  if (state.phase !== "resolution") {
    throw new TypeError("A resolved round is required to continue.");
  }

  return {
    ...state,
    phase: state.lives === 0 ? "gameover" : "ready",
  };
}
