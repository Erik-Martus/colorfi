import React, { useState } from 'react';
import Modal from './Modal';
import Themes from './Themes';

function Intro() {
  const [hiddenState, setHiddenState] = useState(true);

  return (
    <section id="intro">
      <h1>Create Code Ready Color Themes</h1>
      <button role="button" onClick={() => setHiddenState(false)}>
        Choose a Theme
      </button>
      <Modal
        name="themes"
        hiddenState={hiddenState}
        handleHiddenState={() =>
          setHiddenState((currentState) => {
            let newState = !currentState;
            return newState;
          })
        }
      >
        <Themes />
      </Modal>
    </section>
  );
}

export default Intro;
