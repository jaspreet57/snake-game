export const START_GAME = 'start-game';
export const SETUP_NEW_GAME = 'setup-new-game';
export const SETUP_NEW_SCORE_BOARD = 'setup-new-score-board';

export const startGame = () => ({
    type: START_GAME,
});

export const setupNewGame = () => ({
    type: SETUP_NEW_GAME // this will setup game state, then score board, then grid and all cells, and then place random snake in it.
});
