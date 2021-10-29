import React from 'react';
import HeartOutline from '../icons/heart-outline.svg';

function Footer() {
  return (
    <footer className="mt-8 py-10 font-light bg-gray-800 text-white">
      <div className="container flex justify-center">
        <a href="https://emartus.dev" target="_blank" rel="noreferrer">
          Made with{' '}
          <HeartOutline className="inline fill-current text-red-600" /> by Erik
          Martus
        </a>
      </div>
    </footer>
  );
}

export default Footer;
