import Model from '../Model';

describe('model', () => {
  const m = new Model();
  test('create a Model object', () => {
    expect(m).toEqual({ _bgMusicPlaying: false, _musicOn: true, _soundOn: true });
  });

  test('read _bgMusic', () => {
    expect(m._bgMusicPlaying).toEqual(false);
  });

  test('read _musicOn', () => {
    expect(m._musicOn).toEqual(true);
  });

  test('read _soundOn', () => {
    expect(m._soundOn).toEqual(true);
  });

  test('change _bgMusic to true', () => {
    m._bgMusicPlaying = true;
    expect(m._bgMusicPlaying).toEqual(true);
  });

  test('change _musicOn to false', () => {
    m._musicOn = false;
    expect(m._musicOn).toEqual(false);
  });

  test('change _soundOn to false', () => {
    m._soundOn = false;
    expect(m._soundOn).toEqual(false);
  });
});
