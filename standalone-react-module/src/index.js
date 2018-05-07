import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { register, unregister } from './registerServiceWorker';

export function render() {
    return new Promise(function(resolve) {
        resolve('<div id="standalone-react-module"></div>');
    });
}

export function start() {
    return new Promise(function(resolve) {
        ReactDOM.render( <App/>, document.getElementById( 'standalone-react-module' ) );
        register();
        resolve();
    });
}

export function stop() {
    return new Promise(function(resolve) {
        unregister();
        resolve();
    });
}



