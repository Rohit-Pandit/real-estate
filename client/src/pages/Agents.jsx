import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Agents() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [editingAgent, setEditingAgent] = useState(null);

  // ------------------------------------
  // Fetch all agents
  // ------------------------------------
  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/agents/get-all-agents`);
      setAgents(res.data.agents || []);
    } catch (err) {
      toast.error("Failed to load agents");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // ------------------------------------
  // Input change
  // ------------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ------------------------------------
  // Add Agent
  // ------------------------------------
  const addAgent = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backendUrl}/api/v1/agents/create-agent`, formData);
      toast.success("Agent added");
      setFormData({ name: "", phone: "", address: "" });
      fetchAgents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add agent");
    }
  };

  // ------------------------------------
  // Start Editing (load into form)
  // ------------------------------------
  const startEdit = (agent) => {
    setEditingAgent(agent._id);
    setFormData({
      name: agent.name,
      phone: agent.phone,
      address: agent.address,
    });
  };

  // ------------------------------------
  // Update Agent
  // ------------------------------------
  const updateAgent = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${backendUrl}/api/v1/agents/update-agent/${editingAgent}`,
        formData
      );

      toast.success("Agent updated");
      setEditingAgent(null);
      setFormData({ name: "", phone: "", address: "" });
      fetchAgents();
    } catch (error) {
      toast.error("Failed to update agent");
    }
  };

  // ------------------------------------
  // Delete Agent
  // ------------------------------------
  const deleteAgent = async (id) => {
    if (!confirm("Are you sure you want to delete this agent?")) return;

    try {
      await axios.delete(`${backendUrl}/api/v1/agents/delete-agent/${id}`);
      toast.info("Agent deleted");
      fetchAgents();
    } catch (error) {
      toast.error("Failed to delete agent");
    }
  };

  return (
    <div className="p-6 text-[#8A4B00] flex flex-col min-h-screen flex-direction row">
      <h1 className="text-3xl font-bold mb-6">Agent Management</h1>

      <div className="flex gap-6 items-start">
        {/* Add / Edit Form */}
        <form
          onSubmit={editingAgent ? updateAgent : addAgent}
          className="bg-[#FFF9EF] p-5 rounded-lg shadow-md border border-[#F4A300] max-w-md"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingAgent ? "Edit Agent" : "Add New Agent"}
          </h2>

          <input
            name="name"
            type="text"
            placeholder="Agent name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded"
            required
          />

          <input
            name="phone"
            type="text"
            placeholder="Phone (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded"
            required
          />

          <input
            name="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-[#8A4B00] hover:bg-[#6d3800] transition text-white py-2 rounded"
          >
            {editingAgent ? "Update Agent" : "Add Agent"}
          </button>
        </form>

        {/* Agents List */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Agents List</h2>

          <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#F4A300] text-white text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {agents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-[#8A4B00]">
                    No agents found
                  </td>
                </tr>
              ) : (
                agents.map((agent) => (
                  <tr
                    key={agent._id}
                    className="border-b hover:bg-[#FFF4E0] transition"
                  >
                    <td className="p-3">{agent.name}</td>
                    <td className="p-3">{agent.phone}</td>
                    <td className="p-3">{agent.address}</td>

                    <td className="p-3 flex justify-center gap-3">
                      {/* FIXED — Correct Edit Button */}
                      <button
                        onClick={() => startEdit(agent)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteAgent(agent._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
