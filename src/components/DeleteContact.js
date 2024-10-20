import React from 'react';
import { Button, Typography, CardBody } from "@material-tailwind/react";
import { deleteContact } from '../services/contactServices';
import toast from 'react-hot-toast';

const DeleteContact = ({ contact, onDeleteContact, onCancel }) => {

    async function handleDeleteContact() {
        try {
            await toast.promise(
                deleteContact(contact._id),
                {
                    loading: 'Loading...',
                    success: (response) => {
                        const data = response.data;
                        console.log(data);
                        onDeleteContact();
                        return 'Contact deleted successfully.';
                    },
                    error: (error) => {
                        return `${error.response.data.message || error.message}`;
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <CardBody color="transparent" shadow={false} className="mb-4">
      <Typography variant="h4" color="blue-gray">
        Delete Contact
      </Typography>
      <Typography color="gray" className="mt-2">
        Are you sure you want to delete the contact for {contact.name}?
      </Typography>
      <div className="flex justify-end gap-4 mt-4">
        <Button color="blue" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDeleteContact}>
          Delete
        </Button>
      </div>
    </CardBody>
  );
};

export default DeleteContact;