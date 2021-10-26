import React, { useState, useEffect } from 'react';
import CodeHighlight from './CodeHighlight.jsx';

function CodeOutput({ themeColors }) {
  const [colors, setColors] = useState(themeColors);

  useEffect(() => {
    setColors(themeColors);
  }, [themeColors]);

  const cssSyntax = `:root {${colors.map((color) => {
    let varDecl = `--${color.safeName}: ${color.hex};`;
    return `\n  ${varDecl}`;
  })}
}`;

  const scssSyntax = `${colors.map((color, index) => {
    let varDecl = `\$${color.safeName}: ${color.hex};`;
    return index === 0 ? varDecl : `\n${varDecl}`;
  })}`;

  const sassSyntax = scssSyntax.replaceAll(';', '');

  const lessSyntax = scssSyntax.replaceAll('$', '@');

  const tailwindSyntax = `module.exports = {
  theme: {
    extend: {
      colors: {${colors.map((color) => {
        let varDecl = `"${color.safeName}": "${color.hex}"`;
        return `\n        ${varDecl}`;
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
