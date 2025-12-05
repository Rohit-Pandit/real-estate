import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [agents, setAgents] = useState([]);

  const initialFormState = {
    name: "",
    phone: "",
    email: "",
    message: "",
    address: "",
    agent: "",
    interested: "Yes",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const submitTestLead = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post(
        `${backendUrl}/api/v1/leads/create-lead`,
        formData,
        { withCredentials: true }
      );

      setFormData(initialFormState);
      toast.success("Lead submitted successfully!");
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/v1/agents/get-all-agents`
        );
        
        setAgents(res.data.agents); // assuming backend returns {agents:[...]}
      } catch (error) {
        console.error("Failed to load agents", error);
      }
    };

    fetchAgents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Connect your API here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-[#FFF5E1] min-h-screen pt-16 pb-20 px-4">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F4A300]">
          Contact Us
        </h1>
        <p className="text-[#5A3E1B] mt-3">We would love to hear from you!</p>
      </div>

      {/* Container */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Info */}
        <div className="bg-[#FFE9C6] border border-[#F4A300] rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-[#B5651D] mb-4">
            Get in Touch
          </h2>

          <p className="text-[#5A3E1B] mb-4">
            Have questions about a property? Want a site visit? Send us a
            message and our team will reach out soon.
          </p>

          <div className="mt-6 space-y-3 text-[#5A3E1B]">
            <p>🏢 GSRAO Infrastructure pvt ltd</p>
            <p>📍 GVR nagar pamur road, Kandukur , India</p>
            <p>📞 +91 90144 46899</p>
            <p>✉️ gsraoinfraprvtlmtd@gmail.com </p>
          </div>
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#F4A300] rounded-xl p-6 shadow-md"
        >
          <div className="mb-4">
            <label className="text-[#B5651D] font-medium">Select Agent</label>

            <select
              name="agent"
              value={formData.agent}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] focus:outline-none focus:ring-2 focus:ring-[#F4A300] bg-[#FFF9EF] text-[#5A3E1B]"
            >
              <option value="">-- Select Agent --</option>

              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name} 
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-[#B5651D] font-medium">Lead Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] focus:outline-none focus:ring-2 focus:ring-[#F4A300] bg-[#FFF9EF] text-[#5A3E1B]"
            />
          </div>

          <div className="mb-4">
            <label className="text-[#B5651D] font-medium">Lead Phone</label>
            <input
              name="phone"
              type="text"
              required
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] focus:outline-none focus:ring-2 focus:ring-[#F4A300] bg-[#FFF9EF] text-[#5A3E1B]"
            />
          </div>

          <div className="mb-4">
            <label className="text-[#B5651D] font-medium">Interested?</label>

            <select
              name="interested"
              value={formData.interested}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] focus:outline-none focus:ring-2 focus:ring-[#F4A300] bg-[#FFF9EF] text-[#5A3E1B]"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-[#B5651D] font-medium">Lead Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email (optional)"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] focus:outline-none focus:ring-2 focus:ring-[#F4A300] bg-[#FFF9EF] text-[#5A3E1B]"
            />
          </div>

          <div className="mb-4">
            <label className="text-[#B5651D] font-medium">Address</label>
            <textarea
              name="address"
              rows="4"
              placeholder="Message (optional)"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] focus:outline-none focus:ring-2 focus:ring-[#F4A300] bg-[#FFF9EF] text-[#5A3E1B]"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="text-[#B5651D] font-medium">Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Message (optional)"
              value={formData.message}
              onChange={handleChange}
              className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] focus:outline-none focus:ring-2 focus:ring-[#F4A300] bg-[#FFF9EF] text-[#5A3E1B]"
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={submitTestLead}
            className="w-full bg-[#F4A300] text-white p-3 rounded-lg font-semibold hover:bg-[#d98c00] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
