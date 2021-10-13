import React from 'react';
import logo from './logo.svg';

function Header() {
  return (
    <header className="container flex justify-between">
      <img src={logo} />
      <nav>
        <a
          href="https://github.com/Erik-Martus/colorfi"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </nav>
    </header>
  );
}

export default Header;
