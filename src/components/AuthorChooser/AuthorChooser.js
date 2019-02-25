import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Button/Button';
import getNoun from '~/utils/getNoun';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './author-chooser.scss';

class AuthorChooser extends Component {
  handleClick = (event) => {
    const { onChoose } = this.props;
    let { id, index } = event.currentTarget.dataset;
    id = parseInt(id, 10);
    index = parseInt(index, 10);
    onChoose(id, index);
  };

  renderItems = () => {
    const { data } = this.props;
    return data.map((item, index) => (
      <div className="author-chooser__item" key={ item.id }>
        <div className="author-chooser__box">
          <div className="author-chooser__name">
            { `${item.last_name} ${item.first_name} ${item.middle_name}` }
          </div>
          <div className="author-chooser__info">
            НИИ УХИМВАДЕ, Екатеринбург, Россия
          </div>
        </div>
        <div className="author-chooser__button">
          <Button className="button_small" data-id={ item.id } data-index={ index } onClick={ this.handleClick }>
            Выбрать
          </Button>
        </div>
      </div>
    ));
  };

  render() {
    const { data } = this.props;
    return (
      <div className="author-chooser">
        { data.length > 0 &&
          <div className="author-chooser__count">
            Найдено { data.length } { getNoun(data.length, 'автор', 'автора', 'авторов') }
          </div>
        }
        <div className="author-chooser__list">
          <ReactCSSTransitionGroup transitionName="fade"
                                   transitionEnterTimeout={ 400 }
                                   transitionLeaveTimeout={ 200 } >
            { this.renderItems() }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

AuthorChooser.propTypes = {
  data: PropTypes.array
};

export default AuthorChooser;
