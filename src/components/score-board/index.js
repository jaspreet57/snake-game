import './style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pauseGame } from './actions';


export class ScoreBoard extends Component {
    render() {
        const gState = this.props.gameState;
        return (
            <div className="score-board-wrapper">
                <div className={(gState.running && !(gState.paused || gState.dead || gState.error)) ? 'score-board white': 'score-board default'}>
                    <div className="game-level">
                        <label>Level</label>
                        <span>{this.props.scoreBoard.level}</span>
                    </div>
                    <div className="game-score">
                        <label>Score</label>
                        <span>{this.props.scoreBoard.score}</span>
                    </div>
                    <div className="score-board-actions">
                        <div className="pause-button">
                            <button onClick={this.props.pauseGame} disabled={!gState.running || (gState.paused || gState.dead || gState.error)} >Pause Game</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        scoreBoard: state.scoreBoard,
        gameState: state.gameState
    }),
    { pauseGame }
)(ScoreBoard);