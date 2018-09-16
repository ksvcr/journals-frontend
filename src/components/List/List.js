import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ToolTip from '~/components/ToolTip/ToolTip';
import './list.scss';

class List extends PureComponent {
  renderRows = () => {
    const { data } = this.props;
    return data.map(this.renderRow);
  };

  renderRow = (data) => {
    return (
      <div className="list__row" key={ data.id }>
        { this.renderCells(data) }
      </div>
    );
  };

  renderHead = () => {
    return (
      <div className="list__row list__row_head" key={ 'list-head' }>
        { this.renderCells(null, true) }
      </div>
    );
  };

  renderCells = (data, isHead) => {
    const { cells } = this.props;

    return cells.map((cell, index) => {
      const cellClasses = classNames('list__cell',
        { 'list__cell_head': isHead,
          'list__cell_main': cell.isMain
      });

      const headRender = cell.head ? cell.head() : null;
      const render = isHead ? headRender : cell.render(data);
      if (isHead && cell.headToolTip) {
        return (
          <div className={ cellClasses } key={ index } style={ cell.style }>
            <ToolTip className="tooltip" position="bottom-start"
                     html={ cell.headToolTip() }>
              <button type="button" className="list__expand-button">
                { render }
              </button>
            </ToolTip>
            { cell.sortField &&
              <button type="button" className="list__sort-button list__sort-button_with-expand">
                Сортировать
              </button>
            }
          </div>
        );
      } else if (isHead && cell.sortField) {
        return (
          <div className={ cellClasses } key={ index } style={ cell.style }>
            <button type="button" className="list__sort-button">
              { render }
            </button>
          </div>
        );
      } else {
        return (
          <div className={ cellClasses } key={ index } style={ cell.style }>
            { render }
          </div>
        );
      }
    });
  };

  render() {
    const { head } = this.props;
    return (
      <div className="list">
        <div className="list__holder">
          { head && this.renderHead() }
          <ReactCSSTransitionGroup transitionName="list-item"
                                   transitionEnterTimeout={ 500 }
                                   transitionLeave={ false }>
            { this.renderRows() }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,
  cells: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object,
      head: PropTypes.func,
      render: PropTypes.func.isRequired
    })
  ).isRequired
};

export default List;
