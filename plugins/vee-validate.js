import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required or your custom error message"
})
extend('positive', email => {
  if (email >= 0) {
    return true;
  }

  return 'This field must be a positive number';
})
extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
})
