import * as Yup from 'yup';

export const defaultValues = {
  filename: '',
  codes: '',
  language: 'c',
};

export const validationSchema = Yup.object().shape({
  filename: Yup.string().required('Required'),
  codes: Yup.string().required('Required'),
});
