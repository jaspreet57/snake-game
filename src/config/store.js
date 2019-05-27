import { createStore, combineReducers } from 'redux';
import gameStateReducer from '../components/game-player/reducer';

const rootReducer = combineReducers({
    gameState: gameStateReducer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;