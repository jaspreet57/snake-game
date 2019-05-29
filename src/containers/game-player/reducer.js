import { loop, Cmd } from 'redux-loop';
import { 
    START_GAME,
    SETUP_NEW_GAME,
    SETUP_NEW_SCORE_BOARD,
    RESET_GAME,
    SETUP_GRID,
    GAME_ERROR,
    UPDATE_DIRECTION,
    UPDATE_SNAKE,
    SETUP_CELLS_BY_ID
} from './actions';
import { initialCell, initialCellById, initialGameState, initialGridCanvas, initialScoreBoard, initialSnakeInfo, initialGameControls } from './initialStates';
import { createNewGridWithRandomSnake } from './helpers/grid-helpers';
import { gridSize } from '../../config/game';

export const gameStateReducer = (state = initialGameState, action) => {
    switch (action.type) {
        case SETUP_NEW_GAME:
            return loop(
                state,
                Cmd.list([
                    Cmd.action({ type: RESET_GAME }),
                    Cmd.action({ type: SETUP_NEW_SCORE_BOARD }),
                    Cmd.run(createNewGridWithRandomSnake, {
                        successActionCreator: (data) => ({
                            type: SETUP_GRID,
                            payload: data
                        }),
                        failActionCreator: (error) => ({
                            type: GAME_ERROR,
                            error: error
                        }),
                        args: [gridSize.width, gridSize.height]
                    }),
                ])
            );
        case GAME_ERROR:
            console.log('Error occured', action.error);
            return {
                ...state,
                error: true,
                errorInfo: action.error
            }
        case RESET_GAME:
            return {
                ...state,
                running: false,
                paused: false,
                dead: false,
            }
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
    switch (action.type) {
        case SETUP_NEW_SCORE_BOARD:
            return {
                ...state,
                level: 1,
                score: 0
            }
        default:
            return state;
    }
}

export const gameControlsReducer = (state = initialGameControls, action) => {
    switch (action.type) {
        case UPDATE_DIRECTION:
            return {
                ...state,
                direction: action.direction
            }
        default:
            return state;
    }
}

export const gridCanvasReducer = (state = initialGridCanvas, action) => {
    switch (action.type) {
        case SETUP_GRID:
            return loop(
                {
                    ...state,
                    grid: action.payload.gridInfo.grid,
                    width: action.payload.gridInfo.width,
                    height: action.payload.gridInfo.height
                },
                Cmd.list([
                    Cmd.action({ type: SETUP_CELLS_BY_ID, payload: action.payload.cellsById}),
                    Cmd.action({ type: UPDATE_SNAKE, payload: action.payload.snakeInfo})
                ])
            );
        default:
            return state;
    }
}

export const cellByIdReducer = (state = initialCellById, action) => {
    switch (action.type) {
        case SETUP_CELLS_BY_ID:
            return action.payload;
        default:
            return state;
    }
}

export const cellReducer = (state = initialCell, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const snakeInfoReducer = (state = initialSnakeInfo, action) => {
    switch (action.type) {
        case UPDATE_SNAKE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}