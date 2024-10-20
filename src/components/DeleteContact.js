import React from 'react';
import { Button, Typography, CardBody } from "@material-tailwind/react";

const DeleteContact = ({ contact, onDeleteContact, onCancel }) => {
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
        <Button color="red" onClick={() => onDeleteContact(contact.id)}>
          Delete
        </Button>
      </div>
    </CardBody>
  );
};

export default DeleteContact;