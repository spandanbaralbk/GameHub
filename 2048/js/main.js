// Entry point. Wires the pure game logic to the renderer, input handler,
// score persistence, and target selector.

import {
  Direction,
  canMove,
  createInitialBoard,
  hasReachedTarget,
  move,
  spawnTile,
} from './game.js';
import { Renderer, renderScores, setMessage } from './render.js';
import { attachInput } from './input.js';

const STORAGE_BEST = '2048:best';
const STORAGE_TARGET = '2048:target';
const DEFAULT_TARGET = 1024;
const VALID_TARGETS = new Set([1024, 2048]);

const el = {
  board: document.getElementById('board'),
  score: document.getElementById('score'),
  best: document.getElementById('best'),
  message: document.getElementById('message'),
  target: document.getElementById('target'),
  newGame: document.getElementById('new-game'),
};

const state = {
  board: null,
  score: 0,
  best: 0,
  target: DEFAULT_TARGET,
  won: false,
  gameOver: false,
  busy: false,
};

const renderer = new Renderer(el.board);

function loadStorage() {
  try {
    const best = parseInt(localStorage.getItem(STORAGE_BEST) || '0', 10);
    state.best = Number.isFinite(best) ? best : 0;
    const target = parseInt(localStorage.getItem(STORAGE_TARGET) || '', 10);
    state.target = VALID_TARGETS.has(target) ? target : DEFAULT_TARGET;
  } catch {
    /* localStorage unavailable — fall back to defaults */
  }
}

function persist(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    /* ignore */
  }
}

function startNewGame() {
  state.board = createInitialBoard();
  state.score = 0;
  state.won = false;
  state.gameOver = false;
  state.busy = false;
  renderer.renderInitial(state.board);
  updateScores();
  setMessage(el.message, '', '');
}

function updateScores() {
  if (state.score > state.best) {
    state.best = state.score;
    persist(STORAGE_BEST, state.best);
  }
  renderScores(el.score, el.best, state.score, state.best);
}

function findSpawnedTile(oldBoard, newBoard) {
  for (let r = 0; r < oldBoard.length; r++) {
    for (let c = 0; c < oldBoard[r].length; c++) {
      if (oldBoard[r][c] === 0 && newBoard[r][c] !== 0) {
        return { r, c, value: newBoard[r][c] };
      }
    }
  }
  return null;
}

async function handleDirection(direction) {
  if (state.busy || state.gameOver) return;
  const result = move(state.board, direction);
  if (!result.moved) return;

  state.busy = true;
  state.score += result.gained;
  await renderer.applyMove(result.transitions, result.merges, result.board);

  const beforeSpawn = result.board;
  const afterSpawn = spawnTile(beforeSpawn);
  const spawned = findSpawnedTile(beforeSpawn, afterSpawn);
  if (spawned) renderer.spawnTileAt(spawned.r, spawned.c, spawned.value);
  state.board = afterSpawn;

  updateScores();

  if (!state.won && hasReachedTarget(state.board, state.target)) {
    state.won = true;
    setMessage(
      el.message,
      `You reached ${state.target}! Keep playing or start a new game.`,
      'win',
    );
  }
  if (!state.gameOver && !canMove(state.board)) {
    state.gameOver = true;
    setMessage(el.message, 'Game over. Press New Game to try again.', 'lose');
  }

  state.busy = false;
}

el.newGame.addEventListener('click', () => startNewGame());
el.target.addEventListener('change', (event) => {
  const parsed = parseInt(event.target.value, 10);
  state.target = VALID_TARGETS.has(parsed) ? parsed : DEFAULT_TARGET;
  persist(STORAGE_TARGET, state.target);
});

attachInput(el.board, handleDirection);

loadStorage();
el.target.value = String(state.target);
startNewGame();
