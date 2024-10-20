import React from 'react';
import { Input, Button, Typography, CardBody } from "@material-tailwind/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { putContact } from '../services/contactServices';
import toast from 'react-hot-toast';

const EditContact = ({ contact, onEditContact, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      name: contact.name,
      mobileNumber: contact.phone,
      email: contact.email,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      mobileNumber: Yup.string().matches(/^\d{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: async (values) => {
        const id = contact._id;
        const name = values.name.trim();
        const phone = values.mobileNumber.trim();
        const email = values.email.trim();

        try {
            await toast.promise(
                putContact({id, name, phone, email }),
                {
                    loading: 'Loading...',
                    success: (response) => {
                        const data = response.data;
                        console.log(data);
                        onEditContact();
                        return 'Contact updated successfully.';

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
    <CardBody color="transparent" shadow={false} className="mb-4">
      <Typography variant="h4" color="blue-gray">
        Edit Contact
      </Typography>
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <div className="flex gap-5">
          <div className="mb-4 flex-1">
            <Input
              size="lg"
              label="Name"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 mt-1">{formik.errors.name}</div>
            )}
          </div>
          <div className="mb-4 flex-1">
            <Input
              size="lg"
              label="Mobile Number"
              {...formik.getFieldProps('mobileNumber')}
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber && (
              <div className="text-red-500 mt-1">{formik.errors.mobileNumber}</div>
            )}
          </div>
          <div className="mb-4 flex-1">
            <Input
              size="lg"
              label="Email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button color="red" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" color="green">
            Save Changes
          </Button>
        </div>
      </form>
    </CardBody>
  );
};

export default EditContact;
