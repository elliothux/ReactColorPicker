// The input boxes of HSL values component

import React from 'react';
import reactCSS from 'reactcss';
import NumChooser from './NumChooser';


export default class HSLChooser extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div style={this.style().container}>
            <NumChooser
                text="H"
                min={0}
                max={360}
                scale={1}
                value={this.props.H}
                onlyInteger={true}
                getValue={this.props.getValue.bind(null, 'H')}
            />
            <NumChooser
                text="S"
                min={0}
                max={1}
                scale={0.01}
                value={this.props.S}
                onlyInteger={false}
                getValue={this.props.getValue.bind(null, 'S')}
            />
            <NumChooser
                text="L"
                min={0}
                max={1}
                scale={0.01}
                value={this.props.L}
                onlyInteger={false}
                getValue={this.props.getValue.bind(null, 'L')}
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
