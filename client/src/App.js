import React, { Component } from 'react';
import Header from './components/header';

class App extends Component {
  render() {
    return (
      <div className="row">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
