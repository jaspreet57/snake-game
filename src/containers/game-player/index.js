import './style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupNewGame } from './actions';
import Grid from '../../components/grid';
import CanvasOverlay from '../canvas-overlay';


export class GamePlayer extends Component {
    componentDidMount() {
        this.props.setupNewGame();
    }

    render() {
        return (
            <section className="game-player">
                <div className="grid-canvas-wrapper">
                    <div className="grid-canvas">
                        <Grid />
                        <CanvasOverlay />
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