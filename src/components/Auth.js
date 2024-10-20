import React,{useEffect} from 'react'
import {
  Input,
  Button,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postLoggedInUserApi } from '../services/userServices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Auth = () => {

  const naviagte = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      naviagte('/dashboard');
    }
  },[])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().trim().required('email Id is required.'),
      password: Yup.string().trim().required('Password is required.'),
    }),

    onSubmit: async (values) => {
      const email = values.email.trim();
      const password = values.password.trim();
      try {
        await toast.promise(
          postLoggedInUserApi({ email, password }),
          {
            loading: 'Loading...',
            success: (response) => {
              const { accesssToken } = response.data;
              localStorage.setItem('token', accesssToken);

              if(accesssToken){
                naviagte('/dashboard');
              }
              
              return 'Logged in successfully.';
            },
            error: (error) => {
              return `${error.response.data.message || error.message}`;
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className="h-screen flex justify-center items-center">

        <CardBody color="transparent" shadow={false} >
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to login.
          </Typography>
          <form className="mt-8 mb-2 w-30" onSubmit={formik.handleSubmit}>
            <div className="mb-5 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}{...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-900 mt-1">{formik.errors.email}</div>
              ) : null}

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...formik.getFieldProps('password')}
              />

              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-900 mt-1">{formik.errors.password}</div>
              ) : null}

            </div>
            <div className="text-center" style={{marginTop:"1rem"}}>
              <Button type="submit">
                Sign In
              </Button>
            </div>


          </form>
        </CardBody>
      </div>
    </>
  )
}

export default Auth