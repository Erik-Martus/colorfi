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

const genHex = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function App() {
  const initTheme = [
    {
      id: cid(),
      name: 'Primary',
      safeName: 'primary',
      DEFAULT: genHex(),
    },
    {
      id: cid(),
      name: 'Secondary',
      safeName: 'secondary',
      DEFAULT: genHex(),
    },
    {
      id: cid(),
      name: 'Tertiary',
      safeName: 'tertiary',
      DEFAULT: genHex(),
    },
    {
      id: cid(),
      name: 'Quaternary',
      safeName: 'quaternary',
      DEFAULT: genHex(),
    },
    {
      id: cid(),
      name: 'Quinary',
      safeName: 'quinary',
      DEFAULT: genHex(),
    },
  ];

  const [activeTheme, setActiveTheme] = useState('');
  const [themeColors, setThemeColors] = useState(initTheme);
  const [colorCount, setColorCount] = useState(5);

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
    let hexColor = genHex();
    let colorName = `Color${colorCount + 1}`;
    setThemeColors((oldThemeColors) => [
      ...oldThemeColors,
      {
        id: cid(),
        name: colorName,
        safeName: colorName.toLowerCase(),
        DEFAULT: hexColor,
      },
    ]);
    setColorCount((currentCount) => currentCount + 1);
  };

  const handleThemeColorRemove = (id) => {
    setThemeColors((oldThemeColors) => {
      return oldThemeColors.filter((color) => color.id !== id);
    });
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
        <ThemeBuilder
          themeColors={themeColors}
          onThemeColorAdd={handleThemeColorAdd}
          onThemeColorRemove={handleThemeColorRemove}
          onThemeColorChange={handleColorChange}
        />
        <CodeOutput themeColors={themeColors} />
      </main>
    </div>
  );
}

export default App;
