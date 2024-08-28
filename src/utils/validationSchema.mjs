export const validationSchemas = {
  filter: {
    isString: {
      errorMessage: "The filter must be a string",
    },
    notEmpty: {
      errorMessage: "The filter must not be empty",
    },
    isLength: {
      min: 1,
      max: 30,
    },
  },
  value: {
    isString: {
      errorMessage: "The value must be a string",
    },
    notEmpty: {
      errorMessage: "The value must not be empty",
    },
    isLength: {
      min: 1,
      max: 10,
    },
  },
};
