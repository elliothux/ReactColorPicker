// The number input box component

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

    // Plus the value
    plusValue() {
        let value = this.props.value;
        // If only integers are allowed here
        if (!this.props.onlyInteger)
            // Change and format the value
            value = (parseInt(value  * 10e5 * 100) / 10e5 +
                parseInt(this.props.scale * 100)) / 100;
        else
            value += this.props.scale;
        value >= this.props.max && (value = this.props.max);
        this.props.getValue(value);
    }

    // Minus the value
    minusValue() {
        let value = this.props.value;
        // If only integers are allowed here
        if (!this.props.onlyInteger)
            // Change and format the value
            value = (parseInt(value  * 10e5 * 100) / 10e5 -
                parseInt(this.props.scale * 100)) / 100;
        else
            value -= this.props.scale;
        // Check the value is invalid or not
        value <= this.props.min && (value = this.props.min);
        this.props.getValue(value);
    }

    // Handle change after user inputting something in the input box
    handleChange(e) {
        let value = e.target.value;
        // Avoid the situation of 'NaN' value
        value === '' && (value = '0');
        // If only integers are allowed here
        if (!this.props.onlyInteger) {
            // And if user's input is not point
            // then format the number
            if (value.split('')[value.length-1] !== '.') {
                // Divided the value into integer and decimal
                // and process them respectively
                const integer = value.split('.')[0];
                let decimal = value.split('.').length > 1 ?
                    value.split('.')[1] : null;
                // The decimal part does not exceed two digits
                (decimal && decimal.length >= 2) &&
                    (decimal = decimal.slice(0, 2));
                value = `${integer}${decimal ? `.${decimal}` : ''}`;
                value = parseFloat(value);
            }
        } else
            value = parseInt(value);

        // Check the value is invalid or not
        parseFloat(value) >= this.props.max && (value = this.props.max);
        this.props.getValue(value);
    }

    // After mousedown event of the controller button
    // plus or minus the value every 100ms
    handleMouseDown(operation) {
        clearInterval(this.state.timer);
        const timer = setInterval(operation === 'plus' ? this.plusValue : this.minusValue, 100);
        this.setState((prevState, props) => ({
            timer: timer
        }))
    }

    // After mouseup event of the controller button
    // stop the operation
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