import React, { Component } from 'react';
import Renderer from '~/components/Renderer/Renderer';

import './content.scss';

class Content extends Component {
  renderBlocks = () => {
    const { blocks } = this.props;

    return blocks.map((item, index) => (
      <div className="content__block" key={ index }>
        <h2 className="content__title">
          { `${index+1}. ${item.title}` }
        </h2>
        <Renderer raw={ item.content }/>
      </div>
    ));
  };

  render() {
    return (
      <div className="content">
        { this.renderBlocks() }
      </div>
    );
  }
}

export default Content;
