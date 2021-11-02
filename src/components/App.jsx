import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import chroma from 'chroma-js';
import Header from './Header.jsx';
import Intro from './Intro';
import Footer from './Footer.jsx';
import ThemeBuilder from './ThemeBuilder.jsx';
import CodeOutput from './CodeOutput.jsx';

const cid = () => {
  return `color-${Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)}`;
};

const genHex = () => chroma.random().hex().toUpperCase();

function App() {
  const colors = useSelector((state) => state.theme.colors);

  const setColors = () => {};

  const [colorCount, setColorCount] = useState(5);

  const findColor = (key, value) => {
    let index = colors.findIndex((obj) => obj[key] === value);
    return index;
  };

  const handleColorAdd = () => {
    let hexColor = genHex();
    let colorName = `Color${colorCount + 1}`;
    setColors((oldColors) => [
      ...oldColors,
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

  const handleColorRemove = (id) => {
    setColors((oldColors) => {
      return oldColors.filter((color) => color.id !== id);
    });
  };

  const handleColorChange = (colorData) => {
    let updatedColor = colorData;
    // let colorIndex = findColor('id', colorData.id);
    setTimeout(
      setColors((oldColors) => {
        let newColors = oldColors.map((color, index) => {
          if (index === colorIndex) {
            return updatedColor;
          } else {
            return color;
          }
        });
        return newColors;
      }),
      200
    );
  };

  return (
    <div className="App relative font-sans bg-gray-100">
      <Header />
      <main className="container bg-white pt-6 px-4 pb-8 rounded-xl border-2 border-gray-900">
        <Intro />
        <ThemeBuilder
          themeColors={colors}
          onThemeColorAdd={handleColorAdd}
          onThemeColorRemove={handleColorRemove}
          onThemeColorChange={handleColorChange}
        />
        <CodeOutput themeColors={colors} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
