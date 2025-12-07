import React,{useState} from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiHome, FiFileText, FiDownload, FiLogOut } from "react-icons/fi";
import Lead from "../pages/Leads.jsx";
import DashboardView from "./DashboardView.jsx";
import Agents from "../pages/Agents.jsx";
import Token from "./Token.jsx";


export default function Dashboard() {

  const [leadsView, setLeadsView] = useState(false);
  const [dashboardView, setDashboardView] = useState(true);
  const [agentsView, setAgentsView] = useState(false);
  const [tokenView, setTokenView] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FFF7EC]">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#8A4B00] text-white p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-10 text-center">Admin Panel</h2>

        <ul className="space-y-4 text-lg">
          <li>
            <button className="flex items-center gap-3 hover:text-[#F4A300]" onClick={() => {
              setDashboardView(true);
              setLeadsView(false);
              setAgentsView(false);
            }}>
              <FiFileText /> Dashboard View
            </button>
          </li>
          
          <li>
            <button className="flex items-center gap-3 hover:text-[#F4A300]" onClick={() => {
              setDashboardView(false);
              setLeadsView(true);
              setAgentsView(false);
            }}>
              <FiFileText /> Leads
            </button>
          </li>

          <li>
            <button className="flex items-center gap-3 hover:text-[#F4A300]" onClick={()=>{
              setDashboardView(false);
              setLeadsView(false);
              setAgentsView(true);
            }}>
              <FiUsers /> Agents
            </button>
          </li>

          <li>
            <button className="flex items-center gap-3 hover:text-[#F4A300]" onClick={()=>{
              setDashboardView(false);
              setLeadsView(false);
              setAgentsView(false);
              tokenView(true);
              }}>
              <FiDownload /> Print Token
            </button>
          </li>
        </ul>

        {/* Footer */}
        <button className="mt-auto flex items-center gap-3 text-white hover:text-red-300">
          <FiLogOut /> Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {dashboardView && !leadsView && !agentsView && <DashboardView />}
        {!dashboardView && leadsView && !agentsView && <Lead />}
        {!dashboardView && !leadsView && agentsView && <Agents/>}
        {!dashboardView && !leadsView && !agentsView && <Token/>}

      </div>
    </div>
  );
}
