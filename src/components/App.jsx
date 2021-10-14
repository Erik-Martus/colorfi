import React, { useState } from 'react';
import Header from './Header.jsx';
import Themes from './Themes.jsx';
import ThemeBuilder from './ThemeBuilder.jsx';
import _ from 'lodash/core';
import colorThemes from '../data/themes.json';

function App() {
  const [activeTheme, setActiveTheme] = useState('');
  const [themeColors, setThemeColors] = useState([]);
  const handleThemeColorAdd = () => {
    let hexColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setThemeColors((oldThemeColors) => [
      ...oldThemeColors,
      {
        name: hexColor,
        hex: hexColor,
      },
    ]);
  };
  const handleThemeColorChange = (event) => {
    let colorIndex = parseInt(event.target.id.slice(6), 10);
    setThemeColors((oldThemeColors) => {
      const newThemeColors = [...oldThemeColors];
      newThemeColors[colorIndex].name = event.target.value;
      return newThemeColors;
    });
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <Themes
          activeTheme={activeTheme}
          onActiveThemeChange={(event) => {
            setActiveTheme(event.target.value);
            setThemeColors(
              ...[
                _.find(colorThemes, function (o) {
                  return o.name === event.target.value;
                }).colors,
              ]
            );
          }}
        />
        <p>The current theme is {activeTheme}</p>
        <ThemeBuilder
          themeColors={themeColors}
          onThemeColorsAdd={handleThemeColorAdd}
          onThemeColorsChange={handleThemeColorChange}
        />
      </main>
    </div>
  );
}

export default App;
