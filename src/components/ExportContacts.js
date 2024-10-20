// // // import React from 'react';
// // // import { getFiles } from '../services/fileServices';

// // // const ExportContacts = () => {
// // //     const handleDownload = async () => {
// // //         try {
// // //           const response = await getFiles();
    
// // //           const url = window.URL.createObjectURL(new Blob([response.data]));
// // //           const link = document.createElement('a');
// // //           link.href = url;
// // //           link.setAttribute('download', 'contacts.vcf');
// // //           document.body.appendChild(link);
// // //           link.click();
// // //         } catch (error) {
// // //           console.error('Error downloading VCF file', error);
// // //         }
// // //       };
    

// // //   return (
// // //     <div>
// // //       <h2>Export VCF File</h2>
// // //       <button onClick={handleDownload}>Download Contacts</button>
// // //     </div>
// // //   );
// // // };

// // // export default ExportContacts;

// // import React from 'react';
// // import { getFiles } from '../services/fileServices';
// // import { getContacts } from '../services/contactServices';

// // const ExportContacts = () => {
// //     const handleDownload = async () => {

// //       const response = await getContacts();

// //       console.log(response.data.message);
      
// //         // try {
// //         //     const response = await getFiles();
    
// //         //     const url = window.URL.createObjectURL(new Blob([response.data]));
// //         //     const link = document.createElement('a');
// //         //     link.href = url;
// //         //     link.setAttribute('download', 'contacts.vcf');
// //         //     document.body.appendChild(link);
// //         //     link.click();
// //         //     link.remove();
// //         // } catch (error) {
// //         //     console.error('Error downloading VCF file', error);
// //         // }
// //     };
    

// //     return (
// //         <div>
// //             <h2>Export VCF File</h2>
// //             <button onClick={handleDownload}>Download Contacts</button>
// //         </div>
// //     );
// // };

// // export default ExportContacts;

// import React from 'react';
// import VCF from 'vcf';

// const contacts = [
//   {
//     name: "shruti",
//     email: "het@gmail.com",
//     phone: "9876543210"
//   },
//   {
//     name: "het",
//     email: "het@gmail.com",
//     phone: "9876543210"
//   },
//   {
//     name: "gaural",
//     email: "het@gmail.com",
//     phone: "7894561230"
//   }
// ];

// const ExportContacts = () => {
//   const downloadVCF = () => {
//     const vcf = new VCF();

//     contacts.forEach(contact => {
//       vcf.add('FN', contact.name);   // Full Name
//       vcf.add('EMAIL', contact.email);
//       vcf.add('TEL', contact.phone);
//     });

//     const vcfContent = vcf.toString();

//     // Create a Blob and trigger download
//     const blob = new Blob([vcfContent], { type: 'text/vcard' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'contacts.vcf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div>
//       <button onClick={downloadVCF}>Download VCF</button>
//     </div>
//   );
// };

// export default ExportContacts;

import React from 'react';
import { getContacts } from '../services/contactServices';

const App = () => {
  const downloadVCF = async () => {

      const response = await getContacts();
      const contacts = response.data.message;

      console.log(response.data.message);

    let vcfContent = '';

    // Generate vCard content manually for each contact
    contacts.forEach(contact => {
      vcfContent += `BEGIN:VCARD\n`;
      vcfContent += `VERSION:3.0\n`;
      vcfContent += `FN:${contact.name}\n`;
      vcfContent += `EMAIL:${contact.email}\n`;
      vcfContent += `TEL:${contact.phone}\n`;
      vcfContent += `END:VCARD\n`;
    });

    // Create a Blob and trigger download
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
      <button onClick={downloadVCF}>Download VCF</button>
    </div>
  );
};

export default App;


