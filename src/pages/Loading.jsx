import React from 'react';
import loadingGIF from './loadingGIF.gif';
import './style.css';

class Loading extends React.Component {
  render() {
    return (
      <p>
        <img src={ loadingGIF } alt="Carregando..." className="loadingGIF" />
        Carregando...
      </p>
    );
  }
}

export default Loading;
