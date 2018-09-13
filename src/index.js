import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import getDirectory from "./API"

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

getDirectory().then(directory => {
    console.log(directory)
})