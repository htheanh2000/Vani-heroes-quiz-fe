"use client"
import type { NextPage } from 'next';
import Button from '@/components/button';
import { useAppDispatch } from '@/store/store';
import { signIn } from '@/store/features/user/userSlice';
import * as Yup from 'yup'
import { Form, Formik } from 'formik';
import Field from '@/components/form/field';
const SignInPage: NextPage = () => {

  const dispatch = useAppDispatch();

  const initialValues = {
    phonenumber: "",
    password: "",
  };

  const validationSchema = Yup.object({
    phonenumber: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(false);
    dispatch(signIn(values))
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-md">
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-8">Sign In</h2>
                <Field
                  label="phone number"
                  placeholder="eg: 0782778712"
                  name="phonenumber"
                  className="mt-8"
                ></Field>
                <Field
                  label="password"
                  name="password"
                  type="password"
                  className="mt-8"
                ></Field>

                <Button
                  type="submit"
                  className="mt-8 w-full mx-auto"
                >
                  Sign in
                </Button>

                <p className="text-xs text-center text-gray mt-6">
                    By continuing, you agree to the <strong>Terms of Services & Privacy Policy.</strong>
                </p>
              </Form>
            )}
          </Formik>
      </div>
    </div>
  );
};

export default SignInPage;
