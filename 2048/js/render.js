// DOM renderer. Owns tile elements and animates moves, merges, and spawns.
//
// Each tile is an absolutely-positioned <div> placed via CSS custom
// properties (--row, --col). Sliding is a CSS transition on `transform`;
// merging is a "pop" keyframe; spawning is an "appear" keyframe.

export const SLIDE_MS = 120;
export const MERGE_MS = 120;
export const APPEAR_MS = 120;

export class Renderer {
  constructor(boardEl, gridSize = 4) {
    this.boardEl = boardEl;
    this.gridSize = gridSize;
    this.tileGrid = makeGrid(gridSize);
    this._buildBackground();
  }

  _buildBackground() {
    this.boardEl.innerHTML = '';
    this.boardEl.style.setProperty('--grid-size', String(this.gridSize));

    const bg = document.createElement('div');
    bg.className = 'grid-bg';
    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      bg.appendChild(cell);
    }
    this.boardEl.appendChild(bg);

    this.tilesContainer = document.createElement('div');
    this.tilesContainer.className = 'tiles';
    this.boardEl.appendChild(this.tilesContainer);
  }

  // Draws an entire board from scratch with an "appear" animation on every
  // non-empty cell. Used for new-game / first paint.
  renderInitial(board) {
    this.tilesContainer.innerHTML = '';
    this.tileGrid = makeGrid(this.gridSize);
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        if (board[r][c] !== 0) {
          this.tileGrid[r][c] = this._createTile(board[r][c], r, c, 'appear');
        }
      }
    }
  }

  // Animate a move:
  //   1. slide each source tile to its new position;
  //   2. once the slide is done, collapse merged tiles into a single new
  //      tile that pops in at the destination.
  async applyMove(transitions, mergedCoords, newBoard) {
    const newGrid = makeGrid(this.gridSize);
    const toRemove = [];

    for (const t of transitions) {
      const [fr, fc] = t.from;
      const [tr, tc] = t.to;
      const el = this.tileGrid[fr][fc];
      if (!el) continue;
      this._setPosition(el, tr, tc);
      if (newGrid[tr][tc] === null) {
        newGrid[tr][tc] = el;
      } else {
        toRemove.push(el);
      }
    }
    this.tileGrid = newGrid;

    await delay(SLIDE_MS);

    for (const el of toRemove) el.remove();

    for (const [r, c] of mergedCoords) {
      const oldEl = this.tileGrid[r][c];
      if (oldEl) oldEl.remove();
      this.tileGrid[r][c] = this._createTile(newBoard[r][c], r, c, 'pop');
    }

    await delay(MERGE_MS);
  }

  spawnTileAt(r, c, value) {
    this.tileGrid[r][c] = this._createTile(value, r, c, 'appear');
  }

  _createTile(value, r, c, animationClass) {
    const el = document.createElement('div');
    el.className = `tile tile-v${value}`;
    if (animationClass) el.classList.add(`tile-${animationClass}`);
    el.textContent = String(value);
    this._setPosition(el, r, c);
    this.tilesContainer.appendChild(el);
    if (animationClass) {
      window.setTimeout(() => el.classList.remove(`tile-${animationClass}`), APPEAR_MS);
    }
    return el;
  }

  _setPosition(el, r, c) {
    el.style.setProperty('--row', String(r));
    el.style.setProperty('--col', String(c));
  }
}

function makeGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function renderScores(currentEl, bestEl, current, best) {
  currentEl.textContent = String(current);
  bestEl.textContent = String(best);
}

export function setMessage(messageEl, text, mode) {
  messageEl.textContent = text || '';
  messageEl.dataset.mode = mode || '';
  messageEl.hidden = !text;
}
