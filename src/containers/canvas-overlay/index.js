import './style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame, updateDirection, pauseGame } from './actions';
import { setupNewGame } from '../game-player/actions';
import { directions } from '../../constants/directions';

let count = 1;


export class CanvasOverlay extends Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.setUpNewGame = this.setUpNewGame.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        console.log('handle key down called', count++);
        let direction;
        switch(e.keyCode) {
            case 39:
            case 68:
                direction = directions.RIGHT;
                break;
            case 38:
            case 87:
                direction = directions.UP;
                break;
            case 37:
            case 65:
                direction = directions.LEFT;
                break;
            case 40:
            case 83:
                direction = directions.DOWN;
                break;
            default:
        }

        if(direction) {
            e.preventDefault();
            this.props.updateDirection(direction);
        }
    }

    startGame() {
        document.addEventListener("keydown", this.handleKeyDown);
        this.props.startGame();
    }

    pauseGame() {
        document.removeEventListener("keydown", this.handleKeyDown);
        this.props.pauseGame();
    }

    setUpNewGame() {
        document.removeEventListener("keydown", this.handleKeyDown);
        this.props.setupNewGame();
    }

    render() {
        if (!this.props.running) {
            return (
                <div className="canvas-overlay">
                    <button onClick={this.startGame} >Start New Game</button>
                </div>
            )
        } else if (this.props.running && this.props.paused) {
            return (
                <div className="canvas-overlay">
                    <button onClick={this.startGame} >Resume Game</button>
                </div>
            )
        } else if (this.props.running && this.props.dead) {
            return (
                <div className="canvas-overlay">
                    <div>You are dead !</div>
                    <button onClick={this.setUpNewGame} >Ok</button>
                </div>
            )
        } else {
            return (
                <div className="pause-button">
                    <button onClick={this.pauseGame} >Pause Game</button>
                </div>
            );
        }
    }
}

export default connect(
    (state) => state.gameState,
    { startGame, pauseGame, updateDirection, setupNewGame }
)(CanvasOverlay);