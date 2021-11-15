import React from 'react';
import Logo from './logo.svg';
import IconGitHub from '../icons/github.svg';

function Header() {
  return (
    <header className="mb-6 py-6 bg-white shadow-xl">
      <div className="container flex items-center justify-between">
        <Logo />
        <nav>
          <a
            href="https://github.com/Erik-Martus/colorfi"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <IconGitHub />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
