import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAsyncError } from "react-router-dom";
import Navbar from "../components/Navbar";

const supabase = createClient(
  "https://lzhfsxogrzcptpmnmibi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGZzeG9ncnpjcHRwbW5taWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjYyOTYsImV4cCI6MjAyOTY0MjI5Nn0.n0iXsmiQwVHwc903LjVGFGzSlVbWrnVMccQFBk7Q6eQ"
);

function HomePage() {
  const [locations, setLocations] = useState([]);
  const [swimmingCenters, setSwimmingCenters] = useState([]);
  const [plan, setPlan] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    const { data } = await supabase.from("locations").select();
    setLocations(data);
    setSelectedLocation(data[0]?.location_name); // Set the first location as selected initially
    getSwimmingCenters(data[0]?.location_id);
  }

  async function getSwimmingCenters(locationId) {
    let centersData = [];
    if (locationId) {
      // Another way of writing the response from the supabase -- using data : centersData
      const response = await supabase
        .from("swimmingcenters")
        .select()
        .eq("location_id", locationId);
      centersData = response.data;
      setSwimmingCenters(centersData);
    }

    if (centersData.length > 0) {
      const firstCenterId = centersData[0].center_id;
      handleCenterClick(firstCenterId);
    }
  }

  async function handleCenterClick(centerId) {
    setSelectedCenter(centerId);
    const { data: planData } = await supabase
      .from("plan")
      .select()
      .eq("center_id", centerId);
    setPlan(planData);
  }

  const handleLocationClick = (locationId, locationName) => {
    setSelectedLocation(locationName);
    getSwimmingCenters(locationId);
  };

  return (
    <div>
      <Navbar />
      {locations.map((location) => (
        <button
          key={location.location_id}
          className={`m-2 p-2 border-2 rounded ${
            selectedLocation === location.location_name
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() =>
            handleLocationClick(location.location_id, location.location_name)
          }
        >
          {location.location_name}
        </button>
      ))}

      <h2 className="text-2xl font-semibold text-center text-blue-600">
        Swimming Centers
      </h2>
      <div className="flex flex-wrap justify-center">
        {swimmingCenters.map((center) => (
          <div
            key={center.center_id}
            className="m-2 p-4 bg-white rounded shadow-lg flex-auto"
            onClick={() => handleCenterClick(center.center_id)}
          >
            <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl">
              {center.center_name}
            </p>

            {selectedCenter === center.center_id && (
              <div className="mt-4">
                <h2 className="text-2xl font-semibold text-center text-blue-600">
                  Plans
                </h2>
                <div className="flex flex-wrap justify-center">
                  {plan.map((p) => (
                    <div
                      key={p.plan_id}
                      className="m-2 p-4 bg-white rounded shadow-lg flex-auto"
                    >
                      <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl">
                        {p.plan_name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
