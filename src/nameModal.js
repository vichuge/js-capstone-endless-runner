// The "Pick your name" Bootstrap modal lives in dist/index.html.
// Bootstrap's JS bundle is loaded from a CDN before main.js, exposing `bootstrap`.
import gameOptions from './Objects/gameOptions';

const NAME_KEY = 'sunnyland.playerName';
let modal = null;

const readSavedName = () => {
  try {
    return window.localStorage.getItem(NAME_KEY) ?? '';
  } catch {
    return '';
  }
};

const saveName = (name) => {
  try {
    window.localStorage.setItem(NAME_KEY, name);
  } catch {
    // Not persisted; the name still applies for this session.
  }
};

export const setupNameModal = () => {
  const element = document.getElementById('nameModal');
  const form = document.getElementById('nameForm');
  const input = document.getElementById('name');
  const error = document.getElementById('error');

  modal = window.bootstrap.Modal.getOrCreateInstance(element);
  input.value = readSavedName();

  element.addEventListener('shown.bs.modal', () => {
    input.focus();
    input.select();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = input.value.trim();
    if (name === '') {
      error.textContent = 'Name can\'t be blank';
      return;
    }
    error.textContent = '';
    gameOptions.playerName = name;
    saveName(name);
    modal.hide();
  });
};

export const openNameModal = () => {
  if (!modal) setupNameModal();
  modal.show();
};
