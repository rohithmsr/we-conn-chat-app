import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { fb } from '../../service';
import { Formik, Form } from 'formik';
import { defaultValues, validationSchema } from './formikConfig';
import FormField from '../FormField/FormField';

const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const signUpHandler = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res?.user?.uid) {
          fetch('/api/createUser', {
            method: 'POST',
            body: JSON.stringify({
              userName,
              userId: res.user.uid,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(() => {
              fb.firestore
                .collection('chatUsers')
                .doc(res.user.uid)
                .set({ userName, avatar: '' });
            })
            .catch(err => {
              // delete user from fb, even not created in chat!
              const user = fb.auth.currentUser;

              user
                .delete()
                .then(() => {
                  console.log('Successfully deleted user');
                })
                .catch(error => {
                  console.log('Error deleting user:', error);
                });

              throw new Error(
                `We're having trouble signing you up for connection. Please try again.`,
              );
            });
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again.",
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('An account with this email already exists');
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again.",
          );
        }
      })
      .finally(() => setSubmitting(false));
  };

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
      {!!serverError && <div className="error server-error">{serverError}</div>}
    </div>
  );
};

export default Signup;
