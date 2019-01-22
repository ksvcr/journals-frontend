import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { change } from 'redux-form';


import FieldSet from '~/components/FieldSet/FieldSet';
import FieldAddButton from '~/components/FieldAddButton/FieldAddButton';
import ArticleSource from '~/components/ArticleSource/ArticleSource';
import ArticleSourceCreateForm from '~/components/ArticleSourceCreateForm/ArticleSourceCreateForm';

class ArticleSourceList extends Component {
  handleAdd = () => {
    const { fields, initialValues }  = this.props;
    fields.push(initialValues);
  };

  handleMove = ({ from, to }) => {
    const { fields } = this.props;
    fields.move(from, to);
  };

  handleRemove = (index) => {
    const { fields } = this.props;
    fields.remove(index);
  };

  handleSourceCreate = (field, data) => {
    const { formName, change } = this.props;
    change(formName, field, { ...data, isEdit: false });
  };

  handleEdit = (field, data) => {
    const { formName, change } = this.props;
    change(formName, field, { ...data, isEdit: true });
  };

  render() {
    const { fields, legend, addText, isCorrector } = this.props;
    return (
      <div className="article-source-list">
        <ReactCSSTransitionGroup transitionName="fade"
                                 transitionEnterTimeout={ 400 }
                                 transitionLeaveTimeout={ 200 } >
          {
            fields.map((field, index) => {
              const data = fields.get(index);
              const { isEdit, hash } = data;
              return (
                <React.Fragment key={ index }>
                  { isEdit ?
                    <FieldSet isLast={ index === fields.length - 1 } index={ index }
                              legend={`${legend} №${index + 1}`} onRemove={ this.handleRemove } onMove={ this.handleMove } >
                      <ArticleSourceCreateForm formName={ `source-create[${hash}]` } data={ data }
                                               field={ field } onSubmit={ this.handleSourceCreate }/>
                    </FieldSet> :
                    <ArticleSource index={ index } field={ field } data={ data }
                                   onRemove={ this.handleRemove } onEdit={ this.handleEdit } />
                  }
                </React.Fragment>
              )
            })
          }
        </ReactCSSTransitionGroup>

        {
          !isCorrector &&
          <div className="field-set-list__button">
            <FieldAddButton onAdd={ this.handleAdd }>
              { addText }
            </FieldAddButton>
          </div>
        }
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

export default connect(null, mapDispatchToProps)(ArticleSourceList);
