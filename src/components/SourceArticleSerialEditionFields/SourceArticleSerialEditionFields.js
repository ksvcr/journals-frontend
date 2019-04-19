import React from 'react';
import { Field } from 'redux-form';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import * as validate from '~/utils/validate';
import FieldHint from '~/components/FieldHint/FieldHint';

const SourceArticleSerialEditionFields = () => {
  return (
    <React.Fragment>
      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="lastname" className="form__label">
              Фамилия автора <ReqMark />
            </label>
            <Field name="author[0].lastname" id="lastname" className="text-field_white" component={ TextField }
                   placeholder="Введите фамилию автора" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="initials" className="form__label">
              Инициалы автора <ReqMark />
            </label>
            <Field name="author[0].initials" id="initials" className="text-field_white" component={ TextField }
                   placeholder="Введите инициалы автора" validate={ [validate.required] } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <label htmlFor="source_issue_title" className="form__label">
          Название издания <ReqMark />
        </label>
        <Field name="issue_title" id="source_issue_title" className="text-field_white" component={ TextField }
               placeholder="Введите название" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="source_issue_english_title" className="form__label">
          Название издания на английском <ReqMark />
        </label>
        <Field name="issue_english_title" id="source_issue_english_title" className="text-field_white" component={ TextField }
               placeholder="Введите название" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="original_source_name" className="form__label">
          Название на языке оригинала <ReqMark />
        </label>
        <Field name="original_name" id="original_source_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="second_source_name" className="form__label">
          Название на английском языке
        </label>
        <Field name="second_source_name" id="second_source_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" />
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="source_year_publication" className="form__label">
              Год публикации<ReqMark />
              <FieldHint text={ 'В формате (ГГГГ)' } />
            </label>
            <Field name="year_publication" id="source_year_publication" className="text-field_white" component={ TextField }
                   placeholder="Введите год" validate={ [validate.required, validate.year] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="source_issue_number" className="form__label">
              Номер издания <ReqMark />
            </label>
            <Field name="issue_number" id="source_issue_number" className="text-field_white" component={ TextField }
                   placeholder="Введите название" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="page_numbers" className="form__label">
              Номера страниц
            </label>
            <Field name="page_numbers" id="page_numbers" className="text-field_white" component={ TextField }
                   placeholder="Введите номера страниц" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SourceArticleSerialEditionFields;
