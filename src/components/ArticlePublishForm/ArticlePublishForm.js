import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Select from '~/components/Select/Select';
import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import ArticleCommon from '~/components/ArticleCommon/ArticleCommon';

import { getSitesArray } from '~/store/sites/selector';

import './article-publish-form.scss';
import * as sitesActions from '~/store/sites/actions';

class ArticlePublishForm extends Component {
  get sitesOptions() {
    const { sitesArray } = this.props;
    return sitesArray.map(item => ({
      title: item.name,
      value: item.id
    }));
  }

  get wizardSteps() {
    return [
      {
        title: 'Общие сведения',
        component: <ArticleCommon />
      },
      {
        title: 'Авторы',
        component: <div>2</div>
      },
      {
        title: 'Текст статьи',
        component: <div>3</div>
      },
      {
        title: 'Файлы к статье',
        component: <div>4</div>
      },
      {
        title: 'Список литературы',
        component: <div>5</div>
      }
    ];
  }

  handleSiteChange = (event) => {
    const { value:currentSite } = event.target;
    const { setCurrentSite } = this.props;
    setCurrentSite(currentSite);
  };

  render() {
    const { currentSite } = this.props;
    return (
      <form className="article-publish-form form">
        <div className="article-publish-form__head">
          <div className="form__field">
            <label htmlFor="site_id" className="form__label">Для журнала</label>
            <Select value={ currentSite } options={ this.sitesOptions } onChange={ this.handleSiteChange } />
          </div>
        </div>
        <div className="article-publish-form__wizard">
          <ArticleWizard steps={ this.wizardSteps } />
        </div>
      </form>
    );
  }
}

ArticlePublishForm = reduxForm({
  form: 'article-publish'
})(ArticlePublishForm);

function mapStateToProps(state) {
  return {
    currentSite: state.sites.current,
    sitesArray: getSitesArray(state)
  };
}

const mapDispatchToProps = {
  setCurrentSite: sitesActions.setCurrent
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePublishForm);
