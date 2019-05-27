import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame } from './actions';
import './style.css';

export class GamePlayer extends Component {
    componentDidMount() {
        console.log('GamePlayer Mounted with props', this.props);
        this.props.startGame();
    }

    render() {
        return <section className="game-player">GamePlayer Started ?: {String(this.props.started)} </section>
    }
}

export default connect(
    (state) => state.gameState, // map state to props
    { startGame } // bind action creators
)(GamePlayer);