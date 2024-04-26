import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../components/Navbar";
import SwimmingCenterCard from "../components/SwimmingCenterCard";

const supabaseUrl = "https://lzhfsxogrzcptpmnmibi.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function HomePage() {
  const [locations, setLocations] = useState([]);
  const [swimmingCenters, setSwimmingCenters] = useState([]);
  const [plan, setPlan] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const [isDivClicked, setIsDivClicked] = useState(false);

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
    <div className="h-screen w-full scrollbar-hide">
      <Navbar />
      <div className="flex-col justify-center items-center">
        <div className="flex-col justify-center items-center container mx-auto mt-4">
          <h1 className="text-4xl font-semibold text-center text-black">
            Our Swimming Centers
          </h1>
          <div className="flex flex-wrap items-center max-w-3xl justify-center mx-auto mt-5">
            {locations.map((location) => (
              <button
                key={location.location_id}
                className={`m-2 px-4 py-2 border-2 rounded-3xl ${
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
          <div className="max-w-4xl mx-auto mt-10">
            <div className="flex text-2xl font-medium text-center text-black">
              Our Centers
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
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
                <div className="flex text-2xl font-medium text-center text-black">
                  Our Plans
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
                  {plan.map((p) => (
                    <div
                      key={p.plan_id}
                      onClick={() => setIsDivClicked(p.plan_id)}
                    >
                      <div
                        className={`border-0 outline-none shadow-custom-light hover:shadow-custom-dark transition-shadow duration-300 ${
                          isDivClicked === p.plan_id
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
                      {isDivClicked === p.plan_id && (
                        <button className="w-full bg-[#E75A5A] text-white py-2 rounded-b-xl mt-auto font-semibold">
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
