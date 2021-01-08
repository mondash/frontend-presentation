import React from 'react';
import CounterDisplay from './CounterDisplay';
import CounterButtons from './CounterButtons';
import './App.css';

function App() {
  return (
    <div className="App">
      <CounterDisplay />
      <CounterButtons />
    </div>
  );
}

export default App;
