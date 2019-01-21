import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, getFormValues } from 'redux-form';

import CorrectFilesFormItem from '~/components/CorrectFilesFormItem/CorrectFilesFormItem';

import './correct-files-form.scss';

class CorrectFilesForm extends Component {
  handleChangeDescription = (fileId, description) => {
    const { change, formValues, formName } = this.props;
    const newAttachments = formValues.attachments.map(file => {
      if (file.id === fileId) {
        file.text_to_description = description;
      }

      return file;
    });
    change(formName, 'attachments', newAttachments);
  };

  renderItems = () => {
    const { formValues } = this.props;
    const { attachments } = formValues;
    return attachments.map((item, index) => {
      const showDivider = ++index < attachments.length;
      return (
        <React.Fragment key={ index }>
            <CorrectFilesFormItem
              file={ item }
              onChangeDescription={ this.handleChangeDescription }
              />
            {
              showDivider &&
              <hr className="correct-files-form__divider" />
            }
        </React.Fragment>
      );
    })
  };

  render() {
    return (
      <div className="correct-files-form">
        <ul className="correct-files-form__list">
          { this.renderItems() }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { formName } = props;

  return {
    formValues: getFormValues(formName)(state)
  };
}

const mapDispatchToProps = {
  change
};

export default connect(mapStateToProps, mapDispatchToProps)(CorrectFilesForm);
