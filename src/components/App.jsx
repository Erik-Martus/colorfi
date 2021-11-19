import { hot } from 'react-hot-loader/root';
import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header.jsx';
import Intro from './Intro.jsx';
import Footer from './Footer.jsx';
import ThemeBuilder from './ThemeBuilder.jsx';
import CodeOutput from './CodeOutput.jsx';
import { getPast, getColors, getFuture } from '../store/colors.js';

function App() {
  console.log('Past:', useSelector(getPast));
  console.log('Present:', useSelector(getColors));
  console.log('Future:', useSelector(getFuture));
  return (
    <div className="App w-screen relative font-sans bg-gray-100">
      <Header />
      <main className="container">
        <div className="bg-white pt-6 px-4 pb-8 rounded-xl shadow-xl">
          <Intro />
          <ThemeBuilder />
          <CodeOutput />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default hot(App);
