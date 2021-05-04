import 'regenerator-runtime/runtime';

require('jest-fetch-mock').enableMocks();

test('score list', async () => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/rwBZGLRfKWrVM5dKf5QZ/scores');
  expect(response.status).toEqual(200);
});

test('upload a score', async () => {
  const settings = {
    method: 'POST',
    mode: 'cors',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ user: 'TestUser', score: 45 }),
  };
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/rwBZGLRfKWrVM5dKf5QZ/scores', settings);
  expect(response.status).toEqual(200);
});