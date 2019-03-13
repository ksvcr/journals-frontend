import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import debounce from 'lodash/debounce';

import Radio from '~/components/Radio/Radio';
import TextField from '~/components/TextField/TextField';

import './search-panel.scss';
import './assets/search.svg';

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    const { initialTarget } = this.props;
    this.handleSearchChange = debounce(this.handleSearchChange, 300);
    this.state = {
      target: initialTarget
    };
  }

  handleSearchChange = (value) => {
    const { target } = this.state;
    const { onChange } = this.props;

    if (!value) return;

    this.query = value;
    const searchData = {
      search_query: value
    };

    if (target !== 'all') {
      searchData.search_target = target;
    }

    onChange(searchData);
  };

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
  
  handleChange = (event) => {
    const { value } = event.target;
    this.handleSearchChange(value);
  };

  get targets() {
    const { targets, hasDefaultTarget, t } = this.props;
    return hasDefaultTarget ? [{ value: 'all', title: t('search_everywhere') }, ...targets ] : targets;
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
    const { t } = this.props;
    return {
      placeholder: t('search')
    };
  }

  render() {
    return (
      <div className="search-panel">
        { this.targets.length > 0 &&
          <div className="search-panel__params">
            { this.renderParams() }
          </div>
        }
        <div className="search-panel__field">
          <TextField input={ this.inputProps } className="text-field_search" icon="search"
                     onChange={ this.handleChange } />
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

SearchPanel = withNamespaces()(SearchPanel);

export default SearchPanel;
