import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import List from '~/components/List/List';
import DateFilter from '~/components/DateFilter/DateFilter';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import Payment from '~/components/Payment/Payment';

import { getArticlesArray } from '~/store/articles/selector';
import * as articlesActions from '~/store/articles/actions';

import * as formatDate from '~/services/formatDate';
import { getArticleStageTitle } from '~/services/articleStages';
import { allowEditStatuses } from '~/services/articleStatuses';

class AuthorArticleList extends Component {
  state = {
    box: null,
    dateField: 'date_create'
  };

  getToolsMenuItems(data) {
    const { locked_by } = data;
    const { t, userId } = this.props;
    const isLocked = locked_by !== null && locked_by !== userId;

    let items = [];

    const isAllowEdit = ~allowEditStatuses.indexOf(data.state_article);

    if (!isLocked && isAllowEdit) {
      items.push({
        title: t('edit'),
        link: `/article/${data.id}/edit/`
      });
    }

    if (data.state_article !== 'CALL_OFF' && data.state_article !== 'DRAFT') {
      items.push({
        title: t('revoke'),
        handler: this.handleCallOff
      });
    }

    if (data.state_article === 'AWAIT_PAYMENT') {
      items.push({
        title: t('to_pay'),
        handler: this.handlePaymentShow
      });
    }

    items = [
      ...items,
      {
        title: t('view'),
        type: 'preview',
        icon: 'preview',
        link: `/article/${data.id}`
      }
    ];

    return items;
  }

  get dateTitle() {
    const { t } = this.props;
    return {
      date_create: t('created'),
      date_send_to_review: t('sended'),
      last_change: t('changed')
    };
  }

  handleCallOff = id => {
    const { editArticle } = this.props;
    editArticle(id, { state_article: 'CALL_OFF' })
  };

  handleSortChange = ordering => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ ordering });
  };

  handlePaymentShow = id => {
    this.setState({
      box: { id, type: 'payment' }
    });
  };

  handlePaymentClose = () => {
    this.setState({ box: null });
  };

  handleDateFilterChange = (field, range) => {
    const { onUpdateRequest } = this.props;
    this.setState({ dateField: field });
    onUpdateRequest({ filter: range });
  };

  handlePaginateChange = paginate => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ paginate });
  };

  get listProps() {
    const { t, articlesArray } = this.props;
    const { dateField } = this.state;

    return {
      data: articlesArray,
      onSortChange: this.handleSortChange,
      head: true,
      menuTooltip: (data, onClose) => (
        <ToolsMenu id={ data.id } items={ this.getToolsMenuItems(data) } onClose={ onClose } />
      ),
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '50%'
          },
          isMain: true,
          head: () => t('title'),
          render: data => data.title || t('title_of_article_not_found')
        },
        {
          style: {
            width: '12%'
          },
          sort: dateField,
          head: () => this.dateTitle[dateField],
          headToolTip: () => (
            <DateFilter
              field={ dateField }
              onChange={ this.handleDateFilterChange }
            />
          ),
          render: data => formatDate.toString(data[dateField])
        },
        {
          style: {
            width: '13%'
          },
          sort: 'stage_article',
          head: () => t('stage'),
          render: data => getArticleStageTitle(data.stage_article)
        },
        {
          style: {
            width: '20%'
          },
          sort: 'state_article',
          head: () => t('state'),
          render: data => <StatusLabel status={ data.state_article } />
        }
      ]
    };
  }

  renderBox = data => {
    const { box } = this.state;
    if (box && box.id === data.id) {
      if (box.type === 'payment') {
        return <Payment onClose={ this.handlePaymentClose } />;
      }
    }

    return null;
  };

  render() {
    const { total, paginate } = this.props;
    return (
      <div className="author-article-list">
        <div className="author-article-list__holder">
          <List { ...this.listProps } />
        </div>

        { total > 0 && (
          <PaginateLine onChange={ this.handlePaginateChange } total={ total }
                        { ...paginate } />
        ) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, articles } = state;
  const { total, paginate } = articles;
  return {
    articlesArray: getArticlesArray(state),
    userId: user.data.id,
    total,
    paginate
  };
}

const mapDispatchToProps = {
  editArticle: articlesActions.editArticle
};

AuthorArticleList = withNamespaces()(AuthorArticleList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorArticleList);
