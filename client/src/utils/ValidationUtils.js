/**
 * Validate Text
 */

class ValidationUtils {
  checkIfspecialChar = value => {
    let regex = /[\\/=?`<>]/g;
    return regex.test(value);
  };

  checkIfEmptyField = value => {
    let re = /^$/;
    return re.test(value);
  };

  checkIfWhiteSpace = value => {
    if (typeof value !== 'number' && value && value.trim().length === 0) {
      let re = /^\s/;
      return re.test(value);
    }
  };

  validateNumber = value => {
    let re = /^[0-9]*$/;
    return re.test(value);
  };

  validateFloatNumber = value => {
    let re = /^(\d*\.)?\d+$/gim;
    return re.test(value);
  };
}

export default new ValidationUtils();
