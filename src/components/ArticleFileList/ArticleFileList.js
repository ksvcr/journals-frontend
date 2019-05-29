import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import Icon from '~/components/Icon/Icon';
import TextField from '~/components/TextField/TextField';
import DownloadLink from '~/components/DownloadLink/DownloadLink';

import formatBytes from '~/utils/formatBytes';
import getFileExtension from '~/utils/getFileExtension';

import './article-file-list.scss';
import './assets/remove.svg';

class ArticleFileList extends PureComponent {
  handleRemove = (event) => {
    const { index } = event.currentTarget.dataset;
    const { fields } = this.props;
    fields.remove(index);
  };

  renderItems = () => {
    const { t, fields, download } = this.props;
    return fields.map((field, index) => {
      const data = fields.get(index);
      return (
        <div key={ index } className="article-file-list__item">
          <div className="article-file-list__header">
            { download ?
              <DownloadLink file={ data.file } name={ data.name } size={ data.file_size } /> :
              <div className="article-file-list__infobox">
                <div className="article-file-list__top">
                  <span className="article-file-list__name">
                    { data.name }
                  </span>
                  <div className="article-file-list__actions">
                    <button type="button" className="article-file-list__remove"
                            data-index={ index } onClick={ this.handleRemove }>
                      <Icon className="article-file-list__remove-icon" name="remove" />
                    </button>
                  </div>
                </div>
                <div className="article-file-list__info">
                  { formatBytes(data.file_size) }, { getFileExtension(data.name) || t('unknown') }
                </div>
              </div>
            }
          </div>

          <div className="article-file-list__description form__field">
            <label htmlFor={ `${field}.text_to_description` } className="form__label">{ t('file_description') }</label>
            <Field name={ `${field}.text_to_description` } id={ `${field}.text_to_description` }
                   component={ TextField } placeholder={ t('enter_description') } />
          </div>
        </div>
      );
    })
  };

  render() {
    return (
      <div className="article-file-list">
        { this.renderItems() }
      </div>
    );
  }
}

ArticleFileList = withNamespaces()(ArticleFileList);

export default ArticleFileList;
