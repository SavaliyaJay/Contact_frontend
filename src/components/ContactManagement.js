import React, { useState } from 'react';
import { Button, Card, Typography } from "@material-tailwind/react";
import AddContact from './AddContact';
import EditContact from './EditContact';
import DeleteContact from './DeleteContact';

const ContactManagement = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const addContact = (newContact) => {
        setContacts([...contacts, { ...newContact, id: Date.now() }]);
        setShowAddForm(false);
    };

    const editContact = (updatedContact) => {
        setContacts(contacts.map(contact =>
            contact.id === updatedContact.id ? updatedContact : contact
        ));
        setShowEditForm(false);
        setSelectedContact(null);
    };

    const deleteContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
        setShowDeleteForm(false);
        setSelectedContact(null);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <Button color="blue" onClick={() => setShowAddForm(true)}>
                    Add Contact
                </Button>
            </div>

            {showAddForm && (
                <AddContact onAddContact={addContact} onCancel={() => setShowAddForm(false)} />
            )}

            {showEditForm && selectedContact && (
                <EditContact
                    contact={selectedContact}
                    onEditContact={editContact}
                    onCancel={() => setShowEditForm(false)}
                />
            )}

            {showDeleteForm && selectedContact && (
                <DeleteContact
                    contact={selectedContact}
                    onDeleteContact={deleteContact}
                    onCancel={() => setShowDeleteForm(false)}
                />
            )}

            <Card className="overflow-scroll h-full w-full" style={{marginTop:"3rem"}}>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Name
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Mobile Number
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Email
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Actions
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contact.name}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contact.mobileNumber}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contact.email}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Button
                                        color="green"
                                        size="sm"
                                        className="mr-2"
                                        onClick={() => {
                                            setSelectedContact(contact);
                                            setShowEditForm(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="red"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedContact(contact);
                                            setShowDeleteForm(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default ContactManagement;