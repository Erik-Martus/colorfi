import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Themes from './Themes.jsx';
import ThemeBuilder from './ThemeBuilder.jsx';
import _ from 'lodash/core';
import colorThemes from '../data/themes.json';

let cid = () => {
  return `color-${Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)}`;
};

function App() {
  const [activeTheme, setActiveTheme] = useState('');
  const [themeColors, setThemeColors] = useState([]);

  const handleThemeChange = (event) => {
    setActiveTheme(event.target.value);
    let newThemeColors = _.find(colorThemes, function (o) {
      return o.name === event.target.value;
    }).colors;
    setThemeColors(...[newThemeColors]);
  };

  const handleThemeColorAdd = () => {
    let hexColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setThemeColors((oldThemeColors) => [
      ...oldThemeColors,
      {
        id: cid(),
        name: hexColor,
        DEFAULT: hexColor,
      },
    ]);
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <Themes
          activeTheme={activeTheme}
          onActiveThemeChange={handleThemeChange}
        />
        <p>The current theme is {activeTheme}</p>
        <ThemeBuilder
          themeColors={themeColors}
          onThemeColorAdd={handleThemeColorAdd}
        />
      </main>
    </div>
  );
}

export default App;
