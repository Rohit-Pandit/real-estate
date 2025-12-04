import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LeadsPage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/leads/get-all-leads`, {
        withCredentials: true, // Required for admin cookie
      });

      setLeads(res.data.leads || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-[#8A4B00]">Loading leads...</p>;
  }

  return (
    <div className="p-8 text-[#8A4B00]">
      <h1 className="text-3xl font-bold mb-6">All Leads</h1>

      {/* Table Container */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-[#F4A300] bg-white">
        <table className="min-w-full text-left border-collapse">
          
          {/* Table Header */}
          <thead className="bg-[#8A4B00] text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Agent</th>
              <th className="p-3">Message</th>
              <th className="p-3">Created At</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id} className="border-b hover:bg-[#FFF5E6]">

                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.email || "-"}</td>

                  <td className="p-3 font-medium">
                    {lead.agent?.name || "—"}
                  </td>

                  <td className="p-3">{lead.message || "-"}</td>

                  <td className="p-3">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
