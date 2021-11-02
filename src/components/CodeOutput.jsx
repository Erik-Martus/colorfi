import CodeHighlight from './CodeHighlight.jsx';
import { useSelector } from 'react-redux';
import { getColors } from '../store/colors';

function CodeOutput() {
  const colors = useSelector(getColors);

  const catName = (name) => name.toLowerCase().replaceAll(' ', '-');

  const cssSyntax = `:root {${Object.values(colors).map((color) => {
    let varDecl = color.shades.enabled
      ? color.shades.colors.map((shade, index) => {
          let shadeDecl = `--${catName(color.name)}-${shade.name}: ${
            shade.hex
          };`;
          return index === 0 ? shadeDecl : `\n  ${shadeDecl}`;
        })
      : `--${catName(color.name)}: ${color.hex};`;
    return `\n  ${varDecl}`;
  })}
}`;

  const scssSyntax = `${Object.values(colors).map((color, index) => {
    let varDecl = color.shades.enabled
      ? color.shades.colors.map((shade, index) => {
          let shadeDecl = `\$${catName(color.name)}-${shade.name}: ${
            shade.hex
          };`;
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
      colors: {${Object.values(colors).map((color) => {
        if (color.shades.enabled) {
          let varDecl = `"${catName(color.name)}": {${color.shades.colors.map(
            (shade) => {
              let shadeDecl = `"${shade.name}": "${shade.hex}"`;
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
