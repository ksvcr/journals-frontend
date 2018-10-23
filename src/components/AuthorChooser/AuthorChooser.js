import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './author-chooser.scss';
import Button from '~/components/Button/Button';
import getNoun from '~/utils/getNoun';

class AuthorChooser extends Component {
  handleClick = (event) => {
    const { id } = event.currentTarget.dataset;
    const { onChoose } = this.props;
    onChoose(id);
  };

  renderItems = () => {
    const { data } = this.props;
    return data.map(item => (
      <div className="author-chooser__item" key={ item.id }>
        <div className="author-chooser__box">
          <div className="author-chooser__title">
            { `${item.middle_name} ${item.first_name} ${item.last_name}` }
          </div>
          <div className="author-chooser__info">
            НИИ УХИМВАДЕ, Екатеринбург, Россия
          </div>
        </div>
        <div className="author-chooser__button">
          <Button className="button_small" data-id={ item.id } onClick={ this.handleClick }>
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
        <div className="author-chooser__count">
          Найдено { data.length } { getNoun(data.length, 'автор', 'автора', 'авторов') }
        </div>
        <div className="author-chooser__list">
          { this.renderItems() }
        </div>
      </div>
    );
  }
}

AuthorChooser.propTypes = {
  data: PropTypes.array
};

export default AuthorChooser;
