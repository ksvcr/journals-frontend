import React, { Component } from 'react';
import { change, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import cx from 'classnames';

import TextField from '~/components/TextField/TextField';
import Radio from '~/components/Radio/Radio';
import AuthorChooser from '~/components/AuthorChooser/AuthorChooser';
import AuthorCreateForm from '~/components/AuthorCreateForm/AuthorCreateForm';
import { getRolesArray } from '~/store/roles/selector';
import { searchUsers, createUser, insertUser } from '~/store/users/actions';

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

  state = {
    isOpenRoles: false,
  };

  handleSearchChange = (event) => {
    const { searchUsers, data } = this.props;
    const { value } = event.target;
    const { hash } = data;

    const searchQuery = {
      search_query: value
    };

    searchUsers(hash, searchQuery);
  };

  handleAuthorChoose = (id, index) => {
    const { field, formName, change, insertUser, searchData, data } = this.props;
    const { hash } = data;
    insertUser(searchData[hash][index]);
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

  handleAuthorCreate = (data) => {
    const { createUser, field, formName, change } = this.props;
    createUser(data).then(({ value }) => {
      if (value.id !== undefined) {
        change(formName, `${field}.id`, value.id);
      }
    }).catch(error => console.error(error));
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

  handleToggleRoles = () => {
    this.setState((state) => ({ isOpenRoles: !state.isOpenRoles }));
  };

  handleRolesChoose = (id, event) => {
    const { field, formName, change, data } = this.props;
    const { checked } = event.target;
    let currentRoles = data.roles;

    if(!currentRoles) currentRoles = [];

    if(checked) {
      // Добавляем роль в список
      change(formName, `${field}.roles`, [...currentRoles, id]);
    } else {
      // Убираем роль из списка
      change(formName, `${field}.roles`, currentRoles.filter(nId => nId !== id));
    }
  };

  isSelectedRole = id => {
    const { data } = this.props;
    if(!Array.isArray(data.roles)) return false;

    return data.roles.indexOf(id) >= 0;
  };

  render() {
    const { field, authorData, correspondingAuthor,
            authorsArray, data, authorRoles } = this.props;
    const { source, isCurrent, hash } = data;

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
            {authorRoles.length > 0 && (
              <div className="author-add__roles">
                <div className="author-add__forbut">
                  <button className="author-add__roles-button" type="button" onClick={this.handleToggleRoles}>
                    <span>{ isCurrent ? 'Моя роль в подготовке статьи' : 'Роль в подготовке статьи' }</span>
                  </button>
                  <FieldHint text={ 'Подсказка про роли' } />
                  <span className={cx({
                    "author-add__roles-arrow": true,
                    "author-add__roles-arrow_up": this.state.isOpenRoles,
                    "author-add__roles-arrow_down": !this.state.isOpenRoles,
                  })} />
                </div>
                { this.state.isOpenRoles && (
                  <div className="author-add__roles-box">
                    <ul className="author-add__roles-list">
                      {authorRoles.map(role => (
                        <li className="author-add__roles-role" key={role.id}>
                          <Checkbox name="AuthorRole" checked={this.isSelectedRole(role.id)} onChange={ (e) => this.handleRolesChoose(role.id, e) }>
                            { role.name }
                          </Checkbox>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
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
                                  onSubmit={ this.handleAuthorCreate }/>
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
  const { formName, field, data } = props;
  const { users, user } = state;
  const { isCurrent } = data;

  const formSelector = formValueSelector(formName);
  const hash = formSelector(state, `${field}.hash`);
  const id = formSelector(state, `${field}.id`);
  const correspondingAuthor = formSelector(state, 'corresponding_author');
  const authorRoles = getRolesArray(state);

  return {
    correspondingAuthor,
    authorData: isCurrent ? user.data : users.data[id],
    authorsArray: users.searchData[hash],
    searchData: users.searchData,
    authorRoles,
  };
}

const mapDispatchToProps = {
  change,
  searchUsers,
  createUser,
  insertUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorAdd);
