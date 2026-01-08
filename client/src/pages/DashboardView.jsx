import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function DashboardView() {
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalAgents, setTotalAgents] = useState(0);
  const [leadsToday, setLeadsToday] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/leads/get-all-leads`, {
        withCredentials: true,
      });
      const leadsData = res.data.leads;
      setTotalLeads(leadsData.length || 0);

      const agentsRes = await axios.get(
        `${backendUrl}/api/v1/agents/get-all-agents`,
        {
          withCredentials: true,
        }
      );
      const agentsData = agentsRes.data.agents;
      setTotalAgents(agentsData.length || 0);

      const today = new Date();
      const leadsTodayCount = leadsData.filter((lead) => {
        const leadDate = new Date(lead.createdAt);  
        return (
          leadDate.getDate() === today.getDate() &&
          leadDate.getMonth() === today.getMonth() &&
          leadDate.getFullYear() === today.getFullYear()
        );
      }).length;

      console.log("Leads Today Count:", leadsTodayCount);
      setLeadsToday(leadsTodayCount);

      toast.success("Dashboard data fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8A4B00] mb-8">
        Dashboard Overview
      </h1>

      {/* Quick Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-[#F4A300]">
          <h3 className="text-xl font-semibold text-gray-700">Total Leads</h3>
          <p className="text-3xl font-bold text-[#8A4B00]">{totalLeads}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-[#8A4B00]">
          <h3 className="text-xl font-semibold text-gray-700">Total Agents</h3>
          <p className="text-3xl font-bold text-[#8A4B00]">{totalAgents}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-[#D97706]">
          <h3 className="text-xl font-semibold text-gray-700">Leads Today</h3>
          <p className="text-3xl font-bold text-[#8A4B00]">{leadsToday}</p>
        </div>
      </div>
    </div>
  );
}
