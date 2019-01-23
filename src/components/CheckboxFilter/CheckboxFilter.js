import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import Checkbox from '~/components/Checkbox/Checkbox';

import './checkbox-filter.scss';

class CheckboxFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.selected = [];
  }

  handleChange = (event) => {
    const { onChange } = this.props;
    const { checked, value } = event.target;

    if (checked) {
      this.selected = [ ...this.selected, value ];
    } else {
      this.selected = this.selected.filter(item => item !== value);
    }

    onChange && onChange(this.selected);
  };

  renderOptions = () => {
    const { options } = this.props;
    return options.map((item, index) => {
      const hasDivider = ++index < options.length;
      return (
        <React.Fragment>
          <div className="checkbox-filter__option">
            <Checkbox onChange={ this.handleChange } key={ item.value } value={ item.value }>
              { item.title }
            </Checkbox>
          </div>
          {
            hasDivider && <hr className="checkbox-filter__divider" />
          }
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <div className="checkbox-filter">
        { this.renderOptions() }
      </div>
    );
  }
}

CheckboxFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.any.isRequired
  })),
  onChange: PropTypes.func
};

export default CheckboxFilter;
