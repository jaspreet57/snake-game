import './style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupNewGame } from './actions';
import Grid from '../../components/grid';
import GameControls from '../game-controls';
import ScoreBoard from '../../components/score-board';


export class GamePlayer extends Component {
    componentDidMount() {
        this.props.setupNewGame();
    }

    render() {
        return (
            <section className="game-player">
                <div className="grid-canvas-wrapper">
                    <ScoreBoard />
                    <div className="grid-canvas">
                        <Grid />
                        <GameControls />
                    </div>
                </div>
            </section>
        )
    }
}

export default connect(
    null, // no state mapped
    { setupNewGame } // bind action creators
)(GamePlayer);