import { Form, Formik } from 'formik';
import { validationSchema, defaultValues } from './formikConfig';

import ReactDOM from 'react-dom';
import FormField from '../FormField/FormField';

const Backdrop = props => {
  return <div className="backdrop" onClick={props.onConfirm} />;
};

const ModalOverlay = props => {
  return (
    <div className="code-modal code-form">
      <section className="modal-main">
        <Formik
          onSubmit={props.onSubmit}
          validateOnMount={true}
          initialValues={defaultValues}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <FormField name="filename" label="Name of the file" />
              <FormField as="select" name="language" label="Language">
                <option value="c">c</option>
                <option value="cpp">cpp</option>
                <option value="css">css</option>
                <option value="java">java</option>
                <option value="javascript">javascript</option>
                <option value="json">json</option>
                <option value="jsx">jsx</option>
                <option value="python">python</option>
                <option value="solidity">solidity</option>
                <option value="sql">sql</option>
              </FormField>
              <FormField
                as="textarea"
                name="codes"
                label="Type/Paste your code here"
                rows="12"
                cols="100"
                spellCheck="false"
              />
              <div className="code-form-buttons">
                <button type="button" onClick={props.onConfirm}>
                  Cancel
                </button>
                <button
                  onClick={props.onConfirm}
                  type="button"
                  disabled={!isValid || isSubmitting}
                >
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};

const CodeModal = props => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root'),
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root'),
      )}
    </>
  );
};

export default CodeModal;
