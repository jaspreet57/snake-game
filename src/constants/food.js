export const foodColors = {
    RED: {
        colorName: 'snake-color-red'
    },
    PINK: {
        colorName: 'snake-color-pink'
    },
    YELLOW: {
        colorName: 'snake-color-yellow'
    },
    GREEN: {
        colorName: 'snake-color-green'
    },
    DEFAULT: {
        colorName: 'snake-color-grey'
    }
}

export const foodList = {
    APPLE: {
        name: 'apple',
        points: 15,
        color: foodColors.RED,
    },
    STRAWBERRY: {
        name: 'strawberry',
        points: 10,
        color: foodColors.PINK
    },
    BANANA: {
        name: 'banana',
        points: 5,
        color: foodColors.YELLOW
    },
    FROG: {
        name: 'frog',
        points: 20,
        color: foodColors.GREEN
    }
}


export const foodListArray = [foodList.APPLE, foodList.STRAWBERRY, foodList.BANANA, foodList.FROG]