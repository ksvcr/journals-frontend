import React, { Component } from 'react';
import Renderer from '~/components/Renderer/Renderer';

class Content extends Component {
  renderBlocks = () => {
    const { blocks } = this.props;

    return blocks.map((item, index) => (
      <div className="content__block" key={ index }>
        <div className="content__title">
          { item.title }
        </div>
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
