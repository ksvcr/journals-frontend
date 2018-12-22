import React, { Component } from 'react';
import Renderer from '~/components/Renderer/Renderer';

import './content.scss';

class Content extends Component {
  renderBlocks = (blocks) => {
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
    const { data } = this.props;
    const { content_blocks=[] } = data;
    return (
      <div className="content">
        { data.text_to_description &&
          <React.Fragment>
            <h2 className="content__title">
              Аннотация
            </h2>
            <p>
              { data.text_to_description }
            </p>
            { data.text_to_keywords &&
              <div className="content__keywords">
                <div className="content__keywords-title">Ключевые слова:</div>
                <div className="content__keywords-text">
                  { data.text_to_keywords }
                </div>
              </div>
            }
          </React.Fragment>
        }
        { this.renderBlocks(content_blocks) }
      </div>
    );
  }
}

export default Content;
