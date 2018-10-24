import React, { Component } from 'react';
import { change, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import TextField from '~/components/TextField/TextField';
import Radio from '~/components/Radio/Radio';
import AuthorChooser from '~/components/AuthorChooser/AuthorChooser';
import AuthorCreateForm from '~/components/AuthorCreateForm/AuthorCreateForm';

import { searchUsers } from '~/store/users/actions';

import './author-add.scss';
import Checkbox from '~/components/Checkbox/Checkbox';
import FieldHint from '~/components/FieldHint/FieldHint';

class AuthorAdd extends Component {
  get sources() {
    return [
      { value: 'search', title: 'Найти в системе' },
      { value: 'create', title: 'Создать автора' }
    ];
  }

  handleSearchChange = (event) => {
    const { hash, searchUsers } = this.props;
    const { value } = event.target;

    const searchQuery = {
      search_query: value
    };
    searchUsers(hash, searchQuery);
  };

  handleAuthorChoose = (id) => {
    const { field, formName, change } = this.props;
    change(formName, `${field}.id`, id);
  };

  handleCorrespondingAuthor = (event) => {
    const { authorData, change, formName } = this.props;
    const { checked } = event.target;
    if (checked) {
      change(formName, 'corresponding_author', authorData.id);
    } else {
      change(formName, 'corresponding_author', null);
    }
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
    const { field, authorData, isCurrent, hash,
            correspondingAuthor, source, authorsArray } = this.props;
    return (
      <div className="author-add">
        { authorData !== undefined ?
          <div className="author-add__current">
            <div className="author-add__person">
              <div className="author-add__name">
                { `${authorData.last_name} ${authorData.first_name} ${authorData.middle_name}` }
              </div>
              <div className="author-add__info">
                НИИ УХИМВАДЕ, Екатеринбург, Россия
              </div>
            </div>
            <div className="form__field form__field_inline">
              <Checkbox name="isCorrespondingAuthor" checked={ authorData.id ===  correspondingAuthor }
                        onChange={ this.handleCorrespondingAuthor }>
                { isCurrent ? 'Я являюсь автором-корреспондентом' : 'Автор-корреспондент' }
              </Checkbox>
              <FieldHint text={ 'Подсказка про корреспонденту' } />
            </div>
          </div> :
          <div className="author-add__form">
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
                <AuthorCreateForm formName={ `author-create[${hash}]` }
                                  onSubmit={ (data) => { console.log(data); } }/>
              </div>
            }
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
  const hash = formSelector(state, `${field}.hash`);
  const id = formSelector(state, `${field}.id`);
  const isCurrent = formSelector(state, `${field}.isCurrent`);
  const correspondingAuthor = formSelector(state, 'corresponding_author');

  return {
    source,
    hash,
    isCurrent,
    correspondingAuthor,
    authorData: users.data[id],
    authorsArray: users.searchData[hash]
  };
}

const mapDispatchToProps = {
  change,
  searchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorAdd);
