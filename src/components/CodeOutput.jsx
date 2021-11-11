import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getColors } from '../store/colors';
import CodeHighlight from './CodeHighlight.jsx';
import Button from './Button';

function CodeOutput() {
  const colors = useSelector(getColors);

  const [prefLang, setPrefLang] = useState(
    window.localStorage.getItem('prefLang') || ''
  );
  useEffect(() => {
    window.localStorage.setItem('prefLang', prefLang);
  }, [prefLang]);

  const [prefCase, setPrefCase] = useState(
    window.localStorage.getItem('prefCase') || ''
  );
  useEffect(() => {
    window.localStorage.setItem('prefCase', prefCase);
  }, [prefCase]);

  const escName = (name, textCase) => {
    switch (textCase) {
      case 'snake':
        return name.toLowerCase().replaceAll(' ', '-');
      default:
        return name;
    }
  };

  const styleVars = (lang) => {
    let pre, suf;
    switch (lang) {
      case 'css':
        pre = '--';
        suf = ';';
        break;
      case 'sass':
        pre = '$';
        suf = '';
        break;
      case 'scss':
        pre = '$';
        suf = ';';
        break;
      case 'less':
        pre = '@';
        suf = ';';
        break;
      default:
        console.error(`Unknown language for styleVars(). Provided ${lang}.`);
        break;
    }
    let syntax = '';

    Object.values(colors).forEach((color, index) => {
      let name = escName(color.name, 'snake');
      if (color.shades) {
        let shadeDecl = '';
        color.shades.forEach((shade, index) => {
          let decl = `${pre}${name}-${shade.name}: ${shade.hex}${suf}`;
          index > 0 ? (shadeDecl += `\n${decl}`) : (shadeDecl += decl);
        });
        index > 0 ? (syntax += `\n${shadeDecl}`) : (syntax += shadeDecl);
      } else {
        let decl = `${pre}${name}: ${color.hex}${suf}`;
        index > 0 ? (syntax += `\n${decl}`) : (syntax += decl);
      }
    });
    return `${syntax}`;
  };

  const cssVars = styleVars('css');
  const cssSyntax = `:root {\n${cssVars.replaceAll('--', '  --')}\n}`;

  const scssSyntax = styleVars('scss');

  const sassSyntax = styleVars('sass');

  const lessSyntax = styleVars('less');

  const tailwindVars = () => {
    let syntax = {};
    Object.values(colors).forEach((color) => {
      let name = escName(color.name, 'snake');
      if (color.shades) {
        let shades = {};
        color.shades.forEach((shade) => {
          shades[shade.name] = shade.hex;
        });
        syntax[name] = shades;
      } else {
        syntax[name] = color.hex;
      }
    });
    return syntax;
  };
  const tailwindSyntax = `module.exports = ${JSON.stringify(
    {
      theme: {
        extend: {
          colors: tailwindVars(),
        },
      },
    },
    null,
    2
  )
    .replace('"theme"', 'theme')
    .replace('"extend"', 'extend')
    .replace('"colors"', 'colors')}`;

  return (
    <section className="p-2 bg-gray-700 rounded-xl">
      <article id="tab-css">
        <CodeHighlight language="css">{cssSyntax}</CodeHighlight>
        <div className="flex justify-center gap-4">
          <Button
            type="secondary"
            onClick={() => navigator.clipboard.writeText(cssSyntax)}
          >
            Copy Everything
          </Button>
          <Button
            type="secondary"
            onClick={() => navigator.clipboard.writeText(cssVars)}
          >
            Copy Vars Only
          </Button>
        </div>
      </article>
      <article id="tab-scss">
        <CodeHighlight language="scss">{scssSyntax}</CodeHighlight>
        <div className="flex justify-center gap-4">
          <Button
            type="secondary"
            onClick={() => navigator.clipboard.writeText(scssSyntax)}
          >
            Copy
          </Button>
        </div>
      </article>
      <article id="tab-sass">
        <CodeHighlight language="sass">{sassSyntax}</CodeHighlight>
        <div className="flex justify-center gap-4">
          <Button
            type="secondary"
            onClick={() => navigator.clipboard.writeText(sassSyntax)}
          >
            Copy
          </Button>
        </div>
      </article>
      <article id="tab-less">
        <CodeHighlight language="less">{lessSyntax}</CodeHighlight>
        <div className="flex justify-center gap-4">
          <Button
            type="secondary"
            onClick={() => navigator.clipboard.writeText(lessSyntax)}
          >
            Copy
          </Button>
        </div>
      </article>
      <article id="tab-tailwind">
        <CodeHighlight language="javascript">{tailwindSyntax}</CodeHighlight>
        <div className="flex justify-center gap-4">
          <Button
            type="secondary"
            onClick={() => navigator.clipboard.writeText(tailwindSyntax)}
          >
            Copy Everything
          </Button>
          <Button
            type="secondary"
            onClick={() =>
              navigator.clipboard.writeText(
                JSON.stringify(tailwindVars(), null, 2)
              )
            }
          >
            Copy Vars Only
          </Button>
        </div>
      </article>
    </section>
  );
}

export default CodeOutput;
