import React from "react";

export default function StatusFilter({ status, setStatus }) {
  return (
    <div className="flex justify-center my-4">
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded text-gray-700">
        <option value="All">All</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}
