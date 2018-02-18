import * as React from 'react';

export class Crosshair extends React.Component {
    constructor(props) {
        super(props);
    }


    shouldComponentUpdate(nextProps, nextState) {
        if( nextProps !== this.props ) {
            return true;
        }
        return false;
    }
    render() {
        return (
            <g pointerEvents="none">
                {/* Ligne verticale */}
                <g display={this.props.displayVertical?null:"none"}>
                    <line x1={this.props.xPosition}
                        x2={this.props.xPosition}
                        y1={this.props.top}
                        y2={this.props.bottom}
                        stroke="lavender"
                        strokeWidth='1'
                        shapeRendering="crispEdges"/>
                </g>
                {/* Ligne Horizontale */}
                {/* <g display={this.props.displayHorizontal}>
                    <line x1={this.props.left}
                        x2={this.props.right}
                        y1={this.props.yPosition}
                        y2={this.props.yPosition}
                        stroke="black"
                        strokeWidth='1'/>
                </g> */}
            </g>
        )
    }
}
