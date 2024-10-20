import React, { useState } from 'react';
import ContactManagement from './ContactManagement';

const ContactDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["All", "Merge"];

  return (
    <div className="flex justify-center h-screen mt-5">
      <div>
        <ul className="flex justify-center items-center my-4">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${activeTab === index ? 'text-green-500 border-green-500' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </li>
          ))}
        </ul>

        <div className="bg-white p-10 text-center border">
          {activeTab === 0 && (
            <div style={{ width: '80vw', height: '60vh' }} className="mx-auto">
              <ContactManagement />
            </div>
          )}
          {activeTab === 1 && <div>Content 2</div>}
        </div>
      </div>
    </div>
  );
};

export default ContactDashboard;
