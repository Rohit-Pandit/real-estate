import React from "react";


export default function DashboardView() {
  return (
    <div>
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
  );
}