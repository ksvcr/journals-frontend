import React, {Component} from 'react';

import { Tooltip } from 'react-tippy';

import 'react-tippy/dist/tippy.css';
import './tooltip.scss'

class ToolTip extends Component {
  get tooltipProps() {
    return {
      interactive: true,
      theme: 'light',
      position: 'bottom',
      trigger: 'click',
      className: 'tooltip',
      animation: 'fade',
      animateFill: false,
      duration: 200,
      sticky: true,
      stickyDuration: 0,
      ...this.props
    }
  }

  render() {
    return (
      <Tooltip { ...this.tooltipProps }>
        { this.props.children }
      </Tooltip>
    );
  }
}

export default ToolTip;
