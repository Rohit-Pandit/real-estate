import { useState } from "react";
import axios from "axios";

export default function Homecontact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    address: "",
    agent : "",
    intrested : true
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/leads", formData);
      setSuccess("Thank you! We'll contact you soon.");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      setSuccess("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFF7E6] py-12 px-4 mt-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-[#F4A300] mb-6">
          Get in Touch
        </h2>

        <div className="bg-white border border-[#F4A300] rounded-xl shadow-md p-6 md:p-8">
          {success && (
            <p className="text-center text-green-600 font-semibold mb-4">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="text-[#B5651D] font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] bg-[#FFF9EF]"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-[#B5651D] font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                required
                className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] bg-[#FFF9EF]"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-[#B5651D] font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] bg-[#FFF9EF]"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-[#B5651D] font-medium">Message</label>
              <textarea
                rows="3"
                name="message"
                className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] bg-[#FFF9EF]"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

             <div>
              <label className="text-[#B5651D] font-medium">Address</label>
              <textarea
                rows="3"
                name="message"
                className="mt-2 w-full p-3 rounded-lg border border-[#F4A300] bg-[#FFF9EF]"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#F4A300] text-white p-3 rounded-lg text-lg font-semibold hover:bg-[#d98c00] transition"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
