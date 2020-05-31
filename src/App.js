import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header.tsx';
import Content from './components/content/Content';

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
