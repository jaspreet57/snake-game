import { foodColors } from '../../../constants/food';
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
                foodInfo: null
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
        color: foodColors.DEFAULT
    }

    // update cell data also for snake
    cellsById[grid[randomCell.x][randomCell.y]] = {
        hasSnake: true,
        nextSnakeCell: null,   // if it hasSnake and is not head of snake or length of snake is not 1
        snakeColor: foodColors.DEFAULT,
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