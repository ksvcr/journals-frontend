import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import ProseMirrorDocument from 'react-prosemirror-document';

import customTypeMap from './customTypeMap';
import customMarkMap from './customMarkMap';

class Renderer extends Component {
  renderWarning() {
    const { t } = this.props;
    return <div>{ t('no_blocks') }</div>;
  }

  render() {
    const { raw, meta } = this.props;
    if (!raw) {
      return this.renderWarning();
    }

    return <ProseMirrorDocument document={ raw } skipUnknownMarks={ true } skipUnknownTypes={ true }
                                typeMap={ customTypeMap(meta) } markMap={ customMarkMap } />;
  }
}

Renderer = withNamespaces()(Renderer);

export default Renderer;
