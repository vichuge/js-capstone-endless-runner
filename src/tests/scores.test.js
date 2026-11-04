import fetchMock from 'jest-fetch-mock';
import {
  fetchScores, isHighScore, loadLocalScores, saveLocalScore, saveScore, STORAGE_KEY, topScores,
} from '../scores';

fetchMock.enableMocks();

const memoryStorage = (initial = {}) => {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => { data[key] = String(value); },
    data,
  };
};

const API = 'https://example.test/scores';

beforeEach(() => fetchMock.resetMocks());

describe('topScores', () => {
  test('sorts by score, highest first, and limits the count', () => {
    const list = [{ user: 'a', score: 10 }, { user: 'b', score: 30 }, { user: 'c', score: 20 }];
    expect(topScores(list, 2)).toEqual([{ user: 'b', score: 30 }, { user: 'c', score: 20 }]);
  });

  test('drops invalid entries and coerces numeric strings', () => {
    const list = [{ user: 'a', score: '15' }, { score: 99 }, null, { user: 'b', score: 'x' }];
    expect(topScores(list)).toEqual([{ user: 'a', score: 15 }]);
  });

  test('returns an empty list for non-arrays', () => {
    expect(topScores(undefined)).toEqual([]);
  });
});

describe('local storage', () => {
  test('saves and loads scores', () => {
    const storage = memoryStorage();
    saveLocalScore('Fox', 40, storage);
    saveLocalScore('Frog', 70, storage);
    expect(loadLocalScores(storage)).toEqual([{ user: 'Frog', score: 70 }, { user: 'Fox', score: 40 }]);
  });

  test('survives corrupted data', () => {
    const storage = memoryStorage({ [STORAGE_KEY]: '{not json' });
    expect(loadLocalScores(storage)).toEqual([]);
  });

  test('works without storage (blocked localStorage)', () => {
    expect(loadLocalScores(null)).toEqual([]);
    expect(saveLocalScore('Fox', 10, null)).toEqual([{ user: 'Fox', score: 10 }]);
  });
});

describe('isHighScore', () => {
  test('is true only when beating the best stored score', () => {
    const storage = memoryStorage();
    expect(isHighScore(0, storage)).toBe(false);
    expect(isHighScore(10, storage)).toBe(true);
    saveLocalScore('Fox', 50, storage);
    expect(isHighScore(50, storage)).toBe(false);
    expect(isHighScore(60, storage)).toBe(true);
  });
});

describe('remote API (optional)', () => {
  test('is not called when no API url is configured', async () => {
    const storage = memoryStorage();
    await saveScore('Fox', 30, { storage });
    expect(await fetchScores(5, { storage })).toEqual([{ user: 'Fox', score: 30 }]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('merges remote and local scores', async () => {
    const storage = memoryStorage();
    saveLocalScore('Local', 20, storage);
    fetchMock.mockResponseOnce(JSON.stringify({ result: [{ user: 'Remote', score: 90 }] }));
    expect(await fetchScores(5, { apiUrl: API, storage })).toEqual([
      { user: 'Remote', score: 90 },
      { user: 'Local', score: 20 },
    ]);
  });

  test('falls back to local scores when the API fails', async () => {
    const storage = memoryStorage();
    saveLocalScore('Local', 20, storage);
    fetchMock.mockResponseOnce('Not found', { status: 404 });
    expect(await fetchScores(5, { apiUrl: API, storage })).toEqual([{ user: 'Local', score: 20 }]);
  });

  test('posts the score and keeps it locally even if the request fails', async () => {
    const storage = memoryStorage();
    fetchMock.mockRejectOnce(new Error('offline'));
    await saveScore('Fox', 35, { apiUrl: API, storage });
    expect(fetchMock).toHaveBeenCalledWith(API, expect.objectContaining({ method: 'POST' }));
    expect(loadLocalScores(storage)).toEqual([{ user: 'Fox', score: 35 }]);
  });
});
