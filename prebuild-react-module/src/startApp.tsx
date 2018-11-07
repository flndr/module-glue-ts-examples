import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

export function startApp( element : HTMLElement ) {
    ReactDOM.render( <App />, element );
    registerServiceWorker();
}