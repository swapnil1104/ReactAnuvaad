import React from 'react';
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
  }, {
    name: 'German (Deutsch)',
    code: 'de'
  }, {
    name: 'Portugese (português)',
    code: 'pt'
  }
]

function App(): JSX.Element {
  const adId = process.env.ADSENSE_PUD_ID;
  return (
    <div className="App">
      <script data-ad-client={adId} async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <a className="github-fork-ribbon" href="http://github.com/swapnil1104/ReactAnuvaad" data-ribbon="Star on GitHub" title="Star on GitHub">Star on GitHub</a>
      <Header />
      <ContentComponent languageArray={languageArray} />
    </div>
  );
}

export default App;
