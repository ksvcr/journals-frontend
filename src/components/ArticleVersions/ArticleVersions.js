import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import * as formatDate from '~/services/formatDate';

import './article-versions.scss';

const ArticleVersions = ({ articleId, versions, t }) => {
  function renderItems() {
    return versions.sort((a, b) => a.version - b.version).map(({ version, date_create }) => (
      <li className="article-versions__item" key={ version }>
        <Link className="article-versions__link" to={ `/article/${articleId}/version/${version}` }>
          { `${ t('version') } ${ version } (${ formatDate.toString(date_create) })` }
        </Link>
      </li>
    ));
  }

  return (
    <div className="article-versions">
      <div className="article-versions__title">
        { t('article_versions') }:
      </div>
      <ul className="article-versions__list">
        { renderItems() }
      </ul>
    </div>
  );
};

ArticleVersions.propTypes = {
  articleId: PropTypes.number.isRequired,
  versions: PropTypes.array.isRequired
};

export default withNamespaces()(ArticleVersions);
