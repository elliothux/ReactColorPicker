import React from 'react';
import reactCSS from 'reactcss';
import HSLChooser from './HSLChooser';
import HuePicker from './HuePicker';
import LightnessPicker from './LightnessPicker';
import RGBChooser from './RGBChooser';
import { RGB2HSL, HSL2RGB } from '../lib/colorLib';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this)();
        this.setValue = this.setValue.bind(this);

        this.state = {
            R: 255,
            G: 255,
            B: 255,
            H: 360,
            S: 0,
            L: 1
        }
    }

    setValue(type, value) {
        switch (type) {
            case 'R': {
                const {H, S, L} = RGB2HSL(value, this.state.G, this.state.B);
                this.setState((prevState, props) => ({
                    R: value, H: H, S: S, L: L
                }));
                break;
            }
            case 'G': {
                const {H, S, L} = RGB2HSL(this.state.R, value, this.state.B);
                this.setState((prevState, props) => ({
                    G: value, H: H, S: S, L: L
                }));
                break;
            }
            case 'B': {
                const {H, S, L} = RGB2HSL(this.state.R, this.state.G, value);
                this.setState((prevState, props) => ({
                    B: value, H: H, S: S, L: L
                }));
                break;
            }
            case 'H': {
                const {R, G, B} = HSL2RGB(value, this.state.S, this.state.L);
                this.setState((prevState, props) => ({
                    H: value, R: R, G: G, B: B
                }));
                break;
            }
            case 'S': {
                const {R, G, B} = HSL2RGB(this.state.H, value, this.state.L);
                this.setState((prevState, props) => ({
                    S: value, R: R, G: G, B: B
                }));
                break;
            }
            case 'L': {
                const {R, G, B} = HSL2RGB(this.state.H, this.state.S, value);
                this.setState((prevState, props) => ({
                    L: value, R: R, G: G, B: B
                }));
                break;
            }
            default: return;
        }
    }

    render() {return(
        <div style={this.style.container}>
            <LightnessPicker
                H={this.state.H}
                S={this.state.S}
                L={this.state.L}
                setS={this.setValue.bind(null, 'S')}
                setL={this.setValue.bind(null, 'L')}
            />
            <HuePicker
                H={this.state.H}
                setValue={this.setValue.bind(null, 'H')}
            />
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
                margin: '50px ',
                userSelect: 'none'
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
