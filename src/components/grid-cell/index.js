import './style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { foodColors } from '../../constants/food';


export class GridCell extends Component {
    render() {
        const cellClasses = ['grid-cell'];


        if (this.props.hasSnake) {
            cellClasses.push(this.props.snakeColor || foodColors.DEFAULT.colorName);
        }

        if (this.props.hasFood) {
            cellClasses.push(`food-name-${this.props.foodInfo.name}`);
        }
        
        const classNames = cellClasses.join(' ');
        
        return (
            <div key={this.props.key} className={classNames}>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => state.cellById[ownProps.cellId], // map state to props
)(GridCell);