import React from 'react';
import Logo from './logo.svg';
import GhIcon from '../icons/github.svg';

function Header() {
  return (
    <header className="mb-6 py-6 bg-white border-b-2 border-gray-900">
      <div className="container flex items-center justify-between">
        <Logo />
        <nav>
          <a
            href="https://github.com/Erik-Martus/colorfi"
            target="_blank"
            rel="noreferrer"
          >
            <GhIcon />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
