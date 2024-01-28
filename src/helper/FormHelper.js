class FormHelper {
  UserIdValidation(value) {
    // Check if the value matches either of the valid formats
    const format1Regex = /^[0-9]{3}-[0-9]{2}-[0-9]{1,}$/; // Allow one or more digits after the second hyphen
    const format2Regex = /^[0-9]{16}$/; // 16-digit number

    return format1Regex.test(value) || (format2Regex.test(value) && parseInt(value, 10) <= 2600000000000000);
  }
}

export const { UserIdValidation } = new FormHelper();
