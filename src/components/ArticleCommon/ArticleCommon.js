import React, {Component} from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

import Select from '~/components/Select/Select';
import { getLanguagesArray } from '~/store/languages/selector';

class ArticleCommon extends Component {
  get languagesOptions() {
    const { languagesArray } = this.props;
    return languagesArray.map(item => ({
      title: item.name,
      value: item.id
    }));
  }

  render() {
    return (
      <div className="article-common">
        <div className="form__field">
          <label htmlFor="language" className="form__label">Язык статьи</label>
          <div className="form__row">
            <div className="form__col">
              <Field name="language" id="language"
                     component={ props => <Select options={ this.languagesOptions } { ...props } /> } />
            </div>
            <div className="form__col">
              Нужен перевод сопроводительной информации на русский
            </div>
          </div>
        </div>
        <div className="form__row">
          <div className="form__col">
            Нужен перевод сопроводительной информации на русский
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    languagesArray: getLanguagesArray(state)
  };
}

export default connect(mapStateToProps)(ArticleCommon);
