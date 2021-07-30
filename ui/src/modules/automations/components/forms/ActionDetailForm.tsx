import { __ } from 'modules/common/utils';
import React from 'react';
import { ModalFooter } from 'modules/common/styles/main';
import Button from 'modules/common/components/Button';
import { IAction, ITrigger } from 'modules/automations/types';

import { IField } from 'modules/settings/properties/types';
import FieldConditions, { IActionCondition } from './FieldConditions';
import { ActionForms } from './actions';

type Props = {
  closeModal: () => void;
  addActionConfig: (value: any) => void;
  closeParentModal?: () => void;
  fetchFormFields: (
    formId: string,
    callback: (fields: IField[]) => void
  ) => void;
  currentAction: {
    trigger: ITrigger;
    action: IAction;
  };
  addAction: (value: string, contentId?: string) => void;
};

type State = {
  formFields?: IField[];
  queryLoaded: boolean;
  formFieldConditions?: IActionCondition;
};

class TriggerDetailForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      queryLoaded: false,
      formFields: []
    };
  }

  onSave = () => {
    const {
      closeParentModal,
      closeModal,
      addAction,
      currentAction,
      addActionConfig
    } = this.props;

    addAction(currentAction.action.type);

    addActionConfig(this.state.formFieldConditions);
    closeParentModal ? closeParentModal() : closeModal();
  };

  onChangeForm = option => {
    // this.setState({ activeFormId: option.value });
  };

  renderFormFields() {
    const { currentAction } = this.props;
    const fields = this.state.formFields || [];

    if (
      currentAction.action.type !== 'if' ||
      currentAction.trigger.type !== 'formSubmit'
    ) {
      return null;
    }

    // const onClickItem = () => {
    //   // if (onClick) {
    //   //   onClick(field);
    //   // }
    // };

    const onUpdateCondition = condition => {
      this.setState({ formFieldConditions: condition });
    };

    return (
      <FieldConditions fields={fields} onUpdateCondition={onUpdateCondition} />
    );
  }

  render() {
    const { currentAction, closeModal } = this.props;

    const { config = {} } = currentAction.trigger;

    if (
      !this.state.queryLoaded &&
      currentAction.action.type === 'if' &&
      currentAction.trigger.type === 'formSubmit' &&
      config &&
      config.contentId
    ) {
      const { fetchFormFields } = this.props;

      fetchFormFields(config.contentId, (fields: IField[]) => {
        if (fields) {
          this.setState({
            formFields: fields,
            queryLoaded: true
          });
        }
      });
    }

    const Content =
      ActionForms[currentAction.action.type] || ActionForms.default;

    return (
      <>
        {this.renderFormFields()}
        <Content action={currentAction.action} />
        <ModalFooter>
          <Button
            btnStyle="simple"
            type="button"
            onClick={closeModal}
            icon="times-circle"
          >
            {__('Cancel')}
          </Button>

          <Button btnStyle="success" icon="checked-1" onClick={this.onSave}>
            Save
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default TriggerDetailForm;
