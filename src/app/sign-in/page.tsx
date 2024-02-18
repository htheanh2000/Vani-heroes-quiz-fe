"use client"
import type { NextPage } from 'next';
import Button from '@/components/button';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { signIn } from '@/store/features/user/userSlice';
import * as Yup from 'yup'
import { Form, Formik } from 'formik';
import Field from '@/components/form/field';
import Error from "@/components/form/error";
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearUserState } from "@/store/features/user/userSlice";

const SignInPage: NextPage = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const initialValues = {
    phonenumber: "",
    password: "",
  };

  const {username, status, error } = useAppSelector((state) => state.user);


  const validationSchema = Yup.object({
    phonenumber: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
  });

  const onSubmit = (values: any, { setSubmitting }: any) => {
    if(status === "loading") {
      return;
    }
    setSubmitting(false);
    dispatch(signIn(values))
  };

  useEffect(() => {
    dispatch(clearUserState())
  },[dispatch])


  useEffect(() => {
    const token =  localStorage.getItem('access_token') ;
    if (token) {
      router.push("/quiz");
    }
  }, [router, dispatch,status]);

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

                <Error>{error}</Error>
                
                <Button
                loading={status === 'loading'}

                  type="submit"
                  className="mt-8 w-full mx-auto"
                >
                  Sign in
                </Button>

                <Link href='sign-up'>
                    <p className="font-medium my-4 text-center text-primary">Doesn't have account ?</p>
                    </Link>
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
