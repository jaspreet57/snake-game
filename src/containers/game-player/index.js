import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame, setupNewGame } from './actions';
import './style.css';

export class GamePlayer extends Component {
    componentDidMount() {
        console.log('GamePlayer Mounted with props', this.props);
        this.props.setupNewGame();
    }

    render() {
        return <section className="game-player">GamePlayer Started ?: {String(this.props.started)} </section>
    }
}

export default connect(
    (state) => state.gameState, // map state to props
    { startGame, setupNewGame } // bind action creators
)(GamePlayer);