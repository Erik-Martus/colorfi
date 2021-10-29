import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import '../css/prism.css';
import CopyIcon from '../icons/copy.svg';

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
        <CopyIcon />
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
