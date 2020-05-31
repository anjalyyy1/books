import React from 'react';
import styled from 'styled-components';
import Modal from 'components/modal';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { map, get } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
  formControl: {
    display: 'block',
    width: '100%',
    marginBottom: '31px'
  },
  inputLabel: {
    width: '100%'
  },
  inputBox: {
    width: '100%',
    resize: 'none'
  },
  selectField: {
    width: '30%'
  },
  buttonClass: {
    backgroundColor: '#ffcd00',
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 20,
    '&:hover': {
      backgroundColor: '#f1d978'
    }
  }
});

const BookModal = props => {
  const classes = useStyles();

  let { authors } = props.getAuthors || {};

  let {
    showAuthorModal,
    handleInputChange,
    form,
    addAuthorHandler,
    resetFieldHandler
  } = props;

  return (
    <>
      <Modal closePopup={showAuthorModal}>
        <ModalContent>
          {map(Object.keys(form), eachField => {
            let { type } = form[eachField];

            const formField = (
              <>
                {type === 'input' && (
                  <FormControl
                    className={classes.formControl}
                    error={!!get(form[eachField], `error`)}
                  >
                    <InputLabel
                      htmlFor={form[eachField]}
                      className={classes.inputLabel}
                    >
                      {get(form[eachField], `label`)}
                    </InputLabel>
                    <Input
                      type={eachField === 'age' ? 'number' : 'text'}
                      id={(form[eachField], `label`)}
                      className={classes.inputBox}
                      value={get(form[eachField], `value`)}
                      onChange={e =>
                        handleInputChange({
                          key: eachField,
                          value: e.target.value
                        })
                      }
                      aria-describedby='component-error-text'
                    />
                    <FormHelperText id='component-error-text'>
                      {get(form[eachField], `error`)}
                    </FormHelperText>
                  </FormControl>
                )}
                {type === 'dropdown' && (
                  <FormControl
                    className={classes.formControl}
                    error={!!get(form[eachField], `error`)}
                  >
                    <InputLabel
                      id='demo-simple-select-error-label'
                      className={classes.inputLabel}
                    >
                      {get(form[eachField], `label`)}
                    </InputLabel>
                    <Select
                      className={classes.selectField}
                      id={(form[eachField], `label`)}
                      value={get(form[eachField], `value`)}
                      onChange={e => {
                        handleInputChange({
                          key: 'author',
                          value: e.target.value
                        });
                      }}
                    >
                      {map(authors, eachAuthor => {
                        return (
                          <MenuItem value={get(eachAuthor, `_id`)}>
                            {get(eachAuthor, `name`)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText id='component-error-text'>
                      {get(form[eachField], `error`)}
                    </FormHelperText>
                  </FormControl>
                )}
              </>
            );
            return formField;
          })}

          <Button
            variant='contained'
            className={classes.buttonClass}
            onClick={addAuthorHandler}
          >
            Save Author
          </Button>
          <Button
            variant='contained'
            className={classes.buttonClass}
            onClick={resetFieldHandler}
          >
            Cancel
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

const ModalContent = styled.div`
  padding: 10px;
  margin: 0 auto;

  .MuiFormControlLabel-label {
    color: rgba(0, 0, 0, 0.54);
  }
`;

export default BookModal;
