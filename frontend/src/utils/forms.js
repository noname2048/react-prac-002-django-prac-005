export function parseErrorMessage(fieldsErrorMessages) {
  return Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errors]) => {
    // errors: ["m1", "m2"].jsoin("")
    acc[fieldName] = {
      validateStatus: "error",
      help: errors.join(" "),
    };
    return acc;
  }, {});
}
