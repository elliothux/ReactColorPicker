// The saturation and lightness values picker component

import React from 'react';
import reactCSS from 'reactcss';


export default class LightnessPicker extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.getStaticValues = this.getStaticValues.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            min: -8,
            max: 0,
            containerOffsetTop: 0,
            containerOffsetLeft: 0,
            containerHeight: 0,
        }
    }

    componentDidMount() {
        this.getStaticValues();
        window.addEventListener('resize', this.getStaticValues);
    }

    // Get some useful values from DOM after render.
    getStaticValues() {
        this.setState((prevState, props) => ({
            max: this.refs.container.offsetHeight - 8,
            containerOffsetTop: this.refs.container.getBoundingClientRect().top,
            containerOffsetLeft: this.refs.container.getBoundingClientRect().left,
            containerHeight: this.refs.container.offsetHeight,
        }))
    }

    // Start monitoring the mousemove event of container after mousedown event.
    handleMouseDown(e) {
        this.refs.container.addEventListener('mousemove', this.handleMouseMove);
    }

    // Stop monitoring the mousemove event of container after mouseup event
    handleMouseUp() {
        this.refs.container.removeEventListener('mousemove', this.handleMouseMove);
    }

    // Move mouse to set value
    handleMouseMove(event) {
        let s = (event.clientX - this.state.containerOffsetLeft) / this.state.containerHeight;
        let l = 1 - (event.clientY - this.state.containerOffsetTop) / this.state.containerHeight;
        s = Math.round(s * 100) / 100;
        l = Math.round(l * 100) / 100;
        this.props.setS(
            s >= 0 && s <=1 ? s : (s > 1 ? 1 : 0)
        );
        this.props.setL(
            l >= 0 && l <=1 ? l : (l > 1 ? 1 : 0)
        )
    }

    // Click to set value
    handleClick(event) {
        this.refs.picker.style.transition = 'all ease-out 300ms';
        setTimeout(function () {
            this.refs.picker.style.transition = '';
        }.bind(this), 300);
        let s = (event.clientX - this.state.containerOffsetLeft) / this.state.containerHeight;
        let l = 1 - (event.clientY - this.state.containerOffsetTop) / this.state.containerHeight;
        s = Math.round(s * 100) / 100;
        l = Math.round(l * 100) / 100;
        this.props.setS(
            s >= 0 && s <=1 ? s : (s > 1 ? 1 : 0)
        );
        this.props.setL(
            l >= 0 && l <=1 ? l : (l > 1 ? 1 : 0)
        )
    }

    render() {return(
        <div
            ref="container"
            style={this.style().container}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onClick={this.handleClick}
        >
            <div
                ref="picker"
                style={this.style().picker}
            />
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '50%',
                height: '100%',
                backgroundImage: `linear-gradient(to right bottom, 
                    ${`hsl(${this.props.H}, 0%, 100%), hsl(${this.props.H}, 50%, 50%), hsl(${this.props.H}, 100%, 0%)`})`,
                cursor: 'pointer',
            },
            picker: {
                width: '16px',
                height: '16px',
                borderRadius: '100%',
                boxShadow: ' 0 0 0 3px white',
                position: 'relative',
                left: `${function () {
                    // Check the value is invalid or not
                    const left = this.props.S * this.state.containerHeight - 8;
                    if (left > this.state.max)
                        return this.state.max;
                    if (left < this.state.min)
                        return this.state.min;
                    return left;
                }.bind(this)()}px`,
                top: `${function () {
                    // Check the value is invalid or not
                    const top = (1 - this.props.L) * this.state.containerHeight - 8;
                    if (top > this.state.max)
                        return this.state.max;
                    if (top < this.state.min)
                        return this.state.min;
                    return top;
                }.bind(this)()}px`,
            }
        }
    }))}
}