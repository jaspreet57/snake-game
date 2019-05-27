const START_GAME = 'start-game';

const startGame = () => ({
    type: START_GAME,
    logs: 'Game Started'
});

export {
    START_GAME,
    startGame
}