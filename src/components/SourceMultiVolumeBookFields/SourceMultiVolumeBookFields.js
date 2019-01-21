import React from 'react';
import { Field } from 'redux-form';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import * as validate from '~/utils/validate';

const SourceMultiVolumeBookFields = () => {
  return (
    <React.Fragment>
      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="lastname" className="form__label">
              Фамилия автора <ReqMark />
            </label>
            <Field name="lastname" id="lastname" className="text-field_white" component={ TextField }
                   placeholder="Введите фамилию автора" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="initials" className="form__label">
              Инициалы автора <ReqMark />
            </label>
            <Field name="initials" id="initials" className="text-field_white" component={ TextField }
                   placeholder="Введите инициалы автора" validate={ [validate.required] } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <label htmlFor="original_part_name" className="form__label">
          Название части/тома оригинальное <ReqMark />
        </label>
        <Field name="original_part_name" id="original_part_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="second_part_name" className="form__label">
          Название части/тома английском
        </label>
        <Field name="second_part_name" id="second_part_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" />
      </div>

      <div className="form__field">
        <label htmlFor="original_source_name" className="form__label">
          Название на языке оригинала
        </label>
        <Field name="original_name" id="original_source_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" />
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
          <div className="form__col form__col_6">
            <label htmlFor="source_issue" className="form__label">
              Издательство <ReqMark />
            </label>
            <Field name="issue" id="source_issue" className="text-field_white" component={ TextField }
                   placeholder="Введите Издательство" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="source_issue_city" className="form__label">
              Город издания <ReqMark />
            </label>
            <Field name="issue_city" id="source_issue_city" className="text-field_white" component={ TextField }
                   placeholder="Введите город" validate={ [validate.required] } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="source_issue_year" className="form__label">
              Год издания <ReqMark />
            </label>
            <Field name="issue_year" id="source_issue_year" className="text-field_white" component={ TextField }
                   placeholder="Введите название" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="page_count" className="form__label">
              Количество стр. <ReqMark />
            </label>
            <Field name="page_count" id="page_count" className="text-field_white" component={ TextField }
                   placeholder="0 стр." validate={ [validate.required] } />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SourceMultiVolumeBookFields;
