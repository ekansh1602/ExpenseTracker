import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from './Context/Context';
import { SpeechProvider } from '@speechly/react-client';


ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId="b1a93141-5f98-4adc-b0c9-80e586485b54" language="en-US" >
    <Provider>
      <App />
    </Provider>
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);