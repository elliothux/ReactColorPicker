import React from 'react';
import reactCSS from 'reactcss';


export default class LightnessPicker extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this)();
    }

    render() {return(
        <div style={this.style.container}>
            Lightness
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '50%',
                height: 0,
                paddingBottom: '50%',
                backgroundColor: 'blue',
            }
        }
    }))}
}