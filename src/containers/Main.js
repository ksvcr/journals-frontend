import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <aside className="page__sidebar">
          <Link to="/">main</Link>
          <Link to="/second">second</Link>
        </aside>
        <article className="page__content">
          Главная
        </article>
      </Fragment>
    );
  }
}

export default Main;
