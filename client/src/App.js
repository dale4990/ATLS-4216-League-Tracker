import React from 'react';
import './styles/App.css';
import {BrowserRouter} from 'react-router-dom';
import LOLGGRouter from './LOLGGRouter.js';

function App() {
  return(
    <BrowserRouter basename={'/'}>
      <LOLGGRouter />
    </BrowserRouter>
  );
}

export default App;