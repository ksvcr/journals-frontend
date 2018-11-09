import React from 'react';
import classNames from 'classnames';

import Icon from '~/components/Icon/Icon';

import './editor-button.scss';

import './assets/bold.svg';
import './assets/italic.svg';
import './assets/underline.svg';
import './assets/strikethrough.svg';

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

const EditorButton = ({ type, value, icon }) => {
  const iconClasses = classNames('editor-button__icon', { [`editor-button__icon_${icon}`]: icon });
  return createFn[type]({
    [type]: value,
    children: icon ? <Icon className={ iconClasses } name={ icon } /> : value,
  });
};

export default EditorButton;
