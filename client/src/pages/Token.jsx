import React, { useState } from "react";

export default function Token() {
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [tokenNumber, setTokenNumber] = useState(null);
  const [time, setTime] = useState("");

  const company = "GSRAO INFRASTRUCTURE PVT LTD";

  const generateToken = () => {
    if (!name || !vehicle || !vehicleType) {
      alert("Please fill all fields");
      return;
    }

    setTokenNumber(Math.floor(Math.random() * 90000 + 10000)); // random 5-digit token
    setTime(new Date().toLocaleString());
  };

  const handlePrint = () => {
    const printContents = document.getElementById("printSlip").innerHTML;
    const w = window.open("", "PRINT", "height=600,width=400");

    w.document.write(`
      <html>
        <head>
          <title>Token Slip</title>
          <style>
            body {
              font-family: monospace;
              width: 250px;
              padding: 10px;
            }
            .center {
              text-align: center;
            }
            .line {
              border-top: 1px dashed #000;
              margin: 6px 0;
            }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);

    w.document.close();
    w.focus();
    w.print();
    w.close();
    setName("");
    setVehicle("");
    setVehicleType("");
    setTokenNumber(null);
    setTime("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#FF9933]">Generate Worker Token</h1>

      {/* Form */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Worker Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Lorry / Tracker / etc."
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={generateToken}
          className="w-full mt-6 bg-[#F4A300] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#d98c00] transition"
        >
          Generate Token
        </button>
      </div>

      {/* Token Slip (Hidden Preview) */}
      {tokenNumber && (
        <>
          <div id="printSlip" className="hidden print:block">
            <div className="center">
              <strong>{company}</strong>
            </div>
            <div className="line"></div>

            <p><strong>Token:</strong> {tokenNumber}</p>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Vehicle:</strong> {vehicle}</p>
            <p><strong>Vehicle Type:</strong> {vehicleType}</p>

            <div className="line"></div>
            <p className="center">{time}</p>

            <div className="line"></div>
            <p className="center">Thank You</p>
          </div>

          <button
            onClick={handlePrint}
            className="w-full bg-green-600 text-white py-2 mt-4 rounded-full hover:bg-green-700 transition"
          >
            Print Slip
          </button>
        </>
      )}
    </div>
  );
}
