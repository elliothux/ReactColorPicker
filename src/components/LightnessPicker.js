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
        this.state = {
            linearGradient: `hsl(${this.props.H}, 0%, 100%), hsl(${this.props.H}, 50%, 50%), hsl(${this.props.H}, 100%, 0%)`,
            top: -6,
            left: -6,
            min: -6,
            max: 0,
            containerOffsetTop: 0,
            containerHeight: 0,
            containerOffsetLeft: 0,
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

    componentDidMount() {
        this.getStaticValues();
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    getStaticValues() {
        this.setState((prevState, props) => ({
            max: this.refs.container.offsetHeight - 10,
            containerOffsetTop: this.refs.container.getBoundingClientRect().top,
            containerHeight: this.refs.container.offsetHeight,
            containerOffsetLeft: this.refs.container.getBoundingClientRect().left,
        }))
    }

    handleMouseDown(e) {
        this.refs.container.addEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseUp() {
        this.refs.container.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove(event) {
        const top = event.clientY - this.state.containerOffsetTop - 6;
        const left = event.clientX - this.state.containerOffsetLeft - 6;
        this.setState((prevState, props) => ({
            top: top,
            left: left
        }));

    }

    render() {return(
        <div
            ref="container"
            style={this.style().container}
            onMouseDown={this.handleMouseDown}
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
                height: 0,
                paddingBottom: '50%',
                backgroundImage: `linear-gradient(to right bottom, ${this.state.linearGradient})`
            },
            picker: {
                width: '12px',
                height: '12px',
                borderRadius: '100%',
                border: '3px solid black',
                boxShadow: '0 0 0 3px white',
                position: 'relative',
                left: `${function () {
                    if (this.state.left > this.state.max)
                        return this.state.max;
                    if (this.state.left < this.state.min)
                        return this.state.min;
                    return this.state.left;
                }.bind(this)()}px`,
                top: `${function () {
                    if (this.state.top > this.state.max)
                        return this.state.max;
                    if (this.state.top < this.state.min)
                        return this.state.min;
                    return this.state.top;
                }.bind(this)()}px`,
                cursor: 'pointer'
            }
        }
    }))}
}