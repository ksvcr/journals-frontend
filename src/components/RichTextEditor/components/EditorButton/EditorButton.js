import React from 'react';
import classNames from 'classnames';

import Icon from '~/components/Icon/Icon';

import '../EditorButton/editor-button.scss';

import '../EditorButton/assets/bold.svg';
import '../EditorButton/assets/italic.svg';
import '../EditorButton/assets/underline.svg';
import '../EditorButton/assets/strikethrough.svg';
import '../EditorButton/assets/align-left.svg';
import '../EditorButton/assets/align-center.svg';
import '../EditorButton/assets/align-right.svg';
import '../EditorButton/assets/align-justify.svg';
import '../EditorButton/assets/sup.svg';
import '../EditorButton/assets/sub.svg';
import '../EditorButton/assets/undo.svg';
import '../EditorButton/assets/redo.svg';
import '../EditorButton/assets/uppercase.svg';
import '../EditorButton/assets/capitalize.svg';
import '../EditorButton/assets/unlink.svg';
import '../EditorButton/assets/picture-small.svg';
import '../EditorButton/assets/link.svg';
import '../EditorButton/assets/table.svg';

const EditorButton = ({ icon, active, title, disabled, onClick }) => {
  const buttonClass = classNames('editor-button', { 'editor-button_active': active });
  const iconClasses = classNames('editor-button__icon', { [`editor-button__icon_${icon}`]: icon });

  function handleMouseDown(event) {
    event.preventDefault();
  }

  return (
    <button className={ buttonClass } disabled={ disabled }
            onClick={ onClick } onMouseDown={ handleMouseDown } >
      { icon ? <Icon className={ iconClasses } name={ icon } /> : title }
    </button>
  );
};

export default EditorButton;
