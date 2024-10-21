import React, { useState } from 'react';
import { postFile } from '../services/fileServices';
import toast from 'react-hot-toast';
import { Button } from '@material-tailwind/react';

const ImportContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [vcfContent, setVcfContent] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            setVcfContent(content);
            parseVCF(content);
        };

        reader.readAsText(file);
    };

    const parseVCF = (content) => {
        const parsedContacts = [];
        const entries = content.split('END:VCARD');

        entries.forEach(entry => {
            if (entry.trim()) {
                const contact = {};
                const lines = entry.split('\n');

                lines.forEach(line => {
                    const [key, ...valueParts] = line.split(':');
                    const value = valueParts.join(':').trim();

                    if (key === 'FN') {
                        contact.name = value;
                    } else if (key === 'EMAIL') {
                        contact.email = value;
                    } else if (key.startsWith('TEL')) {
                        contact.phone = value;
                    }
                });

                if (contact.name || contact.email || contact.phone) {
                    parsedContacts.push(contact);
                }
            }
        });

        setContacts(parsedContacts);
    };

    const printContacts = async () => {
        try {
            await toast.promise(
                postFile(contacts),
                {
                    loading: 'Loading...',
                    success: (response) => {
                        const data = response.data;
                        console.log(data);
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
    };

    return (
        <div>
            <input type="file" accept=".vcf" onChange={handleFileChange} />
            <Button color="blue" onClick={printContacts} disabled={contacts.length === 0}>
                Submit
            </Button>
        </div>
    );
};

export default ImportContacts;

