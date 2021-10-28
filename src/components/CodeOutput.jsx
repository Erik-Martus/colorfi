import React, { useState, useEffect } from 'react';
import CodeHighlight from './CodeHighlight.jsx';

function CodeOutput({ themeColors }) {
  const [colors, setColors] = useState(themeColors);

  useEffect(() => {
    setColors(themeColors);
  }, [themeColors]);

  const catName = (name) => name.toLowerCase().replaceAll(' ', '-');

  const cssSyntax = `:root {${colors.map((color) => {
    let varDecl = color.enableShade
      ? color.shades.map((shade, index) => {
          let shadeDecl = `--${catName(color.name)}-${shade.id}: ${shade.hex};`;
          return index === 0 ? shadeDecl : `\n  ${shadeDecl}`;
        })
      : `--${catName(color.name)}: ${color.hex};`;
    return `\n  ${varDecl}`;
  })}
}`;

  const scssSyntax = `${colors.map((color, index) => {
    let varDecl = color.enableShade
      ? color.shades.map((shade, index) => {
          let shadeDecl = `\$${catName(color.name)}-${shade.id}: ${shade.hex};`;
          return index === 0 ? shadeDecl : `\n${shadeDecl}`;
        })
      : `\$${catName(color.name)}: ${color.hex};`;
    return index === 0 ? varDecl : `\n${varDecl}`;
  })}`;

  const sassSyntax = scssSyntax.replaceAll(';', '');

  const lessSyntax = scssSyntax.replaceAll('$', '@');

  const tailwindSyntax = `module.exports = {
  theme: {
    extend: {
      colors: {${colors.map((color) => {
        if (color.enableShade) {
          console.log('shadeEnabled');
          let varDecl = `"${catName(color.name)}": {${color.shades.map(
            (shade) => {
              let shadeDecl = `"${shade.id}": "${shade.hex}"`;
              return `\n          ${shadeDecl}`;
            }
          )}
        }`;
          return `\n        ${varDecl}`;
        } else {
          let varDecl = `"${catName(color.name)}": "${color.hex}"`;
          return `\n        ${varDecl}`;
        }
      })}
      }
    }
  }
}`;

  return (
    <>
      <CodeHighlight language="css">
        {cssSyntax.replaceAll(',', '')}
      </CodeHighlight>
      <CodeHighlight language="scss">
        {scssSyntax.replaceAll(',', '')}
      </CodeHighlight>
      <CodeHighlight language="sass">
        {sassSyntax.replaceAll(',', '')}
      </CodeHighlight>
      <CodeHighlight language="less">
        {lessSyntax.replaceAll(',', '')}
      </CodeHighlight>
      <CodeHighlight language="javascript">{tailwindSyntax}</CodeHighlight>
    </>
  );
}

export default CodeOutput;
