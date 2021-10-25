import React, { useState } from 'react';
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
    let order = themeColors.length + 1;
    let colorName =
      order === 1
        ? 'Primary'
        : order === 2
        ? 'Secondary'
        : order === 3
        ? 'Tertiary'
        : order === 4
        ? 'Quaternary'
        : order === 5
        ? 'Quinary'
        : order === 6
        ? 'Senary'
        : order === 7
        ? 'Septenary'
        : order === 8
        ? 'Octonary'
        : order === 9
        ? 'Nonary'
        : order === 10
        ? 'Denary'
        : `Color${order}`;
    setThemeColors((oldThemeColors) => [
      ...oldThemeColors,
      {
        id: cid(),
        name: colorName,
        safeName: colorName.toLowerCase(),
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
