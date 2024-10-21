import React from 'react';
import { getContacts } from '../services/contactServices';
import { Button } from '@material-tailwind/react';

const App = () => {
  const downloadVCF = async () => {

      const response = await getContacts();
      const contacts = response.data.message;

      console.log(response.data.message);

    let vcfContent = '';

    contacts.forEach(contact => {
      vcfContent += `BEGIN:VCARD\n`;
      vcfContent += `VERSION:3.0\n`;
      vcfContent += `FN:${contact.name}\n`;
      vcfContent += `EMAIL:${contact.email}\n`;
      vcfContent += `TEL:${contact.phone}\n`;
      vcfContent += `END:VCARD\n`;
    });

    const blob = new Blob([vcfContent], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contacts.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Button color="blue" onClick={downloadVCF}>Download VCF</Button>
    </div>
  );
};

export default App;


