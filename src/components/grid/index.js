import './style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridCell from '../grid-cell';


export class Grid extends Component {
    render() {
        const gridStyle = {
            gridTemplateColumns: `repeat(${this.props.width}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${this.props.height}, minmax(0, 1fr))`,
        }
        return (
            <div className="grid" style={gridStyle}>
                {
                    ((width, height) => {
                        const cells = [];
                        for(let j=0; j < height; j++) {
                            for(let i=0; i < width; i++) {
                                cells.push(<GridCell key={this.props.grid[i][j]} cellId={this.props.grid[i][j]}/>)
                            }
                        }
                        return cells;
                    })(this.props.width, this.props.height)
                }
            </div>
        )
    }
}

export default connect(
    (state) => state.gridCanvas, // map state to props
)(Grid);
