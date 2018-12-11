import React from 'react';
import { Field } from 'redux-form';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import * as validate from '~/utils/validate';

const SourceArticleSerialEditionFields = () => {
  return (
    <React.Fragment>
      <div className="form__field">
        <label htmlFor="source_author" className="form__label">
          Автор <ReqMark />
        </label>
        <Field name="author" id="source_author" className="text-field_white" component={ TextField }
               placeholder="Введите имя автора" validate={ [validate.required] } />
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
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="source_year_publication" className="form__label">
              Год публикации <ReqMark />
            </label>
            <Field name="year_publication" id="source_year_publication" className="text-field_white" component={ TextField }
                   placeholder="Введите название" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="source_issue_number" className="form__label">
              Номер издания <ReqMark />
            </label>
            <Field name="issue_number" id="source_issue_number" className="text-field_white" component={ TextField }
                   placeholder="Введите название" validate={ [validate.required] } />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SourceArticleSerialEditionFields;
