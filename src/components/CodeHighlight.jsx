import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import '../css/prism.css';
import copyIcon from '../icons/copy.svg';

function CodeHighlight({ language, children }) {
  const codeNode = React.useRef();

  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <div id={`codeblock-${language}`}>
      <button
        role="button"
        onClick={() => {
          navigator.clipboard.writeText(children);
        }}
      >
        <img src={copyIcon} alt="Copy" />
      </button>
      <pre>
        <code ref={codeNode} className={`language-${language}`}>
          {children}
        </code>
      </pre>
    </div>
  );
}

CodeHighlight.propTypes = {
  language: PropTypes.string,
};

CodeHighlight.defaultProps = {
  language: 'javascript',
};

export default CodeHighlight;
