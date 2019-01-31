import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import FieldSet from '~/components/FieldSet/FieldSet';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';

import getSourceTypes from '~/services/getSourceTypes';
import * as validate from '~/utils/validate';

class ArticleSourceTranslateItemForm extends Component {
  state = { isEdit: false };

  getResourceTypeName = (status) => {
    const resourceTypes = getSourceTypes();
    const currentType = resourceTypes.find(item => item.value === status);
    return currentType.title;
  };

  getFields = (status) => {
    const standartParams = [{name: 'second_name', original: 'original_name', label: 'Название'}];

    switch (status) {
      case 'SourceThesis':
      case 'SourceOneVolumeBook':
      case 'SourceStandart':
        return [ ...standartParams ];

      case 'SourceArticleSerialEdition':
        return [ ...standartParams, {
          name: 'issue_english_title',
          original: 'issue_title',
          label: 'Название издания'
        }];

      case 'SourceMultiVolumeBook':
        return [ ...standartParams, {
          name: 'second_part_name',
          original: 'original_part_name',
          label: 'Название части/тома оригинальное'
        }];

      case 'SourceElectronic':
        return [ ...standartParams, {
          name: 'second_source_name',
          original: 'original_source_name',
          label: 'Название источника оригинальное'
        }];

      case 'SourceLegislativeMaterial':
        return [ ...standartParams, {
          name: 'adopted_authority_translate',
          original: 'adopted_authority',
          label: 'Принявший орган'
        }, {
          name: 'approval_authority_translate',
          original: 'approval_authority',
          label: 'Одобривший орган'
        }];

      case 'SourcePatent':
        return [{
          name: 'second_invention_title',
          original: 'invention_title',
          label: 'Название изобретения'
        }, {
          name: 'person_name_translate',
          original: 'person_name',
          label: 'ФИО персоны'
        }, {
          name: 'organization_name_translate',
          original: 'organization_name',
          label: 'Название организации'
        }, {
          name: 'publication_place_translate',
          original: 'publication_place',
          label: ' Где опубликован патент'
        }];

      default:
        return standartParams;
    }
  };

  renderFields = (source) => {
    const fields = this.getFields(source.resourcetype);

    return fields.map((field, index) => {
      let fieldName = field.name;
      let fieldValue = source[field.original];

      console.log(source[fieldName]);

      return (
        <div className="form__field" key={ index }>
          <label htmlFor={ fieldName } className="form__label">
            { field.label } <ReqMark />
          </label>

          <TextField className="text-field_preview text-field_dark" textarea value={ fieldValue } readOnly />
          <Field name={ fieldName } id={ fieldName } value={ source[fieldName] }
                 textarea component={ TextField } className="text-field_white"
                 placeholder="Введите перевод" validate={ [validate.required] } />
        </div>
      )
    })
  };

  handleSubmit = (formData) => {
    const { onSubmit } = this.props;
    onSubmit(formData);
  };

  render() {
    const { data, index, handleSubmit } = this.props;
    return (
      <FieldSet fieldsTitle={ this.getResourceTypeName(data.resourcetype) }
                legend={`Источник №${index + 1}`}>
        <form onSubmit={ handleSubmit(this.handleSubmit) }>
          { this.renderFields(data) }

          <div className="form__field">
            <Button type="submit">
              <Icon name="save" className="article-source-create-form__save-icon" />
              Сохранить
            </Button>
          </div>
        </form>
      </FieldSet>
    );
  }
}

ArticleSourceTranslateItemForm = reduxForm()(ArticleSourceTranslateItemForm);

function mapStateToProps(state, props) {
  const { formName, data } = props;
  const formSelector = formValueSelector(formName);
  const resourceType = formSelector(state, 'resourcetype');

  return {
    form: formName,
    resourceType,
    initialValues: {
      ...data
    },
  };
}

export default connect(mapStateToProps)(ArticleSourceTranslateItemForm);
