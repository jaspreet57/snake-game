export const foodColors = {
    RED: {
        colorName: 'snake-color-red'
    },
    GLOWING_WHITE: {
        colorName: 'snake-color-glowing-white'
    },
    DEFAULT: {
        colorName: 'snake-color-grey'
    }
}

export const foodList = {
    APPLE: {
        name: 'apple',
        points: 5,
        image: 'apple.png',
        color: foodColors.RED,
    },
    LICHI: {
        name: 'lichi',
        points: 10,
        image: 'lichi.png',
        color: foodColors.GLOWING_WHITE
    }
}


export const foodListArray = [foodList.APPLE, foodList.LICHI]