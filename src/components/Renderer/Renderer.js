import React, { Component } from 'react';
import redraft from 'redraft';
import { convertFromRaw, EditorState } from 'draft-js';
import { exporter } from '~/services/editorCustomStyler';
import { Link } from 'react-router-dom';

class Renderer extends Component {
  get renderers() {
    const { raw } = this.props;
    const contentFromRaw = convertFromRaw(raw);
    const editorState = EditorState.createWithContent(contentFromRaw);
    const exportStyleMap = exporter(editorState);
    const customStyleKeys = Object.keys(exportStyleMap).filter(item => /^CUSTOM/i.test(item));
    
    const customStyleMap = customStyleKeys.reduce((obj, key) => {
      const style = exportStyleMap[key].style;
      return { ...obj, [key]: (children, { key }) => <span key={key} style={ style }>{children}</span> };
    }, {});

    return {
      inline: {
        BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
        ITALIC: (children, { key }) => <em key={key}>{children}</em>,
        UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
        ...customStyleMap
      },
      blocks: {
        unstyled: (children) => children.map((child, index) => <p key={ index }>{child}</p>),
        atomic: (children, { keys, data }) => children.map((child, i) => {
          console.log(data[i]);
        }),
      },
      entities: {
        // key is the entity key value from raw
        LINK: (children, data, { key }) => <Link key={key} to={data.url}>{children}</Link>,
      },
    };
  }

  renderWarning() {
    return <div>Nothing to render.</div>;
  }

  render() {
    const { raw } = this.props;
    if (!raw) {
      return this.renderWarning();
    }
    const rendered = redraft(raw, this.renderers);
    // redraft returns a null if there's nothing to render
    if (!rendered) {
      return this.renderWarning();
    }
    return (
      <div>
        { rendered }
      </div>
    );
  }
}

export default Renderer;
