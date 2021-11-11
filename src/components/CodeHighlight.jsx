import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import '../css/prism.css';

function CodeHighlight({ language, children }) {
  const codeNode = React.useRef();

  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <article id={`codeblock-${language}`}>
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
