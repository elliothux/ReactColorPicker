import React from 'react';
import reactCSS from 'reactcss';
import { debounce } from '../lib/colorLib';


export default class HuePicker extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.getStaticValues = this.getStaticValues.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            min: -10,
            max: 0,
            containerOffsetTop: 0,
            containerHeight: 0
        }
    }

    componentDidMount() {
        this.getStaticValues();
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    getStaticValues() {
        this.setState((prevState, props) => ({
            max: this.refs.container.offsetHeight - 10,
            containerOffsetTop: this.refs.container.getBoundingClientRect().top,
            containerHeight: this.refs.container.offsetHeight
        }))
    }

    handleMouseDown(e) {
        this.refs.container.addEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseUp() {
        this.refs.container.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove(event) {
        this.props.setValue(
            Math.round((event.clientY - this.state.containerOffsetTop) / this.state.containerHeight * 360)
        )
    }

    handleClick(event) {
        this.refs.picker.style.transition = 'all ease-out 300ms';
        setTimeout(function () {
            this.refs.picker.style.transition = '';
        }.bind(this), 300);
        this.props.setValue(
            Math.round((event.clientY - this.state.containerOffsetTop) / this.state.containerHeight * 360)
        )
    }


    render() {return(
        <div
            ref="container"
            style={this.style().container}
            onMouseDown={this.handleMouseDown}
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
                cursor: 'pointer',
                width: '5%',
                height: '100%',
                backgroundImage: `linear-gradient(to bottom, ${function () {
                    const a = [];
                    for (let i=0; i<=360; i+=5) {a.push(`hsl(${i}, 100%, 50%)`)}
                    return a.join(',')
                }()})`,
            },
            picker: {
                position: 'relative',
                top: `${function () {
                    const top = this.props.H / 360 * this.state.containerHeight - 10;
                    if (top > this.state.max)
                        return this.state.max;
                    if (top < this.state.min)
                        return this.state.min;
                    return top;
                }.bind(this)()}px`,
                left: '-20px',
                borderStyle: 'solid',
                borderWidth: '10px 0 10px 15px',
                borderColor: `transparent transparent transparent 
                    hsl(${this.props.H}, 100%, 50%)`
            }
        }
    }))}
}