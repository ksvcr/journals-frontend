import React, {Component} from 'react';
import { change, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import TextField from '~/components/TextField/TextField';
import Radio from '~/components/Radio/Radio';
import AuthorChooser from '~/components/AuthorChooser/AuthorChooser';
import AuthorCreateForm from '~/components/AuthorCreateForm/AuthorCreateForm';

import { searchUsers } from '~/store/users/actions';

import './author-add.scss';

class AuthorAdd extends Component {
  get sources() {
    return [
      { value: 'search', title: 'Найти в системе' },
      { value: 'create', title: 'Создать автора' }
    ];
  }

  handleSearchChange = (event) => {
    const { field, searchUsers } = this.props;
    const { value } = event.target;

    const searchQuery = {
      search_query: value
    };
    searchUsers(field, searchQuery);
  };

  handleAuthorChoose = (id) => {
    console.log(id);
  };

  renderSources = () => {
    const { field } = this.props;

    return this.sources.map(item => (
      <Field name={ `${field}.source` } key={ item.value } value={ item.value }
             type="radio" component={ Radio } >
        { item.title }
      </Field>
    ));
  };

  render() {
    const { field, source, authorsArray } = this.props;
    return (
      <div className="author-add">
        <h3 className="author-add__title">Добавить автора</h3>
        <Field name={ `${field}.id` } type="hidden" component={ TextField } />
        <div className="form__field">
          { this.renderSources() }
        </div>

        { source === 'search' &&
          <React.Fragment>
            <div className="form__field">
              <Field name={ `${field}.search` } id="search" icon="search" component={ TextField }
                     placeholder="Поиск" className="text-field_white text-field_search"
                     onChange={ this.handleSearchChange } />
            </div>
            <div className="author-add__list">
              <AuthorChooser data={ authorsArray } onChoose={ this.handleAuthorChoose } />
            </div>
          </React.Fragment>
        }

        { source === 'create' &&
          <div className="form__field">
            <AuthorCreateForm formName={ `${field}.author-create` }/>
          </div>
        }
      </div>
    );
  }
}

AuthorAdd.defaultProps = {
  authorsArray: []
};

function mapStateToProps(state, props) {
  const { formName, field } = props;
  const { users } = state;

  const formSelector = formValueSelector(formName);
  const source = formSelector(state, `${field}.source`);

  return {
    source,
    authorsArray: users.searchData[field]
  };
}

const mapDispatchToProps = {
  change,
  searchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorAdd);
