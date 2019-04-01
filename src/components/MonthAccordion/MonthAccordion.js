import React, { PureComponent } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as formatDate from '~/services/formatDate';
import { getStatsByDate, getCountInMonth } from '~/store/stats/selector';
import { getSitesArray } from '~/store/sites/selector';
import List from '~/components/List/List';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import './month-accordion.scss';

const propTypes = {
  articles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  date: PropTypes.shape({
    isCurrent: PropTypes.bool,
    year: PropTypes.string,
    month: PropTypes.string,
    monthIndex: PropTypes.number,
  }).isRequired,
  onUpdateRequest: PropTypes.func,
};

const defaultProps = {
  onUpdateRequest: () => {},
};

const accClass = 'month-accordion';

class MonthAccordion extends PureComponent {
  state = {
    isOpen: false,
    paginate: {
      limit: 5,
      offset: 0,
    }
  };

  get listProps() {
    const { articles, sites } = this.props;

    return {
      data: articles,
      head: true,
      listClass: `${accClass}__list`,
      rowClass: `${accClass}__list-row`,
      cells: [
        {
          style: {
            width: '60%'
          },
          isMain: true,
          head: () => 'Название',
          render: data => (
            <React.Fragment>
              <div className={ `${accClass}__article-title` }>{ data.article.title || 'Название статьи не указано' }</div>
              {
                data.article.site && sites.map(site => (
                  site.id === data.article.site && (
                    <div className={ `${accClass}__article-site` } key={ site.id }>{ site.name }</div>
                  )
                ))
              }
            </React.Fragment>
          )
        },
        {
          style: {
            width: '20%'
          },
          head: () => 'Выполнена',
          render: data => (
            <div className={ `${accClass}__article-date` }>
              { formatDate.toString(data.time) }
            </div>
          )
        },
        {
          style: {
            width: '20%'
          },
          head: () => 'Знаков',
          render: data => (
            <div className={ `${accClass}__article-count` }>
              { data.counter || 0 }
            </div>
          ),
        },
      ],
    }
  }

  handleToggleClick = () => {
    const { onUpdateRequest } = this.props;
    const { paginate } = this.state;

    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen && !Array.isArray(this.props.articles)) {
        onUpdateRequest({ paginate });
      }
    });
  };

  handlePaginateChange = (paginate) => {
    const { onUpdateRequest } = this.props;

    this.setState({ paginate }, () => {
      onUpdateRequest({ paginate });
    });
  };

  render() {
    const { date, articles, articlesCount } = this.props;
    const { isOpen, paginate } = this.state;
    const accHeadClasses = cx({
      [`${accClass}__head`]: true,
      [`${accClass}__head_is-open`]: isOpen,
    });

    return (
      <div className={ accClass }>
        <button className={ accHeadClasses } type="button" onClick={ this.handleToggleClick }>
          <div className={ `${accClass}__label` }>
            { date.isCurrent && <small className={ `${accClass}__label-current` }>Текущий месяц: </small> }
            <span className={ `${accClass}__label-date` }>{ date.month } { date.year }</span>
          </div>
        </button>

        { isOpen && (
          <section className={ `${accClass}__body` }>
            { Array.isArray(articles) && articles.length > 0
              ? (
                <React.Fragment>
                  <List { ...this.listProps } />
                  {
                    articlesCount > 0 && (
                      <PaginateLine onChange={ this.handlePaginateChange } total={ articlesCount } { ...paginate } />
                    )
                  }
                </React.Fragment>
              )
              : <div className={ `${accClass}__empty` }>Нет записей</div>
            }
          </section>
        ) }
      </div>
    );
  }
}

MonthAccordion.propTypes = propTypes;
MonthAccordion.defaultProps = defaultProps;

function mapStateToProps(state, props) {
  const { monthIndex, year } = props.date;

  return {
    articlesCount: getCountInMonth(year, monthIndex)(state),
    articles: getStatsByDate(year, monthIndex)(state),
    sites: getSitesArray(state),
  };
}

export default connect(mapStateToProps)(MonthAccordion);
