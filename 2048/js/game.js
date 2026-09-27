// Pure game logic for 2048. No DOM, no globals, no side effects beyond what
// callers pass in via the `rng` parameter. Boards are 4x4 arrays of numbers
// where `0` represents an empty cell.

export const SIZE = 4;
export const DEFAULT_TARGET = 1024;

export const Direction = Object.freeze({
  Left: 'left',
  Right: 'right',
  Up: 'up',
  Down: 'down',
});

export function createEmptyBoard(size = SIZE) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

export function cloneBoard(board) {
  return board.map((row) => row.slice());
}

export function emptyCells(board) {
  const cells = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) cells.push([r, c]);
    }
  }
  return cells;
}

// Returns a new board with one tile placed in a random empty cell.
// The tile is `2` with probability 0.9 and `4` with probability 0.1.
// `rng` is a function returning a number in [0, 1).
export function spawnTile(board, rng = Math.random) {
  const cells = emptyCells(board);
  if (cells.length === 0) return board;
  const [r, c] = cells[Math.floor(rng() * cells.length)];
  const result = cloneBoard(board);
  result[r][c] = rng() < 0.9 ? 2 : 4;
  return result;
}

export function createInitialBoard(rng = Math.random) {
  let board = createEmptyBoard();
  board = spawnTile(board, rng);
  board = spawnTile(board, rng);
  return board;
}

// Slide and merge a single row to the left.
//
// Returns:
//   row:         the new row values, padded with zeros to the right
//   gained:      score gained from merges in this row
//   mergedAt:    indices in the new row where a merge landed
//   transitions: for each non-zero source cell, an entry of the form
//                {from, to, merged}, recording where it ended up and
//                whether it disappeared into a merge.
export function slideRowLeft(row) {
  const tiles = [];
  for (let i = 0; i < row.length; i++) {
    if (row[i] !== 0) tiles.push({ value: row[i], from: i });
  }
  const result = [];
  const mergedAt = [];
  const transitions = [];
  let gained = 0;
  let i = 0;
  while (i < tiles.length) {
    if (i + 1 < tiles.length && tiles[i].value === tiles[i + 1].value) {
      const to = result.length;
      const merged = tiles[i].value * 2;
      result.push(merged);
      mergedAt.push(to);
      gained += merged;
      transitions.push({ from: tiles[i].from, to, merged: true });
      transitions.push({ from: tiles[i + 1].from, to, merged: true });
      i += 2;
    } else {
      const to = result.length;
      result.push(tiles[i].value);
      transitions.push({ from: tiles[i].from, to, merged: false });
      i += 1;
    }
  }
  while (result.length < row.length) result.push(0);
  return { row: result, gained, mergedAt, transitions };
}

// Apply `move` in the given direction. Returns:
//   board:       new board state
//   moved:       true iff the board changed
//   gained:      score gained this turn
//   merges:      coordinates of merged tiles in the new board
//   transitions: per source tile, {from: [r,c], to: [r,c], merged}, used by
//                the renderer to animate slides and merges.
export function move(board, direction) {
  const N = board.length;
  const result = cloneBoard(board);
  let moved = false;
  let gained = 0;
  const merges = [];
  const transitions = [];

  // Convert an index along the line into board coordinates given direction.
  let toBoardCoord;
  if (direction === Direction.Left) {
    toBoardCoord = (line, idx) => [line, idx];
  } else if (direction === Direction.Right) {
    toBoardCoord = (line, idx) => [line, N - 1 - idx];
  } else if (direction === Direction.Up) {
    toBoardCoord = (line, idx) => [idx, line];
  } else if (direction === Direction.Down) {
    toBoardCoord = (line, idx) => [N - 1 - idx, line];
  } else {
    throw new Error(`Unknown direction: ${direction}`);
  }

  const lineCount = N;
  for (let line = 0; line < lineCount; line++) {
    const values = [];
    for (let i = 0; i < N; i++) {
      const [r, c] = toBoardCoord(line, i);
      values.push(result[r][c]);
    }
    const slid = slideRowLeft(values);
    for (let i = 0; i < N; i++) {
      const [r, c] = toBoardCoord(line, i);
      if (slid.row[i] !== values[i]) moved = true;
      result[r][c] = slid.row[i];
    }
    gained += slid.gained;
    for (const i of slid.mergedAt) merges.push(toBoardCoord(line, i));
    for (const t of slid.transitions) {
      transitions.push({
        from: toBoardCoord(line, t.from),
        to: toBoardCoord(line, t.to),
        merged: t.merged,
      });
    }
  }

  return { board: result, moved, gained, merges, transitions };
}

export function canMove(board) {
  const N = board.length;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (board[r][c] === 0) return true;
      if (c + 1 < N && board[r][c] === board[r][c + 1]) return true;
      if (r + 1 < N && board[r][c] === board[r + 1][c]) return true;
    }
  }
  return false;
}

export function hasReachedTarget(board, target = DEFAULT_TARGET) {
  for (const row of board) {
    for (const v of row) if (v >= target) return true;
  }
  return false;
}

export function maxTile(board) {
  let max = 0;
  for (const row of board) {
    for (const v of row) if (v > max) max = v;
  }
  return max;
}
