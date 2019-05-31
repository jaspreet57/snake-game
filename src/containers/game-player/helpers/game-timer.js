import { STEP } from '../actions';

export class GameTimer {
    timeout;

    nextStep(dispatch, state) {
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => dispatch({
            type: STEP
        }), state.snakeInfo.speed);
    }
}