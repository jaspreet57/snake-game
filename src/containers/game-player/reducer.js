import { loop, Cmd } from 'redux-loop';
import {
    SETUP_NEW_GAME,
    SETUP_NEW_SCORE_BOARD,
    RESET_GAME,
    SETUP_GRID,
    GAME_ERROR,
    UPDATE_DIRECTION,
    UPDATE_SNAKE,
    SETUP_CELLS_BY_ID,
    CREATE_NEW_FOOD,
    PLACE_FOOD,
    STEP,
    ADD_NEW_HEAD,
    UPDATE_CURRENT_HEAD,
    REMOVE_CURRENT_TAIL,
    UPDATE_SCORE
} from './actions';
import {
    START_GAME
} from '../canvas-overlay/actions';
import { initialCell, initialCellById, initialGameState, initialGridCanvas, initialScoreBoard, initialSnakeInfo, initialGameControls } from './initialStates';
import { createNewGridWithRandomSnake, createNewFood, processStep } from './helpers/game-helpers';
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
        case CREATE_NEW_FOOD:
            return loop(
                state,
                Cmd.run(createNewFood, {
                    successActionCreator: (cellWithFood) => ({
                        type: PLACE_FOOD,
                        payload: cellWithFood
                    }),
                    failActionCreator: (error) => ({
                        type: GAME_ERROR,
                        error: error
                    }),
                    args: [Cmd.getState]
                })
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
            return loop(
                {
                    ...state,
                    running: true,
                },
                Cmd.action({ type: STEP })
            );
        case STEP:
            return loop(
                state,
                Cmd.run(processStep, {
                    failActionCreator: (error) => ({
                        type: GAME_ERROR,
                        error: error
                    }),
                    args: [Cmd.getState, Cmd.dispatch]
                })
            );
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
        case UPDATE_SCORE:
            return {
                ...state,
                score: action.payload.score
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
                    Cmd.action({ type: UPDATE_SNAKE, payload: action.payload.snakeInfo}),
                    Cmd.action({ type: CREATE_NEW_FOOD })
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
        case PLACE_FOOD:
        case ADD_NEW_HEAD:
        case UPDATE_CURRENT_HEAD:
        case REMOVE_CURRENT_TAIL:
            return {
                ...state,
                [action.payload.id]: cellReducer(state[action.payload.id], action)
            }
        default:
            return state;
    }
}

export const cellReducer = (state = initialCell, action) => {
    switch (action.type) {
        case PLACE_FOOD:
        case ADD_NEW_HEAD:
        case UPDATE_CURRENT_HEAD:
        case REMOVE_CURRENT_TAIL:
            return {
                ...state,
                ...action.payload
            }
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