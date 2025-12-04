import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#FFF5E1] shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-xl flex">
            <span className="text-[#C16A00]">GSRAO</span>
            <span className="text-[#8A4B00]">Estate</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 text-[#8A4B00] font-medium">
          <Link to="/"><li className="hover:text-[#C16A00]">Home</li></Link>
          <Link to="/about"><li className="hover:text-[#C16A00]">About</li></Link>
          <Link to="/contact"><li className="hover:text-[#C16A00]">Contact</li></Link>
          <Link to="/admin"><li className="hover:text-[#C16A00]">Admin</li></Link>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-[#8A4B00] text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Overlay (when menu is open) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Right Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#FFF7E6] border-l border-[#E0A54A] shadow-xl p-6 z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          className="text-2xl text-[#8A4B00] mb-6"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>

        {/* Menu Items */}
        <ul className="flex flex-col gap-6 text-lg text-[#8A4B00] font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <li className="hover:text-[#C16A00]">Home</li>
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <li className="hover:text-[#C16A00]">About</li>
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            <li className="hover:text-[#C16A00]">Contact</li>
          </Link>
          <Link to="/admin" onClick={() => setMenuOpen(false)}>
            <li className="hover:text-[#C16A00]">Admin</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
