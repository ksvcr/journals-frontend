import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '~/components/List/List';
import Button from '~/components/Button/Button';
import InterestList from '~/components/InterestList/InterestList';

import * as articlesActions from '~/store/articles/actions';
import { getUsersArray } from '~/store/users/selector';

import './redactor-reviewer-list.scss';

class RedactorReviewerList extends Component {
  renderName = ({ last_name, first_name, middle_name }) =>
    `${last_name} ${first_name.charAt(0)}. ${middle_name.charAt(0)}.`;

  handleChoose = (event) => {
    const { articleId, inviteArticleReviewer } = this.props;
    let { id } = event.currentTarget.dataset;
    id = parseInt(id, 10);
    inviteArticleReviewer(articleId, { reviewer: id });
  };

  get listProps() {
    const { usersArray } = this.props;

    return {
      data: usersArray,
      head: true,
      cells: [
        {
          style: {
            width: '20%'
          },
          isMain: true,
          head: () => 'ФИО',
          render: this.renderName
        },
        {
          style: {
            width: '20%'
          },
          isMain: true,
          head: () => 'Научные интересы',
          render: ({ sphere_scientific_interests }) => <InterestList data={ sphere_scientific_interests } />
        },
        {
          style: {
            width: '10%'
          },
          isMain: true,
          head: () => 'Рецензий в мес.',
          render: ({ count_reviews_month }) => count_reviews_month
        },
        {
          style: {
            width: '10%'
          },
          isMain: true,
          render: (data) =>
            <Button type="button" className="button_small redactor-reviewer-list__choose"
                    data-id={ data.id } onClick={ this.handleChoose }>
              Выбрать
            </Button>
        }
      ]
    };
  }

  render() {
    return (
      <div className="redactor-reviewer-list">
        <List { ...this.listProps } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersArray: getUsersArray(state)
  };
}

const mapDispatchToProps = {
  inviteArticleReviewer: articlesActions.inviteArticleReviewer,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(RedactorReviewerList);
