import React, { Component } from 'react';
import { connect } from 'react-redux';

import TranslatorArticleList from '~/components/TranslatorArticleList/TranslatorArticleList';
import SearchPanel from '~/components/SearchPanel/SearchPanel';
import Select from '~/components/Select/Select';

import * as articlesActions from '~/store/articles/actions';
import { getArticlesParams } from '~/store/articles/selector';

class TranslatorArticles extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    return Promise.all([
      this.handleRequest()
    ]);
  };

  handleRequest = (params={}) => {
    const { articlesParams, fetchArticles } = this.props;
    return fetchArticles(null, { state_article: 'AWAIT_TRANSLATE', ...articlesParams, ...params });
  };

  get searchTargets() {
    return [
      {
        value: 'title',
        title: 'Искать в заголовках'
      },
      {
        value: 'author',
        title: 'Искать в авторах'
      },
      {
        value: 'doi',
        title: 'Номер'
      }
    ];
  }

  get selectTagsProps() {
    // TODO: Добавить список тегов
    return {
      name: 'tags',
      options: [],
      onChange: (event) => {}
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="page__title">Статьи в работе</h1>

        <div className="page__tools">
          <form className="form">
            <div className="form__field">
              <label className="form__label">Поиск статьи</label>
              <SearchPanel targets={ this.searchTargets } onChange={ this.handleRequest } />
            </div>
            <div className="form__row">
              <div className="form__col form__col_6">
                <div className="form__field">
                  <label className="form__label">Теги</label>
                  <Select { ...this.selectTagsProps } />
                </div>
              </div>
            </div>
          </form>
        </div>

        <TranslatorArticleList onUpdateRequest={ this.handleRequest } />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    articlesParams: getArticlesParams(state)
  };
}

const mapDispatchToProps = {
  fetchArticles: articlesActions.fetchArticles
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslatorArticles);
