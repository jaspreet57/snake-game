import { START_GAME } from './actions';

const initialState = {
    started: false,
    paused: false,
    level: 1,
    score: 0
}

const gameStateReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_GAME:
            console.log(action.logs);
            return {
                ...state,
                started: true,
            };
        default:
            return state;
    }
}

export default gameStateReducer;