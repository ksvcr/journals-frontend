import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '~/components/List/List';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';
import InterestList from '~/components/InterestList/InterestList';
import TagEditor from '~/components/TagEditor/TagEditor';
import SearchPanel from '~/components/SearchPanel/SearchPanel';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';
import Checkbox from '~/components/Checkbox/Checkbox';

import * as articlesActions from '~/store/articles/actions';
import * as usersActions from '~/store/users/actions';

import { getUsersArray, getUsersParams } from '~/store/users/selector';

import getNoun from '~/utils/getNoun';

import './redactor-reviewer-list.scss';
import './assets/arrow.svg';
import apiClient from '~/services/apiClient';

class RedactorReviewerList extends Component {
  handleRequest = (params = {}) => {
    const { fetchUsers, usersParams } = this.props;
    const data = {
      ...usersParams,
      ...params,
      search: params.search_query || usersParams.search,
      role: 'REVIEWER'
    };
    fetchUsers(data);
  };

  renderName = ({ last_name, first_name, middle_name }) =>
    `${last_name} ${first_name.charAt(0)}. ${ middle_name ? middle_name.charAt(0) + '.' : ''}`;

  handleChoose = event => {
    const { articleId, inviteArticleReviewer, fetchArticleReviewInvites } = this.props;
    let { id } = event.currentTarget.dataset;
    id = parseInt(id, 10);
    inviteArticleReviewer(articleId, { article: articleId, reviewer: id }).then(
      () => {
        return fetchArticleReviewInvites({ article: articleId });
      }
    );
  };

  handleTagAdd = (user, text) => {
    const { currentUserId, createUserTag } = this.props;
    const tagData = { text, user, tag_author: currentUserId };
    createUserTag(tagData);
  };

  get listProps() {
    const { usersArray } = this.props;

    return {
      data: usersArray,
      head: true,
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '25%'
          },
          head: () => 'ФИО',
          render: this.renderName
        },
        {
          style: {
            width: '30%'
          },
          head: () => 'Научные интересы',
          render: ({ sphere_scientific_interests }) => (
            sphere_scientific_interests ? <InterestList data={ sphere_scientific_interests } /> : null
          )
        },
        {
          style: {
            width: '15%'
          },
          head: () => 'Рецензий в мес.',
          render: ({ count_reviews_month }) => count_reviews_month
        },
        {
          style: {
            width: '30%'
          },
          render: data => (
            <div className="redactor-reviewer-list__choose-wrapper">
              <Button type="button" className="button_small redactor-reviewer-list__choose"
                      data-id={ data.id } onClick={ this.handleChoose } >
                Выбрать
                <Icon name="arrow" className="redactor-reviewer-list__choose-icon" />
              </Button>
            </div>
          )
        }
      ]
    };
  }

  renderBox = data => {
    const { removeUserTag } = this.props;
    return (
      <div className="redactor-reviewer-list__box">
        <div className="redactor-reviewer-list__tags">
          <TagEditor
            entityId={ data.id }
            data={ data.tags }
            onAdd={ this.handleTagAdd }
            onRemove={ removeUserTag }
          />
        </div>
      </div>
    );
  };

  get countText() {
    const { usersArray } = this.props;
    const count = usersArray.length;
    return getNoun(
      count,
      `Найден ${count} рецензент:`,
      `Найдено ${count} рецензента:`,
      `Найдено ${count} рецензентов:`
    );
  }

  loadOptions = inputValue => {
    return new Promise(resolve => {
      if (!inputValue) resolve([]);
      apiClient.getUserTags({ search_query: inputValue }).then(data => {
        const options = data.results.map(item => ({ label: item.text, value: item.id }));
        resolve(options);
      });
    });
  };

  get selectTagsProps() {
    return {
      async: true,
      name: 'tags',
      loadOptions: this.loadOptions,
      placeholder: 'Выберите тег',
      normalize: option => option.value,
      onChange: ({ value }) => this.handleRequest({ filter: { tag_ids: value } })
    };
  }

  renderSearchBox = () => {
    const { onClose } = this.props;
    return (
      <div className="redactor-reviewer-list__search-box">
        <button
          onClick={ onClose }
          type="button"
          className="redactor-reviewer-list__cancel"
        >
          Отмена
        </button>
        <SearchPanel onChange={ this.handleRequest } />
        <div className="redactor-reviewer-list__search-form form">
          <div className="form__field">
            <label className="form__label">Искать по:</label>
            <div className="form__row">
              <div className="form__col form__col_6">
                <div className="form__field">
                  <SearchableSelect { ...this.selectTagsProps } />
                </div>
              </div>
              <div className="form__col form__col_6">
                <Checkbox name="strict">Точное соответствие</Checkbox>
              </div>
            </div>
          </div>
        </div>
        <span className="redactor-reviewer-list__count">{ this.countText }</span>
      </div>
    );
  };

  render() {
    return (
      <div className="redactor-reviewer-list">
        { this.renderSearchBox() }

        <List { ...this.listProps } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    currentUserId: user.data.id,
    usersArray: getUsersArray(state),
    usersParams: getUsersParams(state)
  };
}

const mapDispatchToProps = {
  inviteArticleReviewer: articlesActions.inviteArticleReviewer,
  createUserTag: usersActions.createUserTag,
  removeUserTag: usersActions.removeUserTag,
  fetchUsers: usersActions.fetchUsers,
  fetchArticleReviewInvites: articlesActions.fetchArticleReviewInvites
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorReviewerList);
