import React from 'react';
import reactCSS from 'reactcss';


export default class NumChooser extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this)();
        this.plusValue = this.plusValue.bind(this);
        this.minusValue = this.minusValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.state = {
            timer: null
        }
    }

    plusValue() {
        let value = this.props.value;
        if (!this.props.onlyInteger) {
            value = parseInt(value  * 10e5 * 100) / 10e5 + parseInt(this.props.scale * 100);
            value = value / 100;
        } else
            value += this.props.scale;
        value >= this.props.max && (value = this.props.max);
        this.props.getValue(value);
    }

    minusValue() {
        let value = this.props.value;
        if (!this.props.onlyInteger) {
            value = parseInt(value  * 10e5 * 100) / 10e5 - parseInt(this.props.scale * 100);
            value = value / 100;
        } else
            value -= this.props.scale;
        value <= this.props.min && (value = this.props.min);
        this.props.getValue(value);
    }

    handleChange(e) {
        let value = e.target.value;
        value === '' && (value = '0');
        if (!this.props.onlyInteger) {
            if (value.split('')[value.length-1] !== '.') {
                const integer = value.split('.')[0];
                let decimal = value.split('.').length > 1 ?
                    value.split('.')[1] : null;
                (decimal && decimal.length >= 2) &&
                (decimal = decimal.slice(0, 2));
                value = `${integer}${decimal ? `.${decimal}` : ''}`;
                value = parseFloat(value);
            }
        } else
            value = parseInt(value);

        parseFloat(value) >= this.props.max && (value = this.props.max);
        this.props.getValue(value);
    }

    handleMouseDown(operation) {
        clearInterval(this.state.timer);
        const timer = setInterval(operation === 'plus' ? this.plusValue : this.minusValue, 100);
        this.setState((prevState, props) => ({
            timer: timer
        }))
    }

    handleMouseUp() {
        clearInterval(this.state.timer);
    }

    render() {return(
        <div style={this.style.container}>
            <span style={this.style.text}>{this.props.text}</span>
            <div style={this.style.num}>
                <input
                    value={this.props.value}
                    onChange={this.handleChange}
                    style={this.style.input}
                />
                <div style={this.style.controller}>
                    <div
                        style={this.style.button}
                        onClick={this.plusValue}
                        onMouseDown={this.handleMouseDown.bind(null, 'plus')}
                        onMouseUp={this.handleMouseUp}
                    >
                        <div style={this.style.numUp}/>
                    </div>
                    <div
                        style={this.style.button}
                        onClick={this.minusValue}
                        onMouseDown={this.handleMouseDown.bind(null, 'minus')}
                        onMouseUp={this.handleMouseUp}
                    >
                        <div style={this.style.numDown}/>
                    </div>
                </div>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '100%',
                height: '25%',
                display: 'flex',
                flexDirection: 'row',
                flexFlow: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            text: {
                display: 'inline-block',
            },
            num: {
                width: '80%',
                height: '100%',
                border: '2px gray solid',
                borderRadius: '5px',
                display: 'inline-block',
                overflow: 'hidden'
            },
            input: {
                width: '75%',
                height: '100%',
                outline: 'none',
                border: 'none',
                marginLeft: '5%',
                float: 'left',
                fontSize: '1.2em'
            },
            controller: {
                width: '15%',
                height: '100%',
                display: 'inline-block',
                float: 'right',
                borderLeft: '1px solid gray',
            },
            button: {
                width: '100%',
                height: '50%',
                outline: 'none',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden'
            },
            numUp: {
                width: 0,
                height: 0,
                borderBottom: '7px solid gray',
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                margin: '25% 0 0 calc(25% - 1px)',
            },
            numDown: {
                width: 0,
                height: 0,
                borderTop: '7px solid gray',
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                margin: 'calc(25% - 3px) 0 0 calc(25% - 1px)',
            }
        }
    }))}
}