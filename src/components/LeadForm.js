import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
const HUGGINGFACE_API = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const HUGGINGFACE_TOKEN = process.env.REACT_APP_HF_TOKEN;

export default function LeadForm({ selectedLead, onSaveComplete }) {
  const emptyForm = {
    name: "",
    email: "",
    source: "",
    status: "New",
    campaign: "",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (selectedLead) {
      setForm(selectedLead);
    } else {
      setForm(emptyForm);
    }
  }, [selectedLead]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const getAILeadScore = async (notes) => {
  try {
    let summary = "";
    if (notes.split(" ").length >= 30) {
      const res = await fetch(HUGGINGFACE_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: notes }),
      });
      const data = await res.json();
      summary = data?.[0]?.summary_text || "";
    }

    const text = (summary + " " + notes).toLowerCase();
    console.log("📝 Combined summary + notes:", text);

    const keywordMap = {
      "interested": 30,
      "demo": 20,
      "budget": 15,
      "follow": 10,
      "schedule": 10,
      "ready": 15,
      "purchase": 20,
      "evaluate": 10,
      "compare": 5,
      "decision": 5,
      "crm": 5,
    };

    let score = 10;
    for (const [keyword, value] of Object.entries(keywordMap)) {
      if (text.includes(keyword)) score += value;
    }

    return Math.min(score, 100);
  } catch (err) {
    console.error("AI scoring failed:", err);
    return 10;
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    const leadScore = await getAILeadScore(form.notes);

    const formWithScore = {
      ...form,
      leadScore,
    };

    if (selectedLead) {
      const ref = doc(db, "leads", selectedLead.id);
      await updateDoc(ref, formWithScore);
    } else {
      await addDoc(collection(db, "leads"), {
        ...formWithScore,
        createdAt: serverTimestamp(),
      });
    }
    setForm(emptyForm);
    onSaveComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded-lg max-w-md mx-auto my-4">
      <h2 className="text-xl font-bold mb-2 text-gray-700">
        {selectedLead ? "Edit Lead" : "Add Lead"}
      </h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
      <input name="source" value={form.source} onChange={handleChange} placeholder="Source" className="w-full border p-2 rounded" />

      <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
        <option>New</option>
        <option>Contacted</option>
        <option>Closed</option>
      </select>

      <input name="campaign" value={form.campaign} onChange={handleChange} placeholder="Campaign" className="w-full border p-2 rounded" />
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full border p-2 rounded h-24" />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
        {selectedLead ? "Update Lead" : "Add Lead"}
      </button>
    </form>
  );
}