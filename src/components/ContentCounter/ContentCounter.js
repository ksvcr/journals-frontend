import React, { Component } from 'react';
import punycode from 'punycode';

import './content-counter.scss';

class ContentCounter extends Component {
  get cleanString() {
    const { editorState } = this.props;
    const regex = /(?:\r\n|\r|\n)/g;  // new line, carriage return, line feed
    const plainText = editorState.getCurrentContent().getPlainText('');
    return plainText.replace(regex, '').trim(); // replace above characters w/ space
  }

  countChar = () => {
    const decodeUnicode = (str) => punycode.ucs2.decode(str);
    return decodeUnicode(this.cleanString).length;
  };

  countWord = () => {
    const wordArray = this.cleanString.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  };

  countSpace = () => {
    return this.cleanString.split(' ').length - 1
  };

  render() {
    return (
      <div className="content-counter">
        <div className="content-counter__item">
          <div className="content-counter__label">
            Символов:
          </div>
          <div className="content-counter__value">
            { this.countChar() }
          </div>
        </div>
        <div className="content-counter__item">
          <div className="content-counter__label">
            Слов:
          </div>
          <div className="content-counter__value">
            { this.countWord() }
          </div>
        </div>
        <div className="content-counter__item">
          <div className="content-counter__label">
            Пробелов:
          </div>
          <div className="content-counter__value">
            { this.countSpace() }
          </div>

        </div>
      </div>
    );
  }
}

export default ContentCounter;
