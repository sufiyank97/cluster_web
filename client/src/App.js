import React from 'react';
import './App.css';
import './bootstrap.css'

import Home from './Components/Home'

function App() {
  return (
    <div className="App">
      <Home />
    </div >
  );
}

export default App;
// "dev": "concurrently \"json-serever -p 4000 --watch --no-cors data.json\" \"npm start\""