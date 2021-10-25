import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
// import loadLanguages from 'prismjs/components/';
import '../css/prism.css';

// loadLanguages(['scss']);

function CodeHighlight({ language, children }) {
  const codeNode = React.useRef();

  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <pre>
      <code ref={codeNode} className={`language-${language}`}>
        {children}
      </code>
    </pre>
  );
}

CodeHighlight.propTypes = {
  language: PropTypes.string,
};

CodeHighlight.defaultProps = {
  language: 'javascript',
};

export default CodeHighlight;
