import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Books from './index';
import { getAuthors, addBookMutation, getBooksQuery } from './queries';
import { flowRight as compose } from 'lodash';
import { each } from 'lodash';
import ValidationUtils from 'utils/ValidationUtils';

const UI_STRINGS = {
  EMPTY_FIELD_ERROR_MESSAGE: 'This field is required.',
  SPECIAL_CHAR_ERROR_MESSAGE: 'Please do not enter the special character.',
  WHITE_SPACE_ERROR_MESSAGE: 'Please enter a valid input.'
};

class BooksPage extends Component {
  state = {
    isShowModal: false,
    form: {
      bookName: { value: '', error: '', label: 'Book Name', type: 'input' },
      genre: { value: '', error: '', label: 'Genre', type: 'input' },
      addAuthor: { value: '', label: 'Add an Author', type: 'checkbox' },
      author: {
        value: '',
        error: '',
        label: 'Choose an existing author',
        type: 'dropdown'
      },
      price: { value: '', error: '', label: 'Price', type: 'input' },
      description: { value: '', error: '', label: 'Author', type: 'textarea' }
    }
  };

  handleValidation = (key, value) => {
    if (key === 'addAuthor') return;

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

    if (key === 'addAuthor') {
      this.props.history.push('/authors');
    }

    form[key].error = this.handleValidation(key, value);

    this.setState({
      form
    });
  };

  addBookHandler = async () => {
    let { addBookMutation } = this.props;
    //TODO form validation

    let { form } = this.state;

    each(form, eachField => {
      eachField.error = this.handleValidation(eachField, eachField.value);
    });

    this.setState({
      form
    });

    // await addBookMutation({
    //   variables: {
    //     name: form.bookName.value,
    //     genre: form.genre.value,
    //     authorId: form.author.value,
    //     description: form.description.value,
    //     price: form.price.value
    //   },
    //   refetchQueries: [
    //     {
    //       query: getBooksQuery
    //     }
    //   ]
    // });

    // this.showBookAddModal();
    // this.resetFieldHandler();
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

  componentDidMount() {}

  showBookAddModal = () => {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  };

  onBookClickHandler = selectedBookId => {
    this.props.history.push(`/book/${selectedBookId}`);
  };

  render() {
    const stateMethodProp = {
      ...this,
      ...this.state,
      ...this.props
    };
    return <Books {...stateMethodProp} />;
  }
}

export default compose(
  graphql(addBookMutation, {
    name: 'addBookMutation'
  }),
  graphql(getAuthors, {
    name: 'getAuthors'
  }),
  graphql(getBooksQuery, {
    name: 'getBooksQuery'
  })
)(BooksPage);
