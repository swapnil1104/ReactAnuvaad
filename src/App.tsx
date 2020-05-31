import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import ContentComponent from './components/content/ContentComponent';
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
      <a className="github-fork-ribbon" href="http://github.com/swapnil1104/ReactAnuvaad" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
      <Header />
      <ContentComponent languageArray={languageArray} />
    </div>
  );
}

export default App;
