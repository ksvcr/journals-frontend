import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '~/components/List/List';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';
import InterestList from '~/components/InterestList/InterestList';
import TagEditor from '~/components/TagEditor/TagEditor';

import * as articlesActions from '~/store/articles/actions';
import * as usersActions from '~/store/users/actions';
import { getUsersArray } from '~/store/users/selector';

import './redactor-reviewer-list.scss';
import './assets/arrow.svg'

class RedactorReviewerList extends Component {
  renderName = ({ last_name, first_name, middle_name }) =>
    `${last_name} ${first_name.charAt(0)}. ${middle_name.charAt(0)}.`;

  handleChoose = (event) => {
    const { articleId, inviteArticleReviewer } = this.props;
    let { id } = event.currentTarget.dataset;
    id = parseInt(id, 10);
    inviteArticleReviewer(articleId, { article: articleId, reviewer: id });
  };

  handleTagAdd = (user, text) => {
    const { currentUserId, createUserTag } = this.props;
    const tagData = { text, user, tag_author: currentUserId };
    createUserTag(user, tagData);
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
          isMain: true,
          head: () => 'ФИО',
          render: this.renderName
        },
        {
          style: {
            width: '30%'
          },
          isMain: true,
          head: () => 'Научные интересы',
          render: ({ sphere_scientific_interests }) => <InterestList data={ sphere_scientific_interests } />
        },
        {
          style: {
            width: '15%'
          },
          isMain: true,
          head: () => 'Рецензий в мес.',
          render: ({ count_reviews_month }) => count_reviews_month
        },
        {
          style: {
            width: '30%'
          },
          isMain: true,
          render: (data) =>
            <div className="redactor-reviewer-list__choose-wrapper">
              <Button type="button" className="button_small redactor-reviewer-list__choose"
                      data-id={ data.id } onClick={ this.handleChoose }>
                Выбрать
                <Icon name="arrow" className="redactor-reviewer-list__choose-icon" />
              </Button>
            </div>
        }
      ]
    };
  }

  renderBox = (data) => {
    const { removeUserTag } = this.props;
    return (
      <div className="redactor-reviewer-list__box">
        <div className="redactor-reviewer-list__tags">
          <TagEditor entityId={ data.id } data={ data.tags }
                     onAdd={ this.handleTagAdd } onRemove={ removeUserTag } />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="redactor-reviewer-list">
        <List { ...this.listProps } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    currentUserId: user.data.id,
    usersArray: getUsersArray(state)
  };
}

const mapDispatchToProps = {
  inviteArticleReviewer: articlesActions.inviteArticleReviewer,
  createUserTag : usersActions.createUserTag,
  removeUserTag : usersActions.removeUserTag
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(RedactorReviewerList);
