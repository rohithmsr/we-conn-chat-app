import { ErrorMessage, Field } from 'formik';

const FormField = ({ name, label, as = 'input', type = 'text', ...rest }) => (
  <label>
    {label}
    <Field as={as} name={name} type={type} {...rest} />
    <ErrorMessage className="error" component="div" name={name} />
  </label>
);

export default FormField;
