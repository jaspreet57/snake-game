import './style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame } from './actions'


export class CanvasOverlay extends Component {
    render() {
        if (!this.props.running) {
            return (
                <div className="canvas-overlay">
                    <button onClick={this.props.startGame} >Start New Game</button>
                </div>
            )
        } else if (this.props.running && this.props.paused) {
            return (
                <div className="canvas-overlay">
                    <button onClick={this.props.startGame} >Resume Game</button>
                </div>
            )
        } else if (this.props.running && this.props.dead) {
            return (
                <div className="canvas-overlay">
                    <div>You are dead !</div>
                    <button onClick={this.props.startGame} >Ok</button>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default connect(
    (state) => state.gameState,
    { startGame }
)(CanvasOverlay);