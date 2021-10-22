import React, { useState, useEffect } from 'react';
import colorThemes from '../data/themes.json';
import Header from './Header.jsx';
import Themes from './Themes.jsx';
import ThemeBuilder from './ThemeBuilder.jsx';
import CodeOutput from './CodeOutput.jsx';

const cid = () => {
  return `color-${Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)}`;
};

function App() {
  const [activeTheme, setActiveTheme] = useState('');
  const [themeColors, setThemeColors] = useState([]);

  const findThemeColor = (key, value) => {
    let index = themeColors.findIndex((obj) => obj[key] === value);
    return index;
  };

  const handleThemeChange = (event) => {
    setActiveTheme(event.target.value);
    let themeIndex = colorThemes.findIndex(
      (obj) => obj.name === event.target.value
    );
    let newThemeColors = colorThemes[themeIndex].colors;
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

  const handleColorChange = (event) => {
    let updatedColor = event;
    let colorIndex = findThemeColor('id', event.id);
    setThemeColors((oldThemeColors) => {
      let newThemeColors = oldThemeColors.map((color, index) => {
        if (index === colorIndex) {
          return updatedColor;
        } else {
          return color;
        }
      });
      return newThemeColors;
    });
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
          onThemeColorChange={handleColorChange}
        />
        <CodeOutput themeColors={themeColors} />
      </main>
    </div>
  );
}

export default App;
