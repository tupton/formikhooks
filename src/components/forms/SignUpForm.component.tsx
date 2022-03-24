import React from 'react';
import { FormikHelpers, Formik, Form, Field, useFormikContext} from 'formik';
import { object, string, InferType } from 'yup';
/**
 * Yup validation schema to ensure all properties of the form
 * are valid before submission.
 * @see https://github.com/jquense/yup
 */
export const SignUpFormValidationSchema = object({
  email: string().required().email(),
  password: string().required(),
});

/**
 * Valid values for the signup form and their types
 */
export type SignUpFormValues = InferType<typeof SignUpFormValidationSchema>;

/**
 * React component properties and handlers
 */
export interface SignUpFormComponentProps {
  initialValues?: SignUpFormValues;
  onSubmit: (values: SignUpFormValues, helpers: FormikHelpers<SignUpFormValues>) => void;
}

/**
 * Inner form component
 */
const SignUpFormComponent = (): JSX.Element => {
  const {errors, touched, isSubmitting } = useFormikContext<SignUpFormValues>();
  return (<div>
    <h3>Sign Up Form</h3>
    <hr />
    <Form>
      <Field name="email" type="email" as="input"/>
      {errors.email && touched.email ? errors.email: null}
      <Field name="password" type="password" as="input" />
      {errors.password && touched.password ? errors.password : null}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      </Form>
  </div>)
};

/**
 * Wrap the inner component using <Formik> to be more like the current way we write forms
 */
const SignUpFormComponentNoHoc = ({onSubmit, initialValues}: SignUpFormComponentProps):  JSX.Element => {
  return (
    <Formik
      initialValues={{
        email: initialValues?.email || '',
        password: initialValues?.password || ''
      }}
      validationSchema={SignUpFormValidationSchema}
      onSubmit={onSubmit}
    >{() => (
      <SignUpFormComponent />  
    )}
    </Formik>
 );
}

export default SignUpFormComponentNoHoc;
