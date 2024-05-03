import React, { useState } from "react";
import { supabase } from "../config/supabase-client";
import { QrReader } from "react-qr-reader";

const ScanningPage = () => {
  const [transacName, setTransacName] = useState("");
  const [transacLocation, setTransacLocation] = useState("");
  const [scanResult, setScanResult] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      // Parse the scanned QR code data
      const qrData = JSON.parse(data);

      // Check if scanned data matches selected transacName and transacLocation
      if (
        qrData.transacName === transacName &&
        qrData.transacLocation === transacLocation
      ) {
        // Fetch transaction details from Supabase
        const { data: transactions, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("transacName", qrData.transacName)
          .eq("transacLocation", qrData.transacLocation);

        if (error) {
          console.error("Error fetching transaction details:", error.message);
          return;
        }

        // Display scan result
        if (transactions.length > 0) {
          // QR code is valid
          setScanResult("Valid QR code");
        } else {
          // QR code is invalid
          setScanResult("Invalid QR code");
        }
      } else {
        // QR code does not match selected transacName and transacLocation
        setScanResult("Invalid QR code");
      }
    }
  };

  const handleError = (error) => {
    console.error("Error scanning QR code:", error.message);
  };

  const handleTransacNameChange = (event) => {
    setTransacName(event.target.value);
  };

  const handleTransacLocationChange = (event) => {
    setTransacLocation(event.target.value);
  };

  return (
    <div>
      <h1>Scanner Page</h1>
      <div>
        <label>
          Select Transac Name:
          <select
            value={transacName}
            onChange={handleTransacNameChange}
          >
            <option value="GYMKHANA CLUB SECTOR-29, GURUGRAM">GYMKHANA CLUB SECTOR-29, GURUGRAM</option>
            <option value="GYMKHANA CLUB SECTOR-4, GURUGRAM">GYMKHANA CLUB SECTOR-4, GURUGRAM</option>
            <option value="ORLOV COURT COMMUNITY CENTER, ESSEL TOWER, MG ROAD, GURUGRAM">ORLOV COURT COMMUNITY CENTER, ESSEL TOWER, MG ROAD, GURUGRAM</option>
            <option value="GYMKHANA CLUB, SECTOR-3, PANCHKULA">GYMKHANA CLUB, SECTOR-3, PANCHKULA</option>
            <option value="GYMKHANA CLUB, SECTOR-15-A, FARIDABAD">GYMKHANA CLUB, SECTOR-15-A, FARIDABAD</option>
            <option value="GYMKHANA CLUB, SECTOR-9, BAHADURGARH">GYMKHANA CLUB, SECTOR-9, BAHADURGARH</option>
            <option value="District sports office Hingoli Limbala makata, Midc, Hingoli">District sports office Hingoli Limbala makata, Midc, Hingoli</option>
            <option value="NASIK MUNICIPAL CORPORATION Srikantji Thackeray Swimming Pool, Hirawadi Road, Nashik">NASIK MUNICIPAL CORPORATION Srikantji Thackeray Swimming Pool, Hirawadi Road, Nashik</option>
            <option value="International Swimming Pool, Indore">International Swimming Pool, Indore</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Select Transac Location:
          <select
            value={transacLocation}
            onChange={handleTransacLocationChange}
          >
            <option value="Gurugram">Gurugram</option>
            <option value="Panchkula">Panchkula </option>
            <option value="Faridabad">Faridabad</option>
            <option value="Bahadurgarh">Bahadurgarh</option>
            <option value="Hingoli, Maharashtra">Hingoli, Maharashtra</option>
            <option value="Nasik, Maharashtra">Nasik, Maharashtra</option>
            <option value="Indore">Indore</option>
            {/* Add more options as needed */}
          </select>
        </label>
      </div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        onResult={handleScan}
        style={{ width: "100%" }}
      />
      {/* Display scan result */}
      {scanResult && <p>{scanResult}</p>}
    </div>
  );
};

export default ScanningPage;
