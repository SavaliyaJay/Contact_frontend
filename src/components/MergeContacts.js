import React, { useEffect, useState } from 'react';
import { getDuplicateContacts, mergeContacts } from '../services/contactServices';
import toast from 'react-hot-toast';
import { Button } from '@material-tailwind/react';

const MergeContacts = () => {
  const [main, setMain] = useState([]); 
  const [selectedContacts, setSelectedContacts] = useState({});
  const fetchDuplicateContacts = async () => {
    try {
      const response = await getDuplicateContacts();
      const data = await response.data;

      if (Array.isArray(data)) {
        setMain(data);
      } else {
        console.error('Expected data to be an array:', data);
        setMain([]);
      }
    } catch (error) {
      console.error('Error fetching duplicate contacts:', error);
      toast.error('Failed to fetch contacts.');
    }
  };

  useEffect(() => {
    fetchDuplicateContacts();
  }, []);

  const handleContactSelect = (index, groupId) => {
    setSelectedContacts((prevSelected) => {
      const newSelected = { ...prevSelected };
      const contactId = main[groupId].duplicates[index].id; 
      console.log('Selected contact ID:', contactId);

      newSelected[groupId] = contactId;
      return newSelected;
    });
  };

  const handleMerge = async () => {
    const unselectedContactIds = [];

    Object.keys(selectedContacts).forEach((groupIndex) => {
      const selectedId = selectedContacts[groupIndex];

      if (selectedId) {
        const item = main[groupIndex]; 
        item.duplicates.forEach((contact) => {
          if (contact.id !== selectedId) {
            unselectedContactIds.push(contact.id);
          }
        });
      }
    });

    console.log('Unselected contact IDs:', unselectedContactIds);
    try {
      await toast.promise(
        mergeContacts(unselectedContactIds),
        {
          loading: 'Loading...',
          success: (response) => {
            return 'Contacts merged successfully.';
          },
          error: (error) => {
            return `${error.response.data.message || error.message}`;
          },
        }
      );
      fetchDuplicateContacts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Merge Contacts</h2>
      <div className="flex-wrap flex">
        {main.length === 0 ? (
          <p>No duplicate contacts found.</p>
        ) : (
          main.map((item, groupIndex) => (
            <div key={groupIndex}>
              <h3>Duplicate No. {groupIndex + 1}</h3>
              {groupIndex > 0 && <br />}
              {item.duplicates.map((contact, contactIndex) => (
                <div key={`${groupIndex}-${contactIndex}`} className="border p-4 m-2">
                  <input
                    type="radio"
                    name={`group-${groupIndex}`} 
                    onChange={() => handleContactSelect(contactIndex, groupIndex)}
                    checked={selectedContacts[groupIndex] === contact.id} 
                  />
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                  <p>{contact.phone}</p>
                </div>
              ))}
              <Button color="blue" onClick={handleMerge} className="mt-3 p-3 bg-blue-500 text-white">
                Merge
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MergeContacts;
