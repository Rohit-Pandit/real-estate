import React from 'react'

export default function About() {
  return (
    <div className="bg-[#FFF5E1] min-h-screen pt-16 pb-20 px-4">

      {/* Title */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F4A300]">
          About VayuEstate
        </h1>
        <p className="text-[#5A3E1B] mt-4 text-sm sm:text-base">
          Trusted Real Estate Solutions for Every Dream Home.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Text Section */}
        <div className="bg-[#FFE9C6] border border-[#F4A300] rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-[#B5651D] mb-4">
            Who We Are
          </h2>
          <p className="text-[#5A3E1B] leading-relaxed">
            VayuEstate is a modern real estate platform built to help customers 
            discover, evaluate, and secure the best homes and properties seamlessly.  
            Whether you're looking for premium apartments, villas, land investments, 
            or commercial spaces — we are committed to connecting you with the right opportunities.
          </p>

          <h2 className="text-2xl font-semibold text-[#B5651D] mt-6 mb-4">
            Our Mission
          </h2>
          <p className="text-[#5A3E1B] leading-relaxed">
            Our mission is to make real estate transparent, simple, and trustworthy. 
            From property tours to lead management and final documentation, 
            we simplify the entire process with the help of technology.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=60"
            alt="Real estate"
            className="rounded-xl shadow-lg object-cover w-full h-80"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#B5651D] text-center mb-8">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div className="bg-[#FFE9C6] border border-[#F4A300] rounded-xl p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold text-[#F4A300] mb-2">Trust</h3>
            <p className="text-[#5A3E1B] text-sm">
              Transparent processes, verified listings, and genuine guidance.
            </p>
          </div>

          <div className="bg-[#FFE9C6] border border-[#F4A300] rounded-xl p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold text-[#F4A300] mb-2">Technology</h3>
            <p className="text-[#5A3E1B] text-sm">
              Modern search tools, digital lead management & responsive design.
            </p>
          </div>

          <div className="bg-[#FFE9C6] border border-[#F4A300] rounded-xl p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold text-[#F4A300] mb-2">Service</h3>
            <p className="text-[#5A3E1B] text-sm">
              Dedicated support from property discovery to final closure.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}
