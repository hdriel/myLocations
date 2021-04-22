import React from 'react';
import './App.css';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store'
import { BrowserRouter as Router } from "react-router-dom";
import Routes from '../screens';

const App = props => {
  return (
      <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div className="App">
              <div className='screen'>
                <div className='space-screen-side'/>
                <div className='screen-content'> <Routes /> </div>
                <div className='space-screen-side'/>
              </div>
            </div>
          </PersistGate>
        </Provider>
      </Router>
  );
}

export default App;
