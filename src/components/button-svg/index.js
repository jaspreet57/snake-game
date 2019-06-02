import './style.css';
import React, { Component } from 'react';

export class ButtonSVG extends Component {
    render() {
        return (
            <div className="button-svg">
                <svg onClick={this.props.startGame} viewBox="45 60 400 320" xmlns="http://www.w3.org/2000/svg" style={{
                    maxWidth: `${this.props.config.width}`
                }}>
                    <path fill="#fff" d="M 90 210 C 90 180 90 150 90 150 C 150 150 180 150 180 150 C 180 150 300 150 300 150 C 300 150 330 150 390 150 C 390 150 390 180 390 210 C 390 240 390 270 390 270 C 330 270 300 270 300 270 C 300 270 180 270 180 270 C 180 270 150 270 90 270 C 90 270 90 240 90 210" mask="url(#knockout-text)" >
                    </path>
                    <mask id="knockout-text">
                    <rect width="100%" height="100%" fill="#fff" x="0" y="0" />
                    <text x={this.props.config.xCordinates} y="227" fill="#000">{this.props.buttonText}</text>
                    </mask>
                </svg>
            </div>
        )
    }
}

export default ButtonSVG;