// Leaderboard storage.
//
// The original Microverse leaderboard API (us-central1-js-capstone-backend...)
// was shut down, so scores are kept in the browser's localStorage. If you ever
// host a compatible API ({ result: [{ user, score }] } on GET, { user, score } on
// POST), set SCORES_API_URL and remote scores are merged with the local ones.
export const SCORES_API_URL = null;
export const STORAGE_KEY = 'sunnyland.scores';
export const MAX_STORED_SCORES = 50;

const browserStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const isValidEntry = (entry) => entry
  && typeof entry.user === 'string'
  && Number.isFinite(Number(entry.score));

export const topScores = (entries, count = 5) => (Array.isArray(entries) ? entries : [])
  .filter(isValidEntry)
  .map(({ user, score }) => ({ user, score: Number(score) }))
  .sort((a, b) => b.score - a.score)
  .slice(0, count);

export const loadLocalScores = (storage = browserStorage()) => {
  try {
    const parsed = JSON.parse(storage?.getItem(STORAGE_KEY) ?? '[]');
    return topScores(parsed, MAX_STORED_SCORES);
  } catch {
    return [];
  }
};

export const saveLocalScore = (user, score, storage = browserStorage()) => {
  const scores = topScores([...loadLocalScores(storage), { user, score }], MAX_STORED_SCORES);
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // Storage full or blocked (private mode): the score just isn't persisted.
  }
  return scores;
};

export const fetchScores = async (count = 5, { apiUrl = SCORES_API_URL, storage } = {}) => {
  const local = loadLocalScores(storage);
  if (!apiUrl) return topScores(local, count);
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { result } = await response.json();
    return topScores([...local, ...(result ?? [])], count);
  } catch {
    return topScores(local, count);
  }
};

export const saveScore = async (user, score, { apiUrl = SCORES_API_URL, storage } = {}) => {
  saveLocalScore(user, score, storage);
  if (!apiUrl) return;
  try {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ user, score }),
    });
  } catch {
    // Remote leaderboard unavailable; the local score is already saved.
  }
};

// Call before saving the score: true when it beats every stored score.
export const isHighScore = (score, storage) => {
  const best = loadLocalScores(storage)[0];
  return score > 0 && (!best || score > best.score);
};
