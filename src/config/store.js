import { createStore } from 'redux';
import { combineReducers } from 'redux-loop';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { install } from 'redux-loop';
import {
    gameStateReducer,
    scoreBoardReducer,
    gridCanvasReducer,
    cellByIdReducer,
    snakeInfoReducer,
    gameControlsReducer
} from '../containers/game-player/reducer';

const rootReducer = combineReducers({
    gameState: gameStateReducer,
    scoreBoard: scoreBoardReducer,
    gridCanvas: gridCanvasReducer,
    cellById: cellByIdReducer,
    snakeInfo: snakeInfoReducer,
    gameControls: gameControlsReducer,
});

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});


const enhancers = composeEnhancers(
    install()
);

const store = createStore(
    rootReducer,
    enhancers
);

export default store;