// // import React, { useState } from 'react';
// // import { postFile } from '../services/fileServices';

// // const ImportContacts = () => {
// //     const [message, setMessage] = useState('');

// //     const handleFileUpload = async (event) => {
// //       const file = event.target.files[0];
// //       const reader = new FileReader();
  
// //       reader.onload = async (e) => {
// //         const content = e.target.result;
  
// //         try {
// //           const response = await postFile(content);
// //           setMessage(response.data.message);
// //         } catch (error) {
// //           setMessage('Error uploading file');
// //         }
// //       };
  
// //       reader.readAsText(file);
// //     };
// //   return (
// //     <div>
// //       <h2>Import VCF File</h2>
// //       <input type="file" onChange={handleFileUpload} accept=".vcf" />
// //       {message && <p>{message}</p>}
// //     </div>
// //   );
// // };

// // export default ImportContacts;


// import React, { useState } from 'react';
// import { postFile } from '../services/fileServices';

// const ImportContacts = () => {
//     const [message, setMessage] = useState('');

//     const handleFileUpload = async (event) => {
//       const file = event.target.files[0];
//       const reader = new FileReader();
  
//       reader.onload = async (e) => {
//         const content = e.target.result;
  
//         try {
//           const response = await postFile(content);
//           setMessage(response.data.message);
//         } catch (error) {
//           setMessage('Error uploading file: ' + error.message);
//         }
//       };
  
//       reader.readAsText(file);
//     };

//     return (
//         <div>
//             <h2>Import VCF File</h2>
//             <input type="file" onChange={handleFileUpload} accept=".vcf" />
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default ImportContacts;

import React, { useState } from 'react';
import { postFile } from '../services/fileServices';
import toast from 'react-hot-toast';

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
            {vcfContent && <pre>{vcfContent}</pre>}
            <button onClick={printContacts} disabled={contacts.length === 0}>
                Print Contacts to Console
            </button>
        </div>
    );
};

export default ImportContacts;

