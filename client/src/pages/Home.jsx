import React from 'react';
import { Link } from 'react-router-dom';
import { properties } from '../assets/dummyData.js';
import Contact from './Contact.jsx';

export default function Home() {
  return (
    <div className="bg-[#FFF5E1] min-h-screen pt-16">

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] sm:h-[75vh]">
        {/* <img
          src="https://unsplash.com/photos/white-and-red-wooden-house-miniature-on-brown-table-rgJ1J8SDEAY"
          alt="Real Estate Banner"
          className="w-full h-full object-cover brightness-75"
        /> */}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#8A4B00] drop-shadow-lg">
            Find Your Dream Home
          </h1>
          <p className="text-[#5C3A17] text-sm sm:text-lg mt-4 max-w-xl drop-shadow-md">
            Discover premium villas, apartments, and budget-friendly homes across the city.
          </p>

          <Link to="/contact">
            <button className="mt-6 bg-[#F4A300] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#d98c00] transition">
              Explore Properties
            </button>
          </Link>
          
        </div>
      </section>
      <section>
            <Contact />
      </section>

      {/* Featured Properties */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#B5651D] mb-6">
          Featured Listings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {properties.map((property) => (
        <div
          key={property.id}
          className="bg-[#FFE9C6] border border-[#F4A300] rounded-xl shadow-md overflow-hidden"
        >
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-48 w-full object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl font-semibold text-[#B5651D]">{property.title}</h3>
            <p className="text-[#5A3E1B] text-sm mt-2">{property.location}</p>
            {/* {property.price && (
              <p className="text-[#F4A300] font-bold mt-2">{property.price}</p>
            )} */}
          </div>
        </div>
      ))}

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#FFE9C6] border-t border-[#F4A300] py-16">
        <div className="max-w-6xl mx-auto px-4">
          
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#B5651D] mb-10">
            Why Choose GSRAOEstate?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#F4A300]">Verified Listings</h3>
              <p className="text-[#5A3E1B] mt-2 text-sm">
                Every property is verified for safety, legality, and credibility.
              </p>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#F4A300]">End-to-End Support</h3>
              <p className="text-[#5A3E1B] mt-2 text-sm">
                From site visits to documentation — we handle everything.
              </p>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#F4A300]">Best Market Prices</h3>
              <p className="text-[#5A3E1B] mt-2 text-sm">
                Get the most competitive rates and exclusive project deals.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#B5651D]">
          Ready to Find Your Dream Property?
        </h2>
        <Link to="/contact">
          <button className="mt-6 bg-[#F4A300] text-white px-10 py-3 rounded-full font-semibold shadow-md hover:bg-[#d98c00] transition">
            Contact Us
          </button>
        </Link>
      </section>
    </div>
  )
}
