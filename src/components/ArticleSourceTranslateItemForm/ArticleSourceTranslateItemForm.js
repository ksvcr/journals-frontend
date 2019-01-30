import React, { Component } from 'react';
import { Field } from 'redux-form';

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
    const standartParams = [{name: 'author', nestedName: 'lastname', label: 'Фамилия автора'},
      {name: 'author', nestedName: 'initials', label: 'Инициалы автора'},
      {name: 'original_name', label: 'Название'}];
    const issuesParams = [{ name: 'issue', label: 'Издательство' },
      { name: 'issue_city', label: 'Город издания'}];

    switch (status) {
      case 'SourceThesis':
        return [ ...standartParams, {
          name: 'defense_city',
          label: 'Город защиты'
        }];

      case 'SourceArticleSerialEdition':
        return [ ...standartParams, {
          name: 'issue_title',
          label: 'Название издания'
        }];

      case 'SourceOneVolumeBook':
        return [ ...standartParams, ...issuesParams ];

      case 'SourceMultiVolumeBook':
        return [ ...standartParams, {
          name: 'original_part_name',
          label: 'Название части/тома оригинальное'
        }, ...issuesParams ];

      case 'SourceElectronic':
        return [ ...standartParams, {
          name: 'original_source_name',
          label: 'Название источника оригинальное'
        }];

      case 'SourceLegislativeMaterial':
        return [{
          name: 'original_name',
          label: 'Название оригинальное'
        }, {
          name: 'adopted_authority',
          label: 'Принявший орган'
        }, {
          name: 'approval_authority',
          label: 'Одобривший орган'
        }, ...issuesParams ];

      case 'SourceStandart':
        return [{
          name: 'original_name',
          label: 'Название оригинальное'
        }, ...issuesParams ];

      case 'SourcePatent':
        return [{
          name: 'patent_classifier',
          label: 'Патентный классификатор'
        }, {
          name: 'invention_title',
          label: 'Название изобретения'
        }, {
          name: 'author',
          label: 'Автор'
        }, {
          name: 'person_name',
          label: 'ФИО персоны'
        }, {
          name: 'organization_name',
          label: 'Название организации'
        }, {
          name: 'publication_place',
          label: ' Где опубликован патент'
        }];

      default:
        return standartParams;
    }
  };

  renderFields = (source, number) => {
    const fields = this.getFields(source.resourcetype);

    return fields.map((field, index) => {
      let fieldName = field.name;
      let fieldValue = source[fieldName];

      if (field.nestedName) {
        fieldValue = source[field.name][field.nestedName];
        fieldName = `${field.name}.${field.nestedName}`;
      }

      return (
        <div className="form__field" key={ index }>
          <label htmlFor={ `sources[${number}].${fieldName}` } className="form__label">
            { field.label } <ReqMark />
          </label>

          <TextField className="text-field_preview text-field_dark" textarea value={ fieldValue } readOnly />
          <Field name={ `sources[${number}].${fieldName}` } id={ `sources[${number}].${fieldName}` }
                 textarea component={ TextField } className="text-field_white"
                 placeholder="Введите перевод" validate={ [validate.required] } />
        </div>
      )
    })
  };

  render() {
    const { item, index, onSubmit } = this.props;
    return (
      <FieldSet fieldsTitle={ this.getResourceTypeName(item.resourcetype) }
                legend={`Источник №${index + 1}`} key={ item.id }>
        { this.renderFields(item, index) }

        <div className="form__field">
          <Button type="submit" onClick={ onSubmit }>
            <Icon name="save" className="article-source-create-form__save-icon" />
            Сохранить
          </Button>
        </div>
      </FieldSet>
    );
  }
}

export default ArticleSourceTranslateItemForm;
