import gameOptions from '../Objects/gameOptions';

test('Read playerName', () => {
  gameOptions.playerName = 'Victor';
  expect(gameOptions.playerName).toEqual('Victor');
});

test('Change firePercent', () => {
  gameOptions.firePercent = 16;
  expect(gameOptions.firePercent).toEqual(16);
});

test('Read playerGravity', () => {
  expect(gameOptions.playerGravity).toEqual(900);
});

test('Change playerGravity', () => {
  gameOptions.playerGravity = 850;
  expect(gameOptions.playerGravity).toEqual(850);
});

test('Read jumpForce', () => {
  expect(gameOptions.jumpForce).toEqual(400);
});

test('Change jumpForce', () => {
  gameOptions.jumpForce = 500;
  expect(gameOptions.jumpForce).toEqual(500);
});

test('Read coinPercent', () => {
  expect(gameOptions.coinPercent).toEqual(75);
});

test('Change coinPercent', () => {
  gameOptions.coinPercent = 50;
  expect(gameOptions.coinPercent).toEqual(50);
});
