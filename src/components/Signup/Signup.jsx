import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Formik, Form } from 'formik';
import { defaultValues, validationSchema } from './formikConfig';
import FormField from '../FormField/FormField';

const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const signUpHandler = ({ email, userName, password }, { setSubmitting }) =>
    console.log('Signing Up: ', email, userName, password);

  return (
    <div className="auth-form">
      <h1>Signup</h1>
      <Formik
        onSubmit={signUpHandler}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <FormField name="userName" label="Username" />
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />
            <FormField
              name="verifyPassword"
              label="Confirm Password"
              type="password"
            />

            <div className="auth-link-container">
              Already have an account?{' '}
              <span className="auth-link" onClick={() => history.push('login')}>
                Log In!
              </span>
            </div>

            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>

      {/* During server error during Firebase auth*/}
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

export default Signup;
