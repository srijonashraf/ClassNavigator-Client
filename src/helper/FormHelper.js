class FormHelper {
    UserIdValidation(value) {
      return /^[0-9]+(-[0-9]+)*$/.test(value);
    }
  }
  
  export const {
    UserIdValidation,
  } = new FormHelper();
  