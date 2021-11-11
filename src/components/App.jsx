import React from 'react';
import Header from './Header.jsx';
import Intro from './Intro';
import Footer from './Footer.jsx';
import ThemeBuilder from './ThemeBuilder.jsx';
import CodeOutput from './CodeOutput.jsx';

function App() {
  console.log('Rendered app');
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

export default App;
