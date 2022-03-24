import React from 'react';
import {SignUpFormComponent} from './components/forms';
import './App.css';

function App() {
  return (
    <SignUpFormComponent onSubmit={(values) => console.log(values)} />
  );
}

export default App;
