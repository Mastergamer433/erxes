import _ from 'underscore';
import React, { PropTypes } from 'react';

import Field from './Field';
import { SUCCESS, INITIAL } from '../constants';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldValueChange = this.onFieldValueChange.bind(this);

    this.state = { doc: this.resetDocState() };
  }

  componentWillUpdate(nextProps) {
    const currentStatus = this.props.currentStatus.status;
    const nextStatus = nextProps.currentStatus.status;

    // after successfull save and create new button, reset doc state
    if ((currentStatus !== nextStatus) && nextStatus === INITIAL) {
      this.setState({ doc: this.resetDocState() });
    }
  }

  // after any field value change, save it's value to state
  onFieldValueChange({ fieldId, value }) {
    const doc = this.state.doc;

    doc[fieldId].value = value;

    this.setState({ doc });
  }

  onSubmit() {
    this.props.onSubmit(this.state.doc);
  }

  resetDocState() {
    const doc = {};

    _.each(this.props.form.fields, (field) => {
      doc[field._id] = { text: field.text, type: field.type, value: '' };
    });

    return doc;
  }

  renderFields() {
    const { form, currentStatus } = this.props;
    const fields = form.fields;
    const errors = currentStatus.errors || [];

    return fields.map((field) => {
      const fieldError = errors.find(error => error.fieldId === field._id);

      return (
        <Field
          key={field._id}
          field={field}
          error={fieldError}
          onChange={this.onFieldValueChange}
        />
      );
    });
  }

  renderForm() {
    const { form } = this.props;

    return (
      <div>
        <h3>{form.title}</h3>
        {this.renderFields()}

        <button
          type="button"
          onClick={this.onSubmit}
          className="btn btn-success"
        >
          Submit
        </button>
      </div>
    );
  }

  renderSuccessForm() {
    const { form, onCreateNew } = this.props;

    return (
      <div>
        <h3>{form.title}</h3>

        Thanks

        <button onClick={onCreateNew}>create new</button>
      </div>
    );
  }

  render() {
    const { currentStatus } = this.props;

    if (currentStatus.status === SUCCESS) {
      return this.renderSuccessForm();
    }

    return this.renderForm();
  }
}

Form.propTypes = {
  form: PropTypes.shape({
    title: PropTypes.string,

    fields: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      check: PropTypes.string,
      text: PropTypes.string,
      description: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
      isRequired: PropTypes.bool,
      order: PropTypes.number,
    })),
  }),

  currentStatus: PropTypes.shape({
    status: PropTypes.string,
  }),

  onSubmit: PropTypes.func,
  onCreateNew: PropTypes.func,
};
