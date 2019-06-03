import './style.css';
import React, { Component } from 'react';


export class Footer extends Component {
    render() {
        return (
            <div className="footer">
                Snake Game by <a href="https://www.jaspreet-singh.com" target="_blank" rel="noopener noreferrer">Jaspreet Singh</a>. Hosted with <i className="icon ion-heart"></i> by <a href="https://github.com/jaspreet57/snake-game" target="_blank" rel="noopener noreferrer">Github</a>
            </div>
        )
    }
}

export default Footer;