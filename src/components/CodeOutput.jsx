import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getColors } from '../store/colors';
import CodeHighlight from './CodeHighlight.jsx';
import Button from './Button';
import InputRadioGroup from './InputRadioGroup';

function CodeOutput() {
  const colors = useSelector(getColors);

  const langs = ['CSS', 'SCSS', 'SASS', 'LESS', 'Tailwind'];
  const cases = ['Snake', 'Camel'];

  const [prefLang, setPrefLang] = useState(
    window.localStorage.getItem('prefLang') || 'CSS'
  );
  useEffect(() => {
    window.localStorage.setItem('prefLang', prefLang);
  }, [prefLang]);
  const onLangChange = (e) => setPrefLang(e.target.value);

  const [prefCase, setPrefCase] = useState(
    window.localStorage.getItem('prefCase') || 'Snake'
  );
  useEffect(() => {
    window.localStorage.setItem('prefCase', prefCase);
  }, [prefCase]);
  const onCaseChange = (e) => setPrefCase(e.target.value);

  const escName = (name) => {
    switch (prefCase) {
      case 'Snake':
        return name.replaceAll(' ', '-');
      case 'Camel':
        return name.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
          if (+match === 0) return '';
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
      default:
        return name;
    }
  };

  const syntax = (lang) => {
    if (lang === 'Tailwind') {
      let vars = {};

      Object.values(colors).forEach((color) => {
        let name = escName(color.name);
        if (color.shades) {
          let shades = {};
          color.shades.forEach((shade) => {
            shades[shade.name] = shade.hex;
          });
          vars[name] = shades;
        } else {
          vars[name] = color.hex;
        }
      });

      let code = `module.exports = ${JSON.stringify(
        {
          theme: {
            extend: {
              colors: vars,
            },
          },
        },
        null,
        2
      )
        .replace('"theme"', 'theme')
        .replace('"extend"', 'extend')
        .replace('"colors"', 'colors')}`;

      return { vars, code };
    } else {
      let vars = '',
        code = '',
        prefix = '',
        suffix = '';

      switch (lang) {
        case 'CSS':
          prefix = '--';
          suffix = ';';
          break;
        case 'SASS':
          prefix = '$';
          break;
        case 'SCSS':
          prefix = '$';
          suffix = ';';
          break;
        case 'LESS':
          prefix = '@';
          suffix = ';';
        default:
          break;
      }

      Object.values(colors).forEach((color, colorIndex) => {
        let name = escName(color.name);
        if (color.shades) {
          color.shades.forEach((shade, shadeIndex) => {
            let decl = `${prefix}${name}-${shade.name}: ${shade.hex}${suffix}`;
            colorIndex === 0 && shadeIndex === 0
              ? (vars += decl)
              : (vars += `\n${decl}`);
          });
        } else {
          let decl = `${prefix}${name}: ${color.hex}${suffix}`;
          colorIndex === 0 ? (vars += decl) : (vars += `\n${decl}`);
        }
      });

      if (lang === 'CSS') {
        code = `:root {\n${vars.replaceAll(prefix, '  ' + prefix)}\n}`;
      } else {
        code = vars;
        vars = false;
      }
      return { vars, code };
    }
  };

  const { vars, code } = syntax(prefLang);

  return (
    <section className="max-w-screen-md mx-auto p-4 bg-gray-700 rounded-xl">
      <h2 className="text-white">Get Your Code</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="h-full p-4 bg-white rounded-xl">
          <InputRadioGroup
            name="lang"
            label="Output Language"
            options={langs}
            active={prefLang}
            onChange={onLangChange}
          />
          <InputRadioGroup
            name="textCase"
            label="Variable Case"
            options={cases}
            active={prefCase}
            onChange={onCaseChange}
          />
        </div>
        <CodeHighlight
          language={
            prefLang === 'Tailwind' ? 'javascript' : prefLang.toLowerCase()
          }
          className="h-full lg:col-span-3"
        >
          {code}
        </CodeHighlight>
        <div className="col-span-full justify-self-center flex justify-center gap-4 flex-wrap">
          {vars ? (
            <>
              <Button
                type="secondary"
                onClick={() => navigator.clipboard.writeText(code)}
              >
                Copy Everything
              </Button>
              <Button
                type="secondary"
                onClick={() => navigator.clipboard.writeText(vars)}
              >
                Copy Variables
              </Button>
            </>
          ) : (
            <Button
              type="secondary"
              onClick={() => navigator.clipboard.writeText(code)}
            >
              Copy
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default CodeOutput;
