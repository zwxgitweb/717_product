import React, { Fragment } from 'react';
import { render } from 'react-dom';
import Toast from 'react-toast-mobile';
import 'react-toast-mobile/lib/react-toast-mobile.css';

import App from './index.jsx';
// console.log(process.env);
const container = document.querySelector('#container');

render(<Fragment><App /><Toast /></Fragment>, container);