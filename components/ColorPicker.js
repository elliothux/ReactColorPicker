// Main component

import React from 'react';
import reactCSS from 'reactcss';
import HSLChooser from './HSLChooser';
import RGBChooser from './RGBChooser';
import HuePicker from './HuePicker';
import LightnessPicker from './LightnessPicker';
import { RGB2HSL, HSL2RGB, RGB2HEX, HEX2RGB } from '../lib/colorLib';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this)();
        this.setValue = this.setValue.bind(this);
        this.setRGB = this.setRGB.bind(this);
        this.setHSL  = this.setHSL.bind(this);
        this.setHEX = this.setHEX.bind(this);

        this.state = {
            R: 191,
            G: 64,
            B: 66,
            H: 360,
            S: 0.5,
            L: 0.5,
            HEX: '#BF4042'
        }
    }

    componentDidUpdate() {
        this.props.RGB && this.setRGB(this.props.RGB);
        this.props.HSL && this.setHSL(this.props.HSL);
        this.props.HEX && this.setHEX(this.props.HEX);

    }

    setRGB(value) {
        if (Array.isArray(value)) {
            if (value.length !== 3)
                return console.error(`Invalid argument: Array 'RGB' must contains 3 numbers, check reactcolorpicker.`);
            setRGBByArray(value);
        } else if (typeof value === 'string') {
            value = value.split(',');
            if (value.length !== 3)
                return console.error(`Invalid argument: String 'RGB' can not parse into 3 numbers, check reactcolorpicker.`);
            setRGBByArray(value);
        }

        function setRGBByArray(value) {
            for (let each of value)
                if (!parseInt(each))
                    return console.error(`Invalid argument: Argument 'RGB' must contains numbers, check reactcolorpicker.`);
            const [R, G, B] = [parseInt(value[0]), parseInt(value[1]), parseInt(value[2])];
            if ([R, G, B].toString() === [this.state.R, this.state.G, this.state,B].toString()) return;
            const [H, S, L] = [RGB2HSL(R, G, B).H, RGB2HSL(R, G, B).S, RGB2HSL(R, G, B).L];
            const HEX = RGB2HEX(R, G, B);
            this.setState((prevState, props) => ({
                R: R, G: G, B: B, H: H, S: S, L: L, HEX: HEX
            }))
        }
    }

    setHSL(value) {
        if (Array.isArray(value)) {
            if (value.length !== 3)
                return console.error(`Invalid argument: Array 'HSL' must contain 3 numbers, check reactcolorpicker.`);
            setRGBByArray(value);
        } else if (typeof value === 'string') {
            value = value.split(',');
            if (value.length !== 3)
                return console.error(`Invalid argument: String 'HSL' can not parse into 3 numbers, check reactcolorpicker.`);
            setHSLByArray(value);
        }

        function setHSLByArray(value) {
            for (let i=0; i<value.length; i++) {
                let each = i === 0 ? parseInt(value[i]) :
                    parseFloat(value[i]);
                if (!each)
                    return console.error(`Invalid argument: Argument 'HSL' must contain numbers, check reactcolorpicker.`);
            }
            const [H, S, L] = [parseInt(value[0]), parseFloat(value[1]), parseFloat(value[2])];
            if ([H, S, L].toString() === [this.state.H, this.state.S, this.state,L].toString()) return;
            const [R, G, B] = [HSL2RGB(H, S, L).R, HSL2RGB(H, S, L).G, HSL2RGB(H, S, L).B];
            const HEX = RGB2HEX(R, G, B);
            this.setState((prevState, props) => ({
                R: R, G: G, B: B, H: H, S: S, L: L, HEX: HEX
            }))
        }
    }

    setHEX(value) {
        if (typeof value !== 'string')
            return console.error(`Invalid argument: Argument 'HEX' must be a string, check reactcolorpicker.`);
        if (value.length !== 4 && value.length !== 7)
            console.error(`Arguments is invalid; Check function 'HEX2RGB'`);
        if (value === this.state.HEX) return;
        const {R, G, B} = HEX2RGB(value);
        const {H, S, L} = RGB2HSL(R, G, B);
        this.setState((prevState, porps) => ({
            R: R, G: G, B: B, H: H, S: S, L: L, HEX: value
        }))
    }

    // Passing an value and this value's type to set value
    setValue(type, value) {
        switch (type) {
            case 'R': {
                const {H, S, L} = RGB2HSL(value, this.state.G, this.state.B);
                this.props.getValue && this.props.getValue(Object.assign({}, this.state, {
                    R: value, G: this.state.G, B: this.state.B,
                    H: H, S: S, L: L,
                    HEX: RGB2HEX(value, this.state.G, this.state.B)
                }));
                this.setState((prevState, props) => ({
                    R: value, H: H, S: S, L: L,
                    HEX: RGB2HEX(value, this.state.G, this.state.B)
                }));
                break;
            }
            case 'G': {
                const {H, S, L} = RGB2HSL(this.state.R, value, this.state.B);
                this.props.getValue && this.props.getValue(Object.assign({}, this.state, {
                    R: this.state.R, G: value, B: this.state.B,
                    H: H, S: S, L: L,
                    HEX: RGB2HEX(this.state.R, value, this.state.B)
                }));
                this.setState((prevState, props) => ({
                    G: value, H: H, S: S, L: L,
                    HEX: RGB2HEX(this.state.R, value, this.state.B)
                }));
                break;
            }
            case 'B': {
                const {H, S, L} = RGB2HSL(this.state.R, this.state.G, value);
                this.props.getValue && this.props.getValue(Object.assign({}, this.state, {
                    R: this.state.R, G: this.state.G, B: value,
                    H: H, S: S, L: L,
                    HEX: RGB2HEX(this.state.R, this.state.G, value)
                }));
                this.setState((prevState, props) => ({
                    B: value, H: H, S: S, L: L,
                    HEX: RGB2HEX(this.state.R, this.state.G, value)
                }));
                break;
            }
            case 'H': {
                const {R, G, B} = HSL2RGB(value, this.state.S, this.state.L);
                this.props.getValue && this.props.getValue(Object.assign({}, this.state, {
                    R: R, G: G, B: B,
                    H: value, S: this.state.S, L: this.state.L,
                    HEX: RGB2HEX(R, G, B)
                }));
                this.setState((prevState, props) => ({
                    H: value, R: R, G: G, B: B,
                    HEX: RGB2HEX(R, G, B)
                }));
                break;
            }
            case 'S': {
                const {R, G, B} = HSL2RGB(this.state.H, value, this.state.L);
                this.props.getValue && this.props.getValue(Object.assign({}, this.state, {
                    R: R, G: G, B: B,
                    H: this.state.H, S: value, L: this.state.L,
                    HEX: RGB2HEX(R, G, B)
                }));
                this.setState((prevState, props) => ({
                    S: value, R: R, G: G, B: B,
                    HEX: RGB2HEX(R, G, B)
                }));
                break;
            }
            case 'L': {
                const {R, G, B} = HSL2RGB(this.state.H, this.state.S, value);
                this.props.getValue && this.props.getValue(Object.assign({}, this.state, {
                    R: R, G: G, B: B,
                    H: this.state.H, S: this.state.S, L: value,
                    HEX: RGB2HEX(R, G, B)
                }));
                this.setState((prevState, props) => ({
                    L: value, R: R, G: G, B: B,
                    HEX: RGB2HEX(R, G, B)
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
                width: `${this.props.width || '500px'}`,
                height: `${this.props.width / 2 || '250px'}`,
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
