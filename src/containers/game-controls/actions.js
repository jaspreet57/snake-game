export const START_GAME = 'start-game';
export const UPDATE_DIRECTION = 'update-direction';

export const startGame = () => ({
    type: START_GAME,
});

export const updateDirection = (direction) => {
    return ({
        type: UPDATE_DIRECTION,
        direction,
    });
}