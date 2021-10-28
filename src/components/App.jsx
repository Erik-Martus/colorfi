import React, { useState } from 'react';
import chroma from 'chroma-js';
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

const genHex = () => chroma.random().hex().toUpperCase();

function App() {
  const initTheme = (size = 5) => {
    let theme = Array(size);
    for (let i = 0; i < size; i++) {
      const name =
        i === 0
          ? 'Primary'
          : i === 1
          ? 'Secondary'
          : i === 2
          ? 'Tertiary'
          : i === 3
          ? 'Quaternary'
          : i === 4
          ? 'Quinary'
          : `Color${i++}`;
      theme[i] = {
        id: cid(),
        name: name,
        hex: genHex(),
        enableShades: false,
        shades: [],
      };
    }
    return theme;
  };

  const [activeTheme, setActiveTheme] = useState('');
  const [themeColors, setThemeColors] = useState(initTheme());
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
        hex: hexColor,
        enableShades: false,
        shades: [],
      },
    ]);
    setColorCount((currentCount) => currentCount + 1);
  };

  const handleThemeColorRemove = (id) => {
    setThemeColors((oldThemeColors) => {
      return oldThemeColors.filter((color) => color.id !== id);
    });
  };

  const handleColorChange = (colorData) => {
    let updatedColor = colorData;
    let colorIndex = findThemeColor('id', colorData.id);
    setTimeout(
      setThemeColors((oldThemeColors) => {
        let newThemeColors = oldThemeColors.map((color, index) => {
          if (index === colorIndex) {
            return updatedColor;
          } else {
            return color;
          }
        });
        return newThemeColors;
      }),
      200
    );
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
