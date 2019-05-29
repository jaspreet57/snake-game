export const START_GAME = 'start-game';
export const SETUP_NEW_GAME = 'setup-new-game';
export const SETUP_NEW_SCORE_BOARD = 'setup-new-score-board';
export const RESET_GAME = 'reset-game';
export const SETUP_GRID = 'setup-grid';
export const GAME_ERROR = 'game-error';
export const UPDATE_DIRECTION = 'update-direction';
export const SETUP_CELLS_BY_ID = 'setup-cells-by-id';
export const UPDATE_SNAKE = 'update-snake';

export const startGame = () => ({
    type: START_GAME,
});

export const setupNewGame = () => ({
    type: SETUP_NEW_GAME // this will setup game state, then score board, then grid and all cells, and then place random snake in it.
});
