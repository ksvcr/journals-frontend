import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ContentBlock from '~/components/ContentBlock/ContentBlock';

import './content-block-list.scss';

class ContentBlockList extends Component {
  state = {
    editableIndex: null
  };

  handleEditableSet = (index) => {
    this.setState({
      editableIndex: index
    });
  };

  handleAdd = () => {
    const { fields }  = this.props;
    const initialValues = {
      title: 'Заголовок поля'
    };
    fields.insert(fields.length-1, initialValues);
  };

  handleRemove = (index) => {
    const { fields }  = this.props;
    fields.remove(index);
  };

  render() {
    const { fields, formName } = this.props;
    const { editableIndex } = this.state;
    return (
      <div className="content-block-list">
        <ReactCSSTransitionGroup transitionName="fade"
                                 transitionEnterTimeout={ 400 }
                                 transitionLeaveTimeout={ 200 } >
          {
            fields.map((field, index) => {
              const data = fields.get(index);
              return (
                <ContentBlock key={ index } formName={ formName } data={ data } field={ field }
                              fields={ fields } index={ index } isEditable={ editableIndex === index }
                              onEdit={ this.handleEditableSet } onAdd={ this.handleAdd } onRemove={ this.handleRemove } />
              );
            })
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default ContentBlockList;
