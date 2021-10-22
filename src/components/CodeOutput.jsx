import React, { useState, useEffect } from 'react';
import CodeHighlight from './CodeHighlight.jsx';

function CodeOutput({ themeColors }) {
  const [colors, setColors] = useState(themeColors);

  useEffect(() => {
    setColors(themeColors);
  }, [themeColors]);

  return <CodeHighlight language="javascript" colors={colors}></CodeHighlight>;
}

export default CodeOutput;
