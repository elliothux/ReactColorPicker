# reactColorPicker
## A light and simple color picker for react.

## Installation
`npm install reactColorPicker --save`
or
`yarn add reactColorPicker`

## Usage
```js
import React from 'react';
import Picker from 'reactColorPicker';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.setColor = this.setColor.bind(this);
        this.state = {
            RGB: [0, 0, 0],
            HSL: [360, 1, 0],
            HEX: '#000'
        }
    }
    
    // Execute this method every time a color is picked
    setColor(color) {
        this.setState({
            RGB: [color.R, color.G, color.B],
            HSL: [color.H, color.S, color.L],
            HEX: color.HEX
        });
        console.log('Color updated!')
    }
    
    render() {return(
        <div>
            <h2 style={{color: this.state.HEX}}>
                Please pick your color:
            </h2>
            <Picker/>
        </div>
    )}
}
```
