import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Radio from '~/components/Radio/Radio';

import './search-panel.scss';
import './assets/search.svg';
import TextField from '~/components/TextField/TextField';

class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      target: props.initialTarget
    };
  }

  handleParamsChange = (event) => {
    const { value } = event.target;
    const { onChange } = this.props;

    this.setState({
      target: value
    });

    if (this.query) {
      const data = {
        search: this.query,
        target: value
      };

      onChange({ search: data });
    }
  };

  handleSearchChange = (event) => {
    const { target } = this.state;
    const { onChange } = this.props;
    const { value } = event.target;
    this.query = value;
    const searchData = {
      search_query: value
    };

    if (target !== 'all') {
      searchData.search_target = target;
    }

    onChange(searchData);
  };

  get targets() {
    const { targets, hasDefaultTarget } = this.props;
    return hasDefaultTarget ? [{ value: 'all', title: 'Искать везде' }, ...targets ] : targets;
  }

  renderParams = () => {
    const { target } = this.state;
    return this.targets.map(item => (
      <Radio name="search-filter" key={ item.value } checked={ target === item.value }
             value={ item.value } onChange={ this.handleParamsChange } >
        { item.title }
      </Radio>
    ));
  };

  get inputProps() {
    return {
      placeholder: 'Поиск'
    };
  }

  render() {
    return (
      <div className="search-panel">
         <div className="search-panel__params">
           { this.renderParams() }
         </div>
        <div className="search-panel__field">
          <TextField input={ this.inputProps } className="text-field_search" icon="search"
                     onChange={ this.handleSearchChange } />
        </div>
      </div>
    );
  }
}

SearchPanel.propTypes = {
  params: PropTypes.array,
  targets: PropTypes.array,
  hasDefaultTarget: PropTypes.bool,
  initialTarget: PropTypes.string,
  onChange: PropTypes.func
};

SearchPanel.defaultProps = {
  hasDefaultTarget: true,
  initialTarget: 'all',
  targets: []
};

export default SearchPanel;
