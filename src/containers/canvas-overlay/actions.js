export const START_GAME = 'start-game';
export const UPDATE_DIRECTION = 'update-direction';
export const PAUSE_GAME = 'pause-game';

export const startGame = () => ({
    type: START_GAME,
});

export const pauseGame = () => ({
    type: PAUSE_GAME,
});

export const updateDirection = (direction) => {
    return ({
        type: UPDATE_DIRECTION,
        direction,
    });
}