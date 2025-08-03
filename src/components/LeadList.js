import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function LeadList({ statusFilter, onEdit }) {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLeads(statusFilter === "All" ? data : data.filter((l) => l.status === statusFilter));
    });
    return () => unsub();
  }, [statusFilter]);

  return (
    <div className="max-w-2xl mx-auto my-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Leads</h3>
      <ul className="space-y-4">
        {leads.map((lead) => (
          <li key={lead.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-gray-700">{lead.name}</div>
                <div className="text-sm text-gray-600">{lead.email}</div>
                <div className="text-sm">Campaign: <span className="font-medium">{lead.campaign}</span></div>
                <div className="text-xs italic text-gray-500">{lead.notes}</div>
                {lead.leadScore !== undefined && (
                  <div className="text-xs text-yellow-600 font-semibold">⭐ Score: {lead.leadScore}</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-600">{lead.status}</div>
                <button onClick={() => onEdit(lead)} className="mt-2 text-xs text-white bg-green-500 px-2 py-1 rounded hover:bg-green-600">
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}