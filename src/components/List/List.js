import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ToolTip from '~/components/ToolTip/ToolTip';
import SortChecker from '~/components/SortChecker/SortChecker';
import PointMenuButton from '~/components/PointMenuButton/PointMenuButton';

import './list.scss';

class List extends PureComponent {
  state = {
    sort: {}
  };

  handleSort = event => {
    const { onSortChange } = this.props;
    const { name: field, checked } = event.target;

    this.setState({ sort: { [field]: checked } });
    const sortOrder = checked ? '' : '-';
    const sortParam = `${sortOrder}${field}`;
    onSortChange(sortParam);
  };

  renderItems = () => {
    const { data } = this.props;
    return data.length ? data.map(this.renderItem) : this.renderPlaceholder();
  };

  renderItem = data => {
    const { box } = this.props;
    return (
      <div className="list__item" key={ data.id }>
        {this.renderRow(data)}
        {box && <div className="list__box">{box(data)}</div>}
      </div>
    );
  };

  renderPlaceholder = () => {
    return <div className="list__placeholder"> Нет записей </div>;
  };

  renderRow = data => {
    return <div className="list__row">{this.renderCells(data)}</div>;
  };

  renderHead = () => {
    return (
      <div className="list__item list__item_head" key={ 'list-head' }>
        <div className="list__row">{this.renderCells(null, true)}</div>
      </div>
    );
  };

  renderCells = (data, isHead) => {
    const { cells, menuTooltip } = this.props;
    const { sort } = this.state;

    const cellItems = cells.map((cell, index) => {
      const cellClasses = classNames('list__cell', {
        list__cell_head: isHead,
        list__cell_main: cell.isMain
      });

      const headRender = cell.head ? cell.head() : null;
      const render = isHead ? headRender : cell.render(data);

      const sortField = cell.sort;
      const sortValue = Boolean(sort[sortField]);
      const isActiveSort = sort.hasOwnProperty(sortField);

      if (isHead && cell.headToolTip) {
        return (
          <div className={ cellClasses } key={ index } style={ cell.style }>
            <ToolTip
              className="tooltip"
              position="bottom-start"
              html={ cell.headToolTip() }
            >
              <button type="button" className="list__expand-button">
                {render}
              </button>
            </ToolTip>
            {cell.sort && (
              <SortChecker
                name={ sortField }
                checked={ sortValue }
                isActive={ isActiveSort }
                onChange={ this.handleSort }
              />
            )}
          </div>
        );
      } else if (isHead && cell.sort) {
        return (
          <div className={ cellClasses } key={ index } style={ cell.style }>
            <SortChecker
              name={ sortField }
              checked={ sortValue }
              isActive={ isActiveSort }
              onChange={ this.handleSort }
            >
              {render}
            </SortChecker>
          </div>
        );
      } else {
        return (
          <div className={ cellClasses } key={ index } style={ cell.style }>
            {render}
          </div>
        );
      }
    });

    if (!isHead && menuTooltip) {
      cellItems.push(
        <div className="list__menu-button" key="menu-cell">
          <ToolTip
            className="tooltip"
            position="right-start"
            offset={ -5 }
            html={ menuTooltip(data) }
          >
            <PointMenuButton />
          </ToolTip>
        </div>
      );
    }

    return cellItems;
  };

  render() {
    const { head } = this.props;
    return (
      <div className="list">
        <div className="list__holder">
          {head && this.renderHead()}
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={ 400 }
            transitionLeave={ false }
          >
            {this.renderItems()}
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
  sort: PropTypes.string,
  cells: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object,
      head: PropTypes.func,
      render: PropTypes.func.isRequired
    })
  ).isRequired
};

export default List;
