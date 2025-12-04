import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#FFF5E1] border-t border-[#F4A300] mt-10">
  <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">

    {/* Brand */}
    <div>
      <h2 className="text-xl font-bold text-[#B5651D]">GSRAO<span className="text-[#F4A300]">Estate</span></h2>
      <p className="text-[#5A3E1B] mt-2 text-sm">
        Your trusted partner in real estate.  
        Premium homes, budget properties, and modern spaces.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold text-[#B5651D] mb-3">Quick Links</h3>
      <ul className="space-y-2 text-[#5A3E1B]">
        <li><Link to="/" className="hover:text-[#F4A300]">Home</Link></li>
        <li><Link to="/about" className="hover:text-[#F4A300]">About</Link></li>
        <li><Link to="/contact" className="hover:text-[#F4A300]">Contact</Link></li>
        <li><Link to="/contact" className="hover:text-[#F4A300]">Listings</Link></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="text-lg font-semibold text-[#B5651D] mb-3">Contact</h3>
      <p className="text-[#5A3E1B] text-sm">🏢 GSRAO Infrastructure pvt ltd</p>
      <p className="text-[#5A3E1B] text-sm">📍 GVR nagar pamur road, Kandukur , India</p>
      <p className="text-[#5A3E1B] text-sm">📞 +91 90144 46899</p>
      <p className="text-[#5A3E1B] text-sm"> ✉️ gsraoinfraprvtlmtd@gmail.com</p>
      <p className="text-[#5A3E1B] text-sm"><a href="https://www.instagram.com/gsrao_premiumplots?igsh=MTB0YWd3d2p6dnJtMA==">Instagram</a></p>
      
    </div>

  </div>

  {/* Bottom Strip */}
  <div className="bg-[#F4A300] text-white py-3 text-center text-sm font-medium">
    © {new Date().getFullYear()} GSRAOEstate. All rights reserved.
  </div>
</footer>
  )
}
