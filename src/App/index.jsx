import React, { Component } from 'react';
import Grafo from '../Grafo';
import grafo from './grafo.json';

class App extends Component {

  render() {
    return (<Grafo grafo={grafo} />);
  }
}

export default App;
