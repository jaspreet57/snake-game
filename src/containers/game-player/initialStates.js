import { foodColors } from '../../constants/food';
import { directions } from '../../constants/directions';

export const initialGameState = {
    running: false,
    paused: false,
    dead: false,
    error: false
}

export const initialScoreBoard = {
    level: 1,
    score: 0
}

export const initialGameControls = {
    direction: directions.RIGHT, // default direction
}

export const initialGridCanvas = {
    grid: [], // new Array(width).fill(new Array(height).fill(cell_ids))
    height: 0,
    width: 0
};

export const initialCellById = {
    // [id]: cellInfo
}

export const initialCell = {
    /**
     * hasSnake: false,
     * nextSnakeCell: {x: 2, y: 1},   // if it hasSnake
     * nextSnakeDirection: null // example 'right', 'left', 'up', 'down'
     * isSnakeHead: false,
     * snakeColor: foodColors.DEFAULT
     * hasFood: false,
     * foodInfo: null || food.foodList.APPLE, etc,
     */
}

export const initialSnakeInfo = {
    head: null, // head: {x: 3, x: 4}
    tail: null, // tail: {x: 1, y: 4}
    length: 0,
    speed: 1000, // 1 sec
    color: foodColors.DEFAULT
}