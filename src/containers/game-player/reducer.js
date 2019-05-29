import { loop, Cmd } from 'redux-loop';
import { START_GAME, SETUP_NEW_GAME, SETUP_NEW_SCORE_BOARD } from './actions';
import { initialCell, initialCellById, initialGameState, initialGridCanvas, initialScoreBoard, initialSnakeInfo } from './initialStates';

export const gameStateReducer = (state = initialGameState, action) => {
    switch(action.type) {
        case SETUP_NEW_GAME:
            return loop(
                {
                    ...state,
                    running: false,
                    paused: false,
                    dead: false,
                },
                Cmd.action({ type: SETUP_NEW_SCORE_BOARD})
            );
        case START_GAME:
            return {
                ...state,
                running: true,
            };
        
        default:
            return state;
    }
}

export const scoreBoardReducer = (state = initialScoreBoard, action) => {
    switch(action.type) {
        case SETUP_NEW_SCORE_BOARD:
            return {
                ...state,
                level: 2,
                score: 10
            }
        default:
            return state;
    }
}

export const gridCanvasReducer = (state = initialGridCanvas, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export const cellByIdReducer = (state = initialCellById, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export const cellReducer = (state = initialCell, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export const snakeInfoReducer = (state = initialSnakeInfo, action) => {
    switch(action.type) {
        default:
            return state;
    }
}