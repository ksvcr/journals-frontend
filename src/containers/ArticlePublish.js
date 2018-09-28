import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '~/components/Menu/Menu';
import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import ArticlePublishForm from '~/components/ArticlePublishForm/ArticlePublishForm';

import * as languageActions from '~/store/languages/actions';

class ArticlePublish extends Component {
  componentDidMount() {
    const { fetchLanguages } = this.props;
    fetchLanguages();
  }

  get menuItems() {
    return [
      {
        title: 'Мои статью',
        href: '/'
      },
      {
        title: 'Мои скидки',
        href: '/second'
      },
      {
        title: 'Настройки',
        href: '/'
      }
    ];
  }

  render() {
    return (
      <React.Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>
        <article className="page__content">
          <ArticleTopTools />
          <h1 className="page__title">Опубликовать статью</h1>
          <ArticlePublishForm />
        </article>
      </React.Fragment>
    );
  }
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  fetchLanguages: languageActions.fetchLanguages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePublish);
