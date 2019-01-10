import React from 'react';
import classNames from 'classnames';

import Icon from '~/components/Icon/Icon';

import './editor-button.scss';

import './assets/bold.svg';
import './assets/italic.svg';
import './assets/underline.svg';
import './assets/strikethrough.svg';
import './assets/align-left.svg';
import './assets/align-center.svg';
import './assets/align-right.svg';
import './assets/align-justify.svg';
import './assets/sup.svg';
import './assets/sub.svg';
import './assets/undo.svg';
import './assets/redo.svg';
import './assets/uppercase.svg';
import './assets/capitalize.svg';

import {
  createBlockStyleButton,
  createInlineStyleButton
} from 'draft-js-buttons';

import createBlockAlignmentButton from 'draft-js-buttons/lib/utils/createBlockAlignmentButton';

const createFn = {
  alignment: createBlockAlignmentButton,
  style: createInlineStyleButton,
  blockType: createBlockStyleButton
};

const EditorButton = ({ type, value, icon, iconText='' }) => {
  const iconClasses = classNames('editor-button__icon', { [`editor-button__icon_${icon}`]: icon });
  return createFn[type]({
    [type]: value,
    children: icon ? <Icon className={ iconClasses } name={ icon } /> : iconText,
  });
};

export default EditorButton;
