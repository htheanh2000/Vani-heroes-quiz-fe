"use client";
import Button from "@/components/button";
import Field from "@/components/form/field";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import * as Yup from "yup";
import { signUp } from "@/store/features/user/userSlice";

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: user, status } = useAppSelector((state: { user: any; }) => state.user);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, status, router]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    phonenumber: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
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
        </section>
    </Fragment>
  );
};

export default SignUpPage;