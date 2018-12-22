import React, { Component } from 'react';
import redraft from 'redraft';
import { convertFromRaw, EditorState } from 'draft-js';
import { exporter } from '~/services/editorCustomStyler';
import { styleMap } from '~/services/customDraftUtils';
import { Link } from 'react-router-dom';

import ImageMedia from '~/components/ImageMedia/ImageMedia';
import Table from '~/components/Table/Table';
import ImageSlider from '~/components/ImageSlider/ImageSlider';

class Renderer extends Component {
  get renderers() {
    const { raw } = this.props;
    const contentFromRaw = convertFromRaw(raw);
    const editorState = EditorState.createWithContent(contentFromRaw);
    const exportStyleMap = exporter(editorState);
    const customStyleKeys = Object.keys(exportStyleMap).filter(item => /^CUSTOM/i.test(item));

    const defaultStyleMap = Object.keys(styleMap).reduce((obj, key) => {
      const style = styleMap[key];
      return { ...obj, [key]: (children, { key }) => <span key={key} style={ style }>{children}</span> };
    }, {});
    
    const customStyleMap = customStyleKeys.reduce((obj, key) => {
      const style = exportStyleMap[key].style;
      return { ...obj, [key]: (children, { key }) => <span key={key} style={ style }>{children}</span> };
    }, {});

    return {
      inline: {
        BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
        ITALIC: (children, { key }) => <em key={key}>{children}</em>,
        UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
        ...defaultStyleMap,
        ...customStyleMap
      },
      blocks: {
        unstyled: (children) => children.map((child, index) => <p key={ index }>{child}</p>),
        'align-center': (children) => children.map((child, index) => <p key={ index } style={ { textAlign: 'center' } }>{child}</p>),
        'align-left': (children) => children.map((child, index) => <p key={ index } style={ { textAlign: 'left' } }>{child}</p>),
        'align-right': (children) => children.map((child, index) => <p key={ index } style={ { textAlign: 'right' } }>{child}</p>),
        'align-justify': (children) => children.map((child, index) => <p key={ index } style={ { textAlign: 'justify' } }>{child}</p>),
        'atomic': (children) => children.map((child, index) => <React.Fragment key={ index }>{child}</React.Fragment>),
        'block-table': (children) => children.map((child, index) => <React.Fragment key={ index }>{child}</React.Fragment>),
      },
      entities: {
        LINK: (children, data, { key }) => <Link key={key} to={data.url}>{children}</Link>,
        'image-list': (children, data, { key }) => (
          data.images.length > 1 ? <ImageSlider data={ data } key={ key }/> : <ImageMedia data={ data } key={ key }/>
        ),
        'block-table': (children, data, { key }) => <Table data={ data } index={ key } key={ key }/>
      },
    };
  }

  renderWarning() {
    return <div>Нет блоков.</div>;
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
