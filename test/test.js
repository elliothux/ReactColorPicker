import React from 'react';
import { render } from 'react-dom';
import Picker from '../src/components/App';


render(
    <Picker getValue={setValue}/>,
    document.querySelector('#root')
);

function setValue(value) {
    console.log(value);
}
