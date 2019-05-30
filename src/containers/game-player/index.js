import './style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame, setupNewGame } from './actions';
import Grid from '../../components/grid';


export class GamePlayer extends Component {
    componentDidMount() {
        console.log('GamePlayer Mounted with props', this.props);
        this.props.setupNewGame();
    }

    render() {
        return (
            <section className="game-player">
                <div className="grid-canvas-wrapper">
                    <div className="grid-canvas">
                        <Grid />
                    </div>
                </div>
            </section>
        )
    }
}

export default connect(
    null, // no state mapped
    { startGame, setupNewGame } // bind action creators
)(GamePlayer);