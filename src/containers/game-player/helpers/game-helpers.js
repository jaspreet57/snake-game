import { foodColors, foodListArray } from '../../../constants/food';
import { snake } from '../../../config/game';
import { rand } from './utils';

export const createNewGridWithRandomSnake = (width, height) => {
    const grid = [];
    const cellsById = {};

    for(let i = 0; i < width; i++) {
        grid.push([]);
        for(let j=0; j < height; j++) {
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
    for(let i=0; i < width; i++) {
        for(let j=0; j<height; j++) {
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