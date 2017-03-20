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

        this.state = {
            top: -10,
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
            top: this.refs.container.offsetHeight - 10,
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
        const top = event.clientY - this.state.containerOffsetTop - 10;
        this.setState((prevState, props) => ({
            top: top
        }));
        this.props.setValue(
            Math.round((top + 10) / this.state.containerHeight * 360)
        )
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
                    if (this.state.top > this.state.max)
                        return this.state.max;
                    if (this.state.top < this.state.min)
                        return this.state.min;
                    return this.state.top;
                }.bind(this)()}px`,
                left: '-20px',
                borderStyle: 'solid',
                borderWidth: '10px 0 10px 15px',
                borderColor: `transparent transparent transparent 
                    hsl(${(this.state.top + 10) / this.state.containerHeight * 360}, 100%, 50%)`
            }
        }
    }))}
}