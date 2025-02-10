import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './redux/store';
import PlayerContextProvider from './context/PlayerContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PlayerContextProvider>
          <App />
        </PlayerContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
