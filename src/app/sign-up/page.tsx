"use client";
import Button from "@/components/button";
import Field from "@/components/form/field";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Error from "@/components/form/error";
import { Fragment, useEffect } from "react";
import * as Yup from "yup";
import { clearUserState, signUp } from "@/store/features/user/userSlice";

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { username, status, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(clearUserState())
  },[dispatch])
  
  useEffect(() => {
    const token =  localStorage.getItem('access_token') ;
    if (token) {
      router.push("/quiz");
    }
  }, [router, dispatch, status]);

  const initialValues = {
    username: "",
    phonenumber: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    phonenumber: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
  });

  const onSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(false);
    dispatch(signUp(values))
  };

  return (
    <Fragment>
        <section className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-8">Sign Up</h2>
                <Field
                  label="username"
                  placeholder="eg: Dwight"
                  name="username"
                ></Field>
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
                  type="submit"
                  className="mt-8 w-full mx-auto"
                  loading={status === 'loading'}

                >
                  Sign up
                </Button>

                <div className="mt-5 flex justify-center">
                    <span className="text-gray">Already have an account ? </span>
                    <Link href='sign-in'>
                    <span className="font-medium text-primary ml-2">Login</span>
                    </Link>
                </div>
                <p className="text-xs text-center text-gray mt-6">
                    By continuing, you agree to the <strong>Terms of Services & Privacy Policy.</strong>
                </p>
              </Form>
            )}
          </Formik>
        </section>
    </Fragment>
  );
};

export default SignUpPage;