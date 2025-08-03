import React, { useState } from 'react';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';
import StatusFilter from './components/StatusFilter';

function App() {
  const [status, setStatus] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-8 px-4">
      <h1 className="text-3xl text-center font-bold text-blue-800 mb-6">SmartCRM Lite</h1>
      
      {/* Pass selectedLead and setSelectedLead */}
      <LeadForm selectedLead={selectedLead} onSaveComplete={() => setSelectedLead(null)} />
      <StatusFilter status={status} setStatus={setStatus} />

      {/* ❗Fix: Add onEdit here */}
      <LeadList statusFilter={status} onEdit={(lead) => setSelectedLead(lead)} />
    </div>
  );
}

export default App;
