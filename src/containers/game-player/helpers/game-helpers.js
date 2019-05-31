import { foodColors, foodListArray } from '../../../constants/food';
import { directions } from '../../../constants/directions';
import { snake } from '../../../config/game';
import { rand, getNextNumberInRange } from './utils';
import { UPDATE_SNAKE, CREATE_NEW_FOOD, ADD_NEW_HEAD, UPDATE_CURRENT_HEAD, REMOVE_CURRENT_TAIL, UPDATE_SCORE, DEAD_GAME } from '../actions';
import { GameTimer } from './game-timer';

const gameTimer = new GameTimer();

export const createNewGridWithRandomSnake = (width, height) => {
    const grid = [];
    const cellsById = {};

    for (let i = 0; i < width; i++) {
        grid.push([]);
        for (let j = 0; j < height; j++) {
            const id = `cell_${i}_${j}`;
            cellsById[id] = {
                hasSnake: false,
                nextSnakeCell: null,   // if it hasSnake and is not head of snake
                snakeColor: null,
                hasFood: false,
                foodInfo: null,
                id
            };
            grid[i].push(id);
        }
    }

    // place snake head randomly
    const randomCell = {
        x: rand(0, width),
        y: rand(0, height)
    }
    const snakeInfo = {
        head: randomCell,
        tail: randomCell,
        length: 1,
        speed: snake.startSpeed,
        color: foodColors.DEFAULT.colorName
    }

    // update cell data also for snake
    cellsById[grid[randomCell.x][randomCell.y]] = {
        id: grid[randomCell.x][randomCell.y],
        hasSnake: true,
        nextSnakeCell: null,   // if it hasSnake and is not head of snake or length of snake is not 1
        snakeColor: foodColors.DEFAULT.colorName,
        hasFood: false,
        foodInfo: null
    }

    return {
        gridInfo: {
            grid,
            width,
            height
        },
        cellsById,
        snakeInfo
    }
};


export const createNewFood = (getState) => {
    const { gridCanvas: { grid, width, height }, cellById } = getState();

    const emptyCells = [];
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const cell = cellById[grid[i][j]];

            if (!cell.hasSnake && !cell.hasFood) { // cells that has no food and no snake
                emptyCells.push(cell);
            }
        }
    }

    const randomCell = emptyCells[rand(0, emptyCells.length)];
    const randomFood = foodListArray[rand(0, foodListArray.length)];

    return {
        id: randomCell.id,
        hasFood: true,
        foodInfo: randomFood
    };
};

export const getNextHead = (direction, head, width, height) => {
    switch (direction) {
        case directions.UP:
            return {
                x: head.x,
                y: getNextNumberInRange(height, head.y, -1)
            };
        case directions.RIGHT:
            return {
                x: getNextNumberInRange(width, head.x, 1),
                y: head.y
            };
        case directions.DOWN:
            return {
                x: head.x,
                y: getNextNumberInRange(height, head.y, 1)
            };
        case directions.LEFT:
            return {
                x: getNextNumberInRange(width, head.x, -1),
                y: head.y
            };
        default:
            return head;
    }
};

export const markSnakeDead = (dispatch) => {
    dispatch({
        type: DEAD_GAME
    })
}

export const processStep = (getState, dispatch) => {
    const state = getState();
    const continueTimer = moveOneStep(state, dispatch);
    continueTimer && gameTimer.nextStep(dispatch, state);
}

export const processOneStepOnly = (getState, dispatch) => {
    const state = getState();
    moveOneStep(state, dispatch);
}

export const moveOneStep = (state, dispatch) => {
    if (state.gameState.running && !(state.gameState.paused || state.gameState.error || state.gameState.dead)) {
        const nextSnakeHead = getNextHead(
            state.gameControls.direction,
            state.snakeInfo.head,
            state.gridCanvas.width,
            state.gridCanvas.height
        );

        const nextHeadCellInfo = state.cellById[state.gridCanvas.grid[nextSnakeHead.x][nextSnakeHead.y]];
        if (nextHeadCellInfo.hasSnake) {
            if ((state.snakeInfo.length === 2) || !((state.snakeInfo.tail.x === nextSnakeHead.x) && (state.snakeInfo.tail.y === nextSnakeHead.y))) {
                return markSnakeDead(dispatch);
            }
        }

        const newSnakeInfo = {
            head: nextSnakeHead,
            color: (nextHeadCellInfo.hasFood && nextHeadCellInfo.foodInfo.color.colorName) || state.snakeInfo.color,
            length: (nextHeadCellInfo.hasFood && (state.snakeInfo.length + 1)) || state.snakeInfo.length,
        }

        // headMove()
        // add new head
        dispatch({
            type: ADD_NEW_HEAD,
            payload: {
                id: nextHeadCellInfo.id,
                hasSnake: true,
                nextSnakeCell: null,
                snakeColor: newSnakeInfo.color,
                hasFood: false,
                foodInfo: null
            }
        });
        // update old head cell
        const currentHeadCell = state.cellById[state.gridCanvas.grid[state.snakeInfo.head.x][state.snakeInfo.head.y]];
        dispatch({
            type: UPDATE_CURRENT_HEAD,
            payload: {
                id: currentHeadCell.id,
                nextSnakeCell: nextSnakeHead,
            }
        });


        // tailMove()
        if (!nextHeadCellInfo.hasFood) {
            // remove current tail
            const currentTailCell = state.cellById[state.gridCanvas.grid[state.snakeInfo.tail.x][state.snakeInfo.tail.y]];
            dispatch({
                type: REMOVE_CURRENT_TAIL,
                payload: {
                    id: currentTailCell.id,
                    nextSnakeCell: null,
                    hasSnake: false,
                    snakeColor: null,
                    hasFood: false,
                    foodInfo: null
                }
            });
            // update snake info with new tail
            newSnakeInfo.tail = currentTailCell.nextSnakeCell || nextSnakeHead; // for snake length 1 tail will be equal to newSnakeHead
        }

        dispatch({ type: UPDATE_SNAKE, payload: newSnakeInfo });

        if (nextHeadCellInfo.hasFood) {
            dispatch({
                type: UPDATE_SCORE,
                payload: {
                    score: (state.scoreBoard.score + nextHeadCellInfo.foodInfo.points)
                }
            })
            dispatch({
                type: CREATE_NEW_FOOD
            });
        }

        return true;
    } else {
        return false;
    }
}