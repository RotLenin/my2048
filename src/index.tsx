/** API React v 18 > */
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if(!container){
  throw new Error('Can\'t find root !');
}

const root = ReactDOMClient.createRoot(container);
root.render(<App />);

/* Старое Api
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
*/
