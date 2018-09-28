import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Select from '~/components/Select/Select';
import { getSitesArray } from '~/store/sites/selector';

class ArticleForm extends Component {
  get sitesOptions() {
    const { sitesArray } = this.props;
    return sitesArray.map(site => ({
      title: site.name,
      value: site.id
    }));
  }

  render() {
    return (
      <form className="article-form form">
        <div className="form__field">
          <label htmlFor="site_id" className="form__label">Для журнала</label>
          <Field name="site_id" id="site_id"
                 component={ props => <Select options={ this.sitesOptions } { ...props } /> } />
        </div>
      </form>
    );
  }
}

ArticleForm = reduxForm({
  form: 'article'
})(ArticleForm);

function mapStateToProps(state) {
  return {
    sitesArray: getSitesArray(state)
  };
}

export default connect(mapStateToProps)(ArticleForm);
