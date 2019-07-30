import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import sanitizeHtml from 'sanitize-html';

import Renderer from '~/components/Renderer/Renderer';
import ReviewsHistory from '~/components/ReviewsHistory/ReviewsHistory';

import './content.scss';

class Content extends Component {
  get isHtmlContent() {
    const { data } = this.props;
    return data.show_html_content;
  }

  renderBlocks = blocks => {
    const { data } = this.props;
    const meta = {
      images: data.images
    };
    return blocks.map((item, index) => (
      <div className="content__block" key={ index }>
        <h2 className="content__title">{ `${index + 1}. ${item.title}` }</h2>
        <Renderer raw={ item.content } meta={ meta } />
      </div>
    ));
  };

  renderFinancingSources = sources => {
    return sources.map((item, index) => (
      <li key={ index }>
        <p>
          { item.organization +
            ', ' +
            item.grant_name +
            ', ' +
            item.grant_number }
        </p>
      </li>
    ));
  };

  renderSourcesList = () => {
    const { data } = this.props;
    return data.sources.map((item, index) => {
      const author = Array.isArray(item.author) ?
        (item.author.length ? item.author[0] : '') :
        item.author;
      const authorName = author ? `${ getName(author) }` : '';

      function getName(author) {
        if (typeof author === 'string') {
          return `${author},`;
        } else {
          const { lastname, initials } = author;
          return `${lastname} ${initials}, `;
        }
      }

      return (
        <li key={ index }>
          <p>
            { authorName } { item.original_name }, { ' ' }
            { item.page_count } c.
          </p>
        </li>
      )
    });
  };

  renderJsonContent = () => {
    const { t, data, author } = this.props;
    const { content_blocks = [], financing_sources = [] } = data;
    const recommendationId = data.state_article === 'DISAPPROVED' ? 3 : 1;
    const reviews = data.reviews ? data.reviews.filter(item => item.recommendation === recommendationId) : null;

    return (
      <div className="content">
        { data.text_to_description && (
          <React.Fragment>
            <h2 className="content__title">{ t('annotation') }</h2>
            <p>{ data.text_to_description }</p>
            { data.text_to_keywords && (
              <div className="content__keywords">
                <div className="content__keywords-title">{ t('keywords') }</div>
                <div className="content__keywords-text">
                  { data.text_to_keywords }
                </div>
              </div>
            ) }
          </React.Fragment>
        ) }

        <div className="content__main">{ this.renderBlocks(content_blocks) }</div>

        <div className="content__footer">
          <div className="content__additional">
            <h3>{ t('additional_materials') }</h3>
            <p>{ t('not_specified') }</p>
          </div>
          <div className="content__financing">
            <h3>{ t('financing') }</h3>
            { financing_sources && financing_sources.length ? (
              <ul> { this.renderFinancingSources(financing_sources) } </ul>
            ) : (
              <p>
                { ' ' }
                { t('no_financing') }
              </p>
            ) }
          </div>
          <div className="content__thanks">
            <h3>{ t('thanks_text') }</h3>
            { data.thanks_text ? <p>{ data.thanks_text }</p> : <p>{ t('not_specified') }</p> }
          </div>
          <div className="content__conflict">
            <h3>{ t('conflict_of_interest') }</h3>
            { data.conflict_interest ? (
              <p>{ data.conflict_interest }</p>
            ) : (
              <p>{ t('not_specified') }</p>
            ) }
          </div>
          { data.sources && (
            <div className="content__literature">
              <h3>{ t('source_list') }</h3>
              <ul>{ this.renderSourcesList() }</ul>
            </div>
          ) }
          { reviews && (
            <div className="content__reviews">
              <h3>{ t('review') }</h3>
              <ReviewsHistory
                reviews={ reviews }
                author={ author }
                className="reviews-history_publish"
              />
            </div>
          ) }
        </div>
      </div>
    );
  };

  renderHtmlContent = () => {
    const { data } = this.props;
    const sanitizeOptions = {
      allowedTags: false,
      allowedAttributes: false
    };
    const sanitize = sanitizeHtml(data.html_content, sanitizeOptions);

    return <div className="content"
                dangerouslySetInnerHTML={ { __html: sanitize } } />;
  };

  render() {
    return this.isHtmlContent ? this.renderHtmlContent() : this.renderJsonContent();
  }
}

Content = withNamespaces()(Content);

export default Content;
