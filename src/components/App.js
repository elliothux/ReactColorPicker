import React from 'react';
import reactCSS from 'reactcss';
import HSLChooser from './HSLChooser';
import HuePicker from './HuePicker';
import LightnessPicker from './LightnessPicker';
import RGBChooser from './RGBChooser';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this)();
        this.setValue = this.setValue.bind(this);

        this.state = {
            R: 0,
            G: 0,
            B: 0,
            H: 0,
            S: 0,
            L: 0
        }
    }

    setValue(type, value) {
        switch (type) {
            case 'R': this.setState((prevState, props) => ({R: value})); break;
            case 'G': this.setState((prevState, props) => ({G: value})); break;
            case 'B': this.setState((prevState, props) => ({B: value})); break;
            case 'H': this.setState((prevState, props) => ({H: value})); break;
            case 'S': this.setState((prevState, props) => ({S: value})); break;
            case 'L': this.setState((prevState, props) => ({L: value})); break;
            default: return;
        }
    }

    render() {return(
        <div style={this.style.container}>
            <LightnessPicker/>
            <HuePicker/>
            <div style={this.style.chooser}>
                <RGBChooser
                    R={this.state.R}
                    G={this.state.G}
                    B={this.state.B}
                    getValue={this.setValue}
                />
                <hr style={this.style.hr}/>
                <HSLChooser
                    H={this.state.H}
                    S={this.state.S}
                    L={this.state.L}
                    getValue={this.setValue}
                />
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '500px',
                height: '250px',
                display: 'flex',
                flexDirection: 'row',
                flexFlow: 'row',
                justifyContent: 'space-between',
                margin: '50px '
            },
            chooser: {
                height: '100%',
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            },
            hr: {
                width: '105%'
            }
        }
    }, this.props, this.state))}
}
