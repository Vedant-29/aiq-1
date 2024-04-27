import { useEffect, useState } from "react";
import SwimmingCenterCard from "../components/SwimmingCenterCard";
import { supabase } from "../config/supabase-client";
import { Navigate, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  
  const [locations, setLocations] = useState([]);
  const [swimmingCenters, setSwimmingCenters] = useState([]);
  const [plan, setPlan] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [planSelected, setplanSelected] = useState(false);

  const [selectedCenterName, setSelectedCenterName] = useState(null);
  const [SelectedPlanName, setSelectedPlanName] = useState(null);

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

    const { data: centerData } = await supabase
    .from("swimmingcenters") // replace 'center' with your actual center table name
    .select("center_name")
    .eq("center_id", centerId);

  if (centerData && centerData.length > 0) {
    setSelectedCenterName(centerData[0].center_name);
  }

  }

  const handleLocationClick = (locationId, locationName) => {
    setSelectedLocation(locationName);
    getSwimmingCenters(locationId);
  };

  const handlePlanClick = (planId, planName) => {
    setplanSelected(planId);
    setSelectedPlanName(planName);
  };

  const handleBookNow = (locationNameOut, planOut, swimmingCentresOut) => {
    navigate('/payment-redirect', { state: { locationNameOut, planOut, swimmingCentresOut } });
  };  

  return (
    <div className="h-screen w-full scrollbar-hide">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center container mx-auto mt-4 px-4 sm:px-0">
          <h1 className="text-2xl sm:text-4xl font-semibold text-center text-black">
            Our Swimming Centers
          </h1>
          <div className="flex flex-wrap items-center lg:max-w-3xl justify-center mx-auto mt-5">
            {locations.map((location) => (
              <button
                key={location.location_id}
                className={`m-2 px-3 sm:px-4 py-1 sm:py-2 border-2 rounded-3xl ${
                  selectedLocation === location.location_name
                    ? "bg-[#E2F1F9] text-[#0B76BD] font-semibold border-[#E2F1F9]"
                    : "bg-white text-black font-normal border-[#F5F5F5]"
                }`}
                onClick={() =>
                  handleLocationClick(
                    location.location_id,
                    location.location_name
                  )
                }
              >
                {location.location_name}
              </button>
            ))}
          </div>
          <div className="max-w-full sm:max-w-4xl mx-auto mt-10 px-4 sm:px-0">
            <div className="flex text-xl sm:text-2xl font-medium text-center text-black">
              Our Centers
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 py-10">
              {swimmingCenters.map((center) => (
                <SwimmingCenterCard
                  key={center.center_id}
                  center={center}
                  onClick={() => handleCenterClick(center.center_id)}
                />
              ))}
            </div>

            {selectedCenter && (
              <div className="rounded-lg bg-transparent mt-4">
                <div className="flex text-xl sm:text-2xl font-medium text-center text-black">
                  Our Plans
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 py-10">
                  {plan.map((p) => (
                    <div
                      key={p.plan_id}
                      onClick={() => handlePlanClick(p.plan_id ,p.plan_name)}
                    >
                      <div
                        className={`border-0 outline-none shadow-custom-light hover:shadow-custom-dark transition-shadow duration-300 ${
                          planSelected === p.plan_id
                            ? "border-0 outline-none shadow-custom-light hover:shadow-custom-dark transition-shadow duration-300 rounded-t-xl"
                            : "rounded-xl"
                        }`}
                      >
                        <div className="w-full p-4 flex items-center">
                          <div className="flex-col items-start">
                            <h1 className="text-lg font-medium">
                              {p.plan_name}
                            </h1>
                            <div className="flex items-center ">
                              <div className="focus:outline-none bg-transparent font-normal text-[#3B82F6] px-1 text-md py-1 rounded-sm mr-0.5 line-through">
                                ${p.cutoff_plan_price}
                              </div>
                              <div className="focus:outline-none bg-transparent font-semibold text-[#3B82F6] pr-1 text-xl py-1 rounded-sm mr-0.5">
                                ${p.plan_price}
                              </div>
                              <div className="bg-[#16A34A] text-white text-xs px-2 py-0.5 rounded-full ml-2 cursor-default">
                                {p.discount * 100}% OFF
                              </div>
                            </div>
                            <h1 className="px-1 text-[#A0A0A0] text-xs font-normal">
                              + ({p.tax * 100}% GST)
                            </h1>
                          </div>
                        </div>
                      </div>
                      {planSelected === p.plan_id && (
                        <button 
                        onClick={() => handleBookNow(selectedLocation, SelectedPlanName, selectedCenterName)}
                        className="w-full bg-[#E75A5A] text-white py-2 rounded-b-xl mt-auto font-semibold">
                          Book Now
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
