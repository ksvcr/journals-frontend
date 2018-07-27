import React, { Component } from 'react';
import Header from '~/components/Header/Header';

import 'normalize.css';
import '~/static/styles/index.scss';

class Main extends Component {
  render() {
    return (
      <div className="page">
        <Header />
        <main>
          { this.props.children }
        </main>
      </div>
    );
  }
}

export default Main;
