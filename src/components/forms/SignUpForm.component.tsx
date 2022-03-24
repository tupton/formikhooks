import React from 'react';
import { FormikHelpers, withFormik, FormikProps, FormikBag } from 'formik';
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
  onSubmit?: (values: SignUpFormValues, helper: FormikHelpers<SignUpFormValues>) => void;
}

/**
 * Inner form component
 * @param {FormikProps<SignUpFormValues>} props 
 * @returns 
 */
const SignUpFormComponent = (props: FormikProps<SignUpFormValues>): JSX.Element => {
  return (<div>
    <h3>Sign Up Form</h3>
    <hr />
    <form onSubmit={props.handleSubmit}>
      <input
        type="email"
        name="email"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.email}
      />
      {props.errors.email && props.touched.email && props.errors.email}
      <input
        type="password"
        name="password"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.password}
      />
      {props.errors.password && props.touched.password && props.errors.password}
      <button type="submit" disabled={props.isSubmitting}>
        Submit
      </button>
    </form>
  </div>)
};

export default withFormik<SignUpFormComponentProps, SignUpFormValues, SignUpFormValues>({
    validationSchema: SignUpFormValidationSchema,
    mapPropsToValues: (props: SignUpFormComponentProps): SignUpFormValues => {
      return {
        email: props.initialValues?.email || '',
        password: props.initialValues?.password || ''
      }
    },
    handleSubmit: (values: SignUpFormValues, helpers: FormikBag<SignUpFormComponentProps, SignUpFormValues>) => {
      helpers.props.onSubmit && helpers.props.onSubmit(values, helpers);
    }
  })
(SignUpFormComponent);