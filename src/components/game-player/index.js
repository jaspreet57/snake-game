import React, { Component } from 'react';
import './style.css';

class GamePlayer extends Component {
    componentDidMount() {
        console.log('GamePlayer Mounted');
    }

    render() {
        return <section className="game-player">GamePlayer</section>
    }
}

export default GamePlayer;
