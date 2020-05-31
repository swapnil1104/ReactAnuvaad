import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Content from './components/content/Content';
import Language from './models/Language';

const languageArray: Language[] = [
  {
    name: 'Hindi (हिन्दी)',
    code: 'hi'
  }, {
    name: 'Spanish (español)',
    code: 'es'
  }, {
    name: 'Chinese (Zhōngwén)',
    code: 'zh'
  }, {
    name: 'Arabic (اَلْعَرَبِيَّةُ)',
    code: 'ar'
  }, {
    name: 'Russian (русский язык)',
    code: 'ru'
  },
]

function App() {
  return (
    <div className="App">
      <Header />
      <Content languageArray={languageArray} />
    </div>
  );
}

export default App;
