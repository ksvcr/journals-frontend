import React, { PureComponent } from 'react';

import PointerSurface from './PointerSurface'

const BAD_CHARACTER_PATTER = /\s/;
const HTTP_PREFIX = /^http(s?):*\/\//i;

function sanitizeURL(url) {
  if (!url) {
    return 'http://';
  }
  if (HTTP_PREFIX.test(url)) {
    return url;
  }
  return 'http://' + url;
}

class LinkURLEditor extends PureComponent {
  state = {
    url: this.props.href,
  };

  render() {
    const { href } = this.props;
    const { url } = this.state;

    const error = url ? BAD_CHARACTER_PATTER.test(url) : false;

    let label = 'Apply';
    let disabled = !!error;
    if (href) {
      label = url ? 'Apply' : 'Remove';
      disabled = error;
    } else {
      disabled = error || !url;
    }

    return (
      <div className="czi-image-url-editor">
        <form className="czi-form" onSubmit={ this.handleSubmit }>
          <fieldset>
            <legend>Add a Link</legend>
            <input
              autoFocus={ true }
              onChange={ this._onURLChange }
              placeholder="Paste a URL"
              spellCheck={ false }
              type="text"
              value={ url || '' }
            />
          </fieldset>
          <div className="czi-form-buttons">
            <PointerSurface onClick={ this._cancel }>
              Cancel
            </PointerSurface>
            <PointerSurface
              active={ true }
              disabled={ disabled }
              onClick={ this._apply } >
              { label }
            </PointerSurface>
          </div>
        </form>
      </div>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  _onURLChange = (e) => {
    const url = e.target.value;
    this.setState({
      url,
    });
  };

  _cancel = () => {
    this.props.close();
  };

  _apply = () => {
    const { url } = this.state;
    if (url && !BAD_CHARACTER_PATTER.test(url)) {
      this.props.close(sanitizeURL(url));
    }
  };
}

export default LinkURLEditor;
