import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { change } from 'redux-form';

import FieldSet from '~/components/FieldSet/FieldSet';
import FieldAddButton from '~/components/FieldAddButton/FieldAddButton';
import ArticleSource from '~/components/ArticleSource/ArticleSource';
import ArticleSourceCreateForm from '~/components/ArticleSourceCreateForm/ArticleSourceCreateForm';
import ArticleSourceTranslateItemForm from '~/components/ArticleSourceTranslateItemForm/ArticleSourceTranslateItemForm';

import getSourceTypes from '~/services/getSourceTypes';

class ArticleSourceList extends Component {
  getResourceTypeName = status => {
    const resourceTypes = getSourceTypes();
    const currentType = resourceTypes.find(item => item.value === status);
    return currentType.title;
  };

  handleAdd = () => {
    const { fields, initialValues } = this.props;
    fields.push(initialValues);
  };

  handleMove = ({ from, to }) => {
    const { fields } = this.props;
    fields.move(from, to);
  };

  handleRemove = index => {
    const { fields } = this.props;
    fields.remove(index);
  };

  handleFormSubmit = (field, data) => {
    const { formName, change } = this.props;
    change(formName, field, { ...data, isEdit: false });
  };

  handleEdit = (field, data) => {
    const { formName, change } = this.props;
    change(formName, field, { ...data, isEdit: true });
  };

  render() {
    const { fields, legend, addText, isCorrector, isTranslator } = this.props;

    const fieldSetParams = {
      onRemove: !isTranslator && this.handleRemove,
      onMove: !isTranslator && this.handleMove
    };

    return (
      <div className="article-source-list">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={ 400 }
          transitionLeaveTimeout={ 200 }
        >
          {fields.map((field, index) => {
            const data = fields.get(index);
            const { isEdit, hash } = data;
            return (
              <React.Fragment key={ index }>
                {isEdit ? (
                  <FieldSet
                    fieldsTitle={
                      isTranslator &&
                      this.getResourceTypeName(data.resourcetype)
                    }
                    isLast={ index === fields.length - 1 }
                    index={ index }
                    legend={ `${legend} №${index + 1}` }
                    { ...fieldSetParams }
                  >
                    {isTranslator ? (
                      <ArticleSourceTranslateItemForm
                        formName={ `source-translate[${hash}]` }
                        data={ data }
                        field={ field }
                        index={ index }
                        onSubmit={ this.handleFormSubmit }
                      />
                    ) : (
                      <ArticleSourceCreateForm
                        formName={ `source-create[${hash}]` }
                        data={ data }
                        field={ field }
                        onSubmit={ this.handleFormSubmit }
                      />
                    )}
                  </FieldSet>
                ) : (
                  <ArticleSource
                    index={ index }
                    field={ field }
                    data={ data }
                    onRemove={ !isTranslator && this.handleRemove }
                    onEdit={ this.handleEdit }
                  />
                )}
              </React.Fragment>
            );
          })}
        </ReactCSSTransitionGroup>

        {!isCorrector && addText && (
          <div className="field-set-list__button">
            <FieldAddButton onAdd={ this.handleAdd }>{addText}</FieldAddButton>
          </div>
        )}
      </div>
    );
  }
}

ArticleSourceList.defaultProps = {
  initialValues: {}
};

const mapDispatchToProps = {
  change
};

export default connect(
  null,
  mapDispatchToProps
)(ArticleSourceList);
