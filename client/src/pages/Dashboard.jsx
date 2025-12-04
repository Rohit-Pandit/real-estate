import React from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiHome, FiFileText, FiDownload, FiLogOut } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#FFF7EC]">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#8A4B00] text-white p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-10 text-center">Admin Panel</h2>

        <ul className="space-y-4 text-lg">
          <li>
            <Link className="flex items-center gap-3 hover:text-[#F4A300]" to="/admin/dashboard">
              <FiHome /> Dashboard
            </Link>
          </li>

          <li>
            <Link className="flex items-center gap-3 hover:text-[#F4A300]" to="/admin/leads">
              <FiFileText /> Leads
            </Link>
          </li>

          <li>
            <Link className="flex items-center gap-3 hover:text-[#F4A300]" to="/admin/agents">
              <FiUsers /> Agents
            </Link>
          </li>

          <li>
            <Link className="flex items-center gap-3 hover:text-[#F4A300]" to="/admin/export">
              <FiDownload /> Export Leads
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <button className="mt-auto flex items-center gap-3 text-white hover:text-red-300">
          <FiLogOut /> Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold text-[#8A4B00] mb-8">Dashboard Overview</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl p-6 shadow border-l-4 border-[#F4A300]">
            <h3 className="text-xl font-semibold text-gray-700">Total Leads</h3>
            <p className="text-3xl font-bold text-[#8A4B00]">0</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow border-l-4 border-[#8A4B00]">
            <h3 className="text-xl font-semibold text-gray-700">Total Agents</h3>
            <p className="text-3xl font-bold text-[#8A4B00]">0</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow border-l-4 border-[#D97706]">
            <h3 className="text-xl font-semibold text-gray-700">Leads Today</h3>
            <p className="text-3xl font-bold text-[#8A4B00]">0</p>
          </div>

        </div>

      </div>
    </div>
  );
}
