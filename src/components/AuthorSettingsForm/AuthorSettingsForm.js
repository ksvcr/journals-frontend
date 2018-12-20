import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as validate from '~/utils/validate';

import TextField from '~/components/TextField/TextField';
import Checkbox from '~/components/Checkbox/Checkbox';
import Radio from '~/components/Radio/Radio';
import Button from '~/components/Button/Button';

import './author-settings-form.scss';

class AuthorSettingsForm extends Component {
  render() {
    const { handleSubmit, userRole } = this.props;
    return (
      <form className="author-settings-form form" onSubmit={ handleSubmit }>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_4">
              <label htmlFor="last_name" className="form__label">
                Фамилия
              </label>
              <Field name="last_name" id="last_name" component={ TextField }
                     placeholder="Введите фамилию" validate={ [validate.required] } />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="first_name" className="form__label">
                Имя
              </label>
              <Field name="first_name" id="first_name" component={ TextField }
                     placeholder="Введите имя" validate={ [validate.required] } />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="middle_name" className="form__label">
                Отчество
              </label>
              <Field name="middle_name" id="middle_name" component={ TextField }
                     placeholder="Введите отчество" validate={ [validate.required] } />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_4">
              <label htmlFor="email" className="form__label">
                E-mail
              </label>
              <Field type="email" name="email" id="email"
                    component={ TextField } placeholder="Введите e-mail" validate={ [validate.email] } />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="password" className="form__label">
                Пароль
              </label>
              <Field disabled={ true } name="password" id="password" component={ TextField }
                     type="password" placeholder="Введите пароль" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="password_confirm" className="form__label">
                Повторите пароль
              </label>
              <Field disabled={ true } name="password_confirm" id="password_confirm" component={ TextField }
                     type="password" placeholder="Повторите пароль" />
            </div>
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="work_place" className="form__label">
            Место работы (учебы)
          </label>
          <Field name="work_place" id="work_place"
                  component={ TextField } placeholder="Введите место работы/учебы" />
        </div>
        <div className="form__field">
          <label htmlFor="work_place_en" className="form__label">
            Место работы по английски
          </label>
          <Field name="work_place_en" id="work_place_en"
                  component={ TextField } placeholder="Введите место работы/учебы" />
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="country" className="form__label">
                Cтрана
              </label>
              <Field name="country" id="country"
                    component={ TextField } placeholder="Введите страну" />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="city" className="form__label">
                Город
              </label>
              <Field name="city" id="city"
                    component={ TextField } placeholder="Введите город" />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="country_en" className="form__label">
                Страна по английски
              </label>
              <Field name="country_en" id="country_en"
                    component={ TextField } placeholder="Введите страну" />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="city_en" className="form__label">
                Город по английски
              </label>
              <Field name="city_en" id="city_en"
                    component={ TextField } placeholder="Введите город" />
            </div>
          </div>
        </div>
        <div className="form__field form__field_inline">
          <Field disabled={ true } name="is_permission_free_public" id="is_permission_free_public" type="checkbox"
                  component={ Checkbox }>
            Имею право на бесплатную публикацию
          </Field>
        </div>

        <hr className="author-settings-form__separator" />

        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_4">
              <label htmlFor="code_orcid" className="form__label">
                ORCID
              </label>
              <Field name="code_orcid" id="code_orcid" component={ TextField }
                     placeholder="Введите ORCID" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="code_rinc" className="form__label">
                РИНЦ Author ID
              </label>
              <Field name="code_rinc" id="code_rinc" component={ TextField }
                     placeholder="Введите Author ID" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="code_researcher" className="form__label">
               Researcher ID
              </label>
              <Field name="code_researcher" id="code_researcher" component={ TextField }
                     placeholder="Введите Researcher ID" />
            </div>
          </div>
        </div>

        <hr className="author-settings-form__separator" />

        <h2 className="form__subtitle">Почтовый адрес:</h2>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_8">
              <label htmlFor="mail_address_fio" className="form__label">
                ФИО
              </label>
              <Field name="mail_address_fio" id="mail_address_fio"
                      component={ TextField } placeholder="Введите ФИО" />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_4">
              <label htmlFor="mail_address_country" className="form__label">
                Страна
              </label>
              <Field name="mail_address_country" id="mail_address_country" component={ TextField }
                     placeholder="Введите страну" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="mail_address_state" className="form__label">
                Область
              </label>
              <Field name="mail_address_state" id="mail_address_state" component={ TextField }
                     placeholder="Введите область" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="mail_address_city" className="form__label">
                Город
              </label>
              <Field name="mail_address_city" id="mail_address_city" component={ TextField }
                     placeholder="Введите город" />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_4">
              <label htmlFor="mail_address_street" className="form__label">
                Улица
              </label>
              <Field name="mail_address_street" id="mail_address_street" component={ TextField }
                     placeholder="Введите улицу" />
            </div>
            <div className="form__col form__col_2">
              <label htmlFor="mail_address_house" className="form__label">
                Дом
              </label>
              <Field name="mail_address_house" id="mail_address_house" component={ TextField } />
            </div>
            <div className="form__col form__col_2">
              <label htmlFor="mail_address_housing" className="form__label">
                Корпус
              </label>
              <Field name="mail_address_housing" id="mail_address_housing" component={ TextField } />
            </div>
            <div className="form__col form__col_2">
              <label htmlFor="mail_address_room" className="form__label">
                Квартира
              </label>
              <Field name="mail_address_room" id="mail_address_room" component={ TextField } />
            </div>
            <div className="form__col form__col_2">
              <label htmlFor="mail_address_index" className="form__label">
                Индекс
              </label>
              <Field name="mail_address_index" id="mail_address_index" component={ TextField } />
            </div>
          </div>
        </div>

        <hr className="author-settings-form__separator" />

        <h2 className="form__subtitle">Вы зарегистрированы как:</h2>
        <div className="author-settings-form__role form__field form__field_inline">
          <Radio disabled={ true } defaultChecked={ userRole === 'AUTHOR' }>
            Автор
          </Radio>
          <Radio disabled={ true } defaultChecked={ userRole === 'REVIEWER' }>
            Автор и рецензент
          </Radio>
        </div>

        <div className="form__field">
          <Button type="submit">Сохранить изменения</Button>
        </div>
      </form>
    );
  }
}

AuthorSettingsForm = reduxForm({
  destroyOnUnmount: true
})(AuthorSettingsForm);

function mapStateToProps(state, props) {
  const { formName } = props;
  const { user } = state;
  const { role:userRole } = user.data;

  return {
    form: formName,
    userRole,
    initialValues: user.data
  };
}

export default connect(mapStateToProps)(AuthorSettingsForm);

