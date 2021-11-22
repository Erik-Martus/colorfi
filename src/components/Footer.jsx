import React from 'react';
import IconHeart from '../icons/heart-outline.svg';

function Footer() {
  return (
    <footer className="mt-8 py-10 font-light bg-indigo-900 text-white">
      <div className="container flex justify-center">
        <p>
          Made with <IconHeart className="inline fill-current text-red-600" />{' '}
          by{' '}
          <a
            href="https://emartus.dev"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Erik Martus
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
