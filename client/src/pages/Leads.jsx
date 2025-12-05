import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiDownload } from "react-icons/fi";

export default function LeadsPage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);

  const [loading, setLoading] = useState(true);

  // Filters
  const [agentSearch, setAgentSearch] = useState("");
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [filterAgent, setFilterAgent] = useState("");
  const [filterDays, setFilterDays] = useState("");

  // ------------------------------------------
  // PRINT HANDLER

  const handlePrint = () => {
    const printContent = document.getElementById("leads-table");
    const printWindow = window.open("", "", "width=900,height=700");

    printWindow.document.write(`
    <html>
      <head>
        <title>Leads Report</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            border: 1px solid #ccc;
            text-align: left;
            font-size: 14px;
          }
          th {
            background: #8A4B00;
            color: white;
          }
        </style>
      </head>
      <body>
        ${printContent.outerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // ------------------------------------------
  // FETCH LEADS
  // ------------------------------------------
  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/leads/get-all-leads`, {
        withCredentials: true,
      });

      setLeads(res.data.leads || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // ------------------------------------------
  // FETCH AGENTS
  // ------------------------------------------
  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/agents/get-all-agents`);

      setAgents(res.data.agents || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Load both on mount
  useEffect(() => {
    fetchLeads();
    fetchAgents();
  }, []);

  // ------------------------------------------
  // DEBOUNCE SEARCH FOR AGENT DROPDOWN
  // ------------------------------------------
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (agentSearch.trim() === "") {
        setFilteredAgents([]);
        return;
      }

      const results = agents.filter((agent) =>
        agent.name.toLowerCase().includes(agentSearch.toLowerCase())
      );

      setFilteredAgents(results);
    }, 300);

    return () => clearTimeout(timeout);
  }, [agentSearch, agents]);

  // ------------------------------------------
  // FILTER LEADS
  // ------------------------------------------
  const filteredLeads = leads.filter((lead) => {
    let matchesAgent = true;
    let matchesDays = true;

    // Filter by Agent
    if (filterAgent) {
      matchesAgent = lead.agent?._id === filterAgent;
    }

    // Filter by days
    if (filterDays) {
      const leadDate = new Date(lead.createdAt);
      const today = new Date();
      const difference = (today - leadDate) / (1000 * 60 * 60 * 24); // difference in days
      matchesDays = difference <= Number(filterDays);
    }

    return matchesAgent && matchesDays;
  });

  // ------------------------------------------
  // UI
  // ------------------------------------------

  if (loading) {
    return <p className="text-center mt-10 text-[#8A4B00]">Loading leads...</p>;
  }

  return (
    <div className="p-8 text-[#8A4B00]">
      <h1 className="text-3xl font-bold mb-6">All Leads</h1>

      <div
                  className="
                  flex flex-col md:flex-row 
                  items-start md:items-center 
                  gap-3 md:gap-4 
                  mb-6 
                  bg-[#FFF9EF] 
                  p-4 
                  rounded-xl 
                  border border-[#F4A300]/40 
                  shadow-sm
                "
      >
        {/* Agent Search Box */}
          <input
            type="text"
            value={agentSearch}
            onChange={(e) => setAgentSearch(e.target.value)}
            placeholder="Search Agent..."
            className="h-10 p-2 border rounded w-full md:w-64"
          />

          {/* Dropdown */}
          {filteredAgents.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border rounded shadow max-h-60 overflow-y-auto z-10">
              {filteredAgents.map((agent) => (
                <div
                  key={agent._id}
                  onClick={() => {
                    setFilterAgent(agent._id);
                    setAgentSearch(agent.name);
                    setFilteredAgents([]);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {agent.name}
                </div>
              ))}
            </div>
          )}
        

        {/* Days Filter */}
        <select
          value={filterDays}
          onChange={(e) => setFilterDays(e.target.value)}
          className="h-10 p-2 border rounded w-full md:w-40"
        >
          <option value="">All Days</option>
          <option value="1">Last 1 Day</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>

        {/* Clear Filters Button */}
        <button
          onClick={() => {
            setFilterAgent("");
            setFilterDays("");
            setAgentSearch("");
            setFilteredAgents([]);
          }}
          className="h-10 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Clear Filters
        </button>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="h-10 flex items-center gap-2 px-4 bg-red-600 
                     text-white rounded-lg hover:bg-red-700 transition"
        >
          <FiDownload className="text-lg" />
          <span>Print Leads</span>
        </button>
      </div>

      {/* Table */}
      <div
        id="leads-table"
        className="overflow-x-auto shadow-lg rounded-lg border border-[#F4A300] bg-white"
      >
        <table className="min-w-full text-left border-collapse">
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

          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No leads found
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead._id} className="border-b hover:bg-[#FFF5E6]">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.email || "-"}</td>
                  <td className="p-3 font-medium">
                    {lead.agent?.name || "Self"}
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
