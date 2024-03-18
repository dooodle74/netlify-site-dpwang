// Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="fixed-top">
      <div className="container">
        <div className="left-section">
          <a href="/" className="btn btn-primary">Home</a>
          <a href="/projects" className="btn btn-primary">Projects</a>
          <a href="/photography" className="btn btn-primary">Photography</a>
        </div>
        <div className="right-section">
          <a href="https://linkedin.com" className="btn btn-primary">LinkedIn</a>
          <a href="https://github.com" className="btn btn-primary">GitHub</a>
          <a href="mailto:dpwang01@gmail.com" className="btn btn-primary">Contact</a>
        </div>
      </div>
    </header>
  );
}

export default Header;