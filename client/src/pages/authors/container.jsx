import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Authors from './index';
import { getAuthors, addAuthorMutation } from './queries';
import { flowRight as compose } from 'lodash';
import { each } from 'lodash';
import ValidationUtils from 'utils/ValidationUtils';

const UI_STRINGS = {
  EMPTY_FIELD_ERROR_MESSAGE: 'This field is required.',
  SPECIAL_CHAR_ERROR_MESSAGE: 'Please do not enter the special character.',
  WHITE_SPACE_ERROR_MESSAGE: 'Please enter a valid input.'
};

class AuthorsPage extends Component {
  state = {
    isShowModal: false,
    form: {
      authorName: { value: '', error: '', label: 'Author Name', type: 'input' },
      age: { value: '', error: '', label: 'Age', type: 'input' }
    }
  };

  handleValidation = (key, value) => {
    if (ValidationUtils.checkIfEmptyField(value)) {
      return UI_STRINGS.EMPTY_FIELD_ERROR_MESSAGE;
    } else if (ValidationUtils.checkIfWhiteSpace(value)) {
      return UI_STRINGS.WHITE_SPACE_ERROR_MESSAGE;
    } else if (ValidationUtils.checkIfspecialChar(value)) {
      return UI_STRINGS.WHITE_SPACE_ERROR_MESSAGE;
    }

    return null;
  };

  handleInputChange = ({ key, value }) => {
    let { form } = this.state;
    form[key].value = value;

    form[key].error = this.handleValidation(key, value);

    this.setState({
      form
    });
  };

  addAuthorHandler = async () => {
    let { addAuthorMutation } = this.props;
    let { form } = this.state;

    each(form, eachField => {
      eachField.error = this.handleValidation(eachField, eachField.value);
    });

    this.setState({
      form
    });

    await addAuthorMutation({
      variables: {
        name: form.authorName.value,
        age: Number(form.age.value)
      },
      refetchQueries: [
        {
          query: getAuthors
        }
      ]
    });

    this.showAuthorModal();
    this.resetFieldHandler();
  };

  resetFieldHandler = () => {
    let { form } = this.state;

    each(Object.keys(form), eachField => {
      form[eachField].value = '';
    });
    this.setState({
      form
    });
  };

  showAuthorModal = () => {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  };

  render() {
    const stateMethodProp = {
      ...this,
      ...this.state,
      ...this.props
    };

    console.log(stateMethodProp);
    return <Authors {...stateMethodProp} />;
  }
}

export default compose(
  graphql(getAuthors, {
    name: 'getAuthors'
  }),
  graphql(addAuthorMutation, {
    name: 'addAuthorMutation'
  })
)(AuthorsPage);
