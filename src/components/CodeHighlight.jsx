import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import '../css/prism.css';

function CodeHighlight({ language, className = '', children }) {
  const codeNode = React.useRef();

  useEffect(() => {
    Prism.highlightAll();
  }, [language, children]);

  return (
    <article id={`codeblock-${language}`} className={className}>
      <pre>
        <code ref={codeNode} className={`language-${language}`}>
          {children}
        </code>
      </pre>
    </article>
  );
}

CodeHighlight.propTypes = {
  language: PropTypes.string,
};

CodeHighlight.defaultProps = {
  language: 'javascript',
};

export default CodeHighlight;
