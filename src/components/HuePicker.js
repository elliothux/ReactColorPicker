import React from 'react';
import reactCSS from 'reactcss';


export default class HuePicker extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this)();
    }

    render() {return(
        <div style={this.style.container}>
            Hue
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '5%',
                height: '100%',
                backgroundColor: 'green'
            }
        }
    }))}
}