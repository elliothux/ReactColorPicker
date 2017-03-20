import React from 'react';
import reactCSS from 'reactcss';


export default class LightnessPicker extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.state = {
            linearGradient: `hsl(${this.props.H}, 0%, 100%), hsl(${this.props.H}, 50%, 50%), hsl(${this.props.H}, 100%, 0%)`
        }
    }

    componentDidUpdate() {
        if (this.state.linearGradient ===
            `hsl(${this.props.H}, 0%, 100%), hsl(${this.props.H}, 50%, 50%), hsl(${this.props.H}, 100%, 0%)`)
            return;
        this.setState({
            linearGradient: `hsl(${this.props.H}, 0%, 100%), hsl(${this.props.H}, 50%, 50%), hsl(${this.props.H}, 100%, 0%)`
        });
    }

    render() {return(
        <div style={this.style().container}/>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '50%',
                height: 0,
                paddingBottom: '50%',
                backgroundImage: `linear-gradient(to right bottom, ${this.state.linearGradient})`
            }
        }
    }))}
}