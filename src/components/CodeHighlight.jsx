import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import '../css/prism.css';
// import hljs from 'highlight.js/lib/core';
// import javascript from 'highlight.js/lib/languages/javascript';
// import 'highlight.js/styles/vs2015.css';

// hljs.registerLanguage('javascript', javascript);

function CodeHighlight({ language, colors }) {
  const codeNode = React.useRef();

  useEffect(() => {
    Prism.highlightAll();
  }, [colors]);

  const codeIntro = `module.exports = {
    theme: {
      extend: {
        colors: {\n`;

  const codeContent = colors.map((color, index) => {
    return index === 0
      ? `          "${color.name}": "${color.DEFAULT}"`
      : `\n          "${color.name}": "${color.DEFAULT}"`;
  });

  const codeOutro = `
        }
      }
    }
  }`;

  return (
    <pre>
      <code ref={codeNode} className={`language-${language}`}>
        {`${codeIntro}${codeContent}${codeOutro}`}
      </code>
    </pre>
  );
}

CodeHighlight.propTypes = {
  colors: PropTypes.array,
  language: PropTypes.string,
};

CodeHighlight.defaultProps = {
  language: 'javascript',
};

export default CodeHighlight;
