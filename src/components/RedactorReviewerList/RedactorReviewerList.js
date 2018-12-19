import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '~/components/List/List';
import InterestList from '~/components/InterestList/InterestList';

import { getUsersArray } from '~/store/users/selector';

import './redactor-reviewer-list.scss';

class RedactorReviewerList extends Component {
  renderName = ({ last_name, first_name, middle_name }) =>
    `${last_name} ${first_name.charAt(0)}. ${middle_name.charAt(0)}.`;

  handleChoose = (event) => {
    let { id } = event.currentTarget.dataset;
    id = parseInt(id, 10);
    console.log(id);
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
            <button type="button" className="redactor-reviewer-list__choose"
                    data-id={ data.id } onClick={ this.handleChoose }>
              Выбрать
            </button>
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

export default connect(
  mapStateToProps
)(RedactorReviewerList);
