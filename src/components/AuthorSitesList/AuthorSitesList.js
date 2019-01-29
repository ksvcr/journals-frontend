import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from '~/components/Icon/Icon';

import { getSitesArray } from '~/store/sites/selector';

import './author-sites-list.scss';
import './assets/cancel.svg';
import './assets/add.svg';

class AuthorSitesList extends Component {
  handleRemove = (event) => {
    const { id } = event.currentTarget.dataset;
    console.log(`Remove #${id} site`);
  };

  handleAdd = () => {
    console.log('Add new site...');
  };

  renderItems = () => {
    const { sitesArray } = this.props;
    return sitesArray.map((item) => {
      return (
        <div key={ item.id } data-id={ item.id } className="author-sites-list__item">
          { item.name }
          <button type="button" className="author-sites-list__remove"
                  data-id={ item.id } onClick={ this.handleRemove }>
            <Icon name="cancel" className="author-sites-list__remove-icon" />
            Удалить журнал
          </button>
        </div>
      );
    });
  };

  render() {
    const { userId } = this.props;
    return (
      <div className="author-sites-list">
        <p className="author-sites-list__header">
          Журналы, в которые { userId ? 'пользователь может' : 'Вы можете' } писать статьи:
        </p>
        <div className="author-sites-list__content">
          { this.renderItems() }
        </div>
        <div className="author-sites-list__actions">
          <button onClick={ this.handleAdd } type="button" className="author-sites-list__add">
            <Icon name="add" className="author-sites-list__add-icon" />
            Добавить другие журналы
          </button>
        </div>
        <hr className="page__divider" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sitesArray: getSitesArray(state)
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSitesList);
