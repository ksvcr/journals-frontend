import React, { Component } from 'react';
import { connect } from 'react-redux';
import SiteSelect from '~/components/SiteSelect/SiteSelect';
import Select from '~/components/Select/Select';
import MonthsList from '~/components/MonthsList/MonthsList';
import StatsCounter from '~/components/StatsCounter/StatsCounter';
import * as statsActions from '~/store/stats/actions';

class Stats extends Component {
  state = {
    period: 6,
  };

  componentDidMount() {
    const { fetchStatsCounter } = this.props;
    fetchStatsCounter();
  }

  get periods () {
    return [
      { title: '1 месяц', value: 1 },
      { title: '3 месяца', value: 3 },
      { title: '6 месяцев', value: 6 },
      { title: '1 год', value: 12 },
      { title: '2 года', value: 24 },
      { title: '3 года', value: 36 },
      { title: '5 лет', value: 60 },
    ]
  }

  handleChangePeriod = (e) => {
    this.setState({ period: parseInt(e.target.value, 10) });
  };

  handleRequest = (month, year) => (params = {}) => {
    const { fetchStats } = this.props;
    const time_after = `${year}-${month}-01`;
    const time_before = month !== 12 ? `${year}-${parseInt(month, 10) + 1}-01` : `${parseInt(year, 10) + 1}-1-01`;
    const fetchParams = {
      time_after,
      time_before,
      ...params,
    };

    fetchStats(month, year, fetchParams);
  };

  render() {
    const { counter } = this.props;

    return (
      <React.Fragment>
        <h1 className="page__title">Статистика выполненных работ</h1>
        { this.renderForm() }
        <StatsCounter counter={ counter } />
        <MonthsList period={ this.state.period } onUpdateRequest={ this.handleRequest } />
      </React.Fragment>
    );
  }

  renderForm = () => {
    return (
      <form className="form">
        <div className="form__row">
          <div className="form__col form__col_8">
            <div className="form__field">
              <label htmlFor="sites-list" className="form__label">Для журнала</label>
              <SiteSelect id="sites-list" />
            </div>
          </div>

          <div className="form__col form__col_4">
            <div className="form__field">
              <label htmlFor="date-start" className="form__label">Период</label>
              <Select options={ this.periods } value={ this.state.period } onChange={ this.handleChangePeriod } />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  const { stats } = state;

  return {
    counter: stats.counter
  };
}

const mapDispatchToProps = {
  fetchStats: statsActions.fetchStats,
  fetchStatsCounter: statsActions.fetchStatsCounter
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
