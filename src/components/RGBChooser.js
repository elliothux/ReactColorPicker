// The input boxes of RGB values component

import React from 'react';
import reactCSS from 'reactcss';
import NumChooser from './NumChooser';


export default class RGBChooser extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this)();
    }

    render() {return(
        <div style={this.style.container}>
            <NumChooser
                text="R"
                min={0}
                max={255}
                scale={1}
                value={this.props.R}
                onlyInteger={true}
                getValue={this.props.getValue.bind(null, 'R')}
            />
            <NumChooser
                text="G"
                min={0}
                max={255}
                scale={1}
                value={this.props.G}
                onlyInteger={true}
                getValue={this.props.getValue.bind(null, 'G')}
            />
            <NumChooser
                text="B"
                min={0}
                max={255}
                scale={1}
                value={this.props.B}
                onlyInteger={true}
                getValue={this.props.getValue.bind(null, 'B')}
            />
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '100%',
                height: '40%',
                paddingLeft: '5%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }
        }
    }))}
}