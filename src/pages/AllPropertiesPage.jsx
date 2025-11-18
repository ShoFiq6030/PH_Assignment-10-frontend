import React, { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import PropertyCard from "../components/common/PropertyCard";
import Loading from "../components/common/Loading";

import PropertyFilters from "../components/AllPropertiesPage/PropertyFilters";
import { useTheme } from "../hooks/useTheme";
import axios from "axios";
import useDebounce from "../utils/debounce";

export default function AllPropertiesPage() {
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  // Filter states
  const [search, setSearch] = useState("");
  const [room, setRoom] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bath, setBath] = useState("");
  const [garage, setGarage] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByTime, setSortByTime] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { theme } = useTheme();

  const categories = ["All", "Sale", "Commercial", "Land", "Rent"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {};

        if (debouncedSearch) params.search = debouncedSearch;
        if (sortByPrice) {
          params.sortBy = "price";
          params.order = sortByPrice;
        }
        if (sortByTime) {
          params.sortBy = "createdAt";
          params.order = sortByTime;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/properties`,
          { params }
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch, sortByPrice, sortByTime]);

  const filteredProperties = data.filter((property) => {
    if (active !== "All" && property.category !== active) return false;
    return true;
  });

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load properties. Please try again later.
      </div>
    );

  return (
    <section
      className={`px-6 py-10 ${theme === "dark" && "bg-gray-600"} w-full`}
    >
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1
          className={`text-3xl font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Find Your Dream Property
        </h1>
        <p className="text-gray-500 mt-2">
          Browse through our curated collection of properties.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-4 border-b border-pink-600 pb-3 mb-8 w-full">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`px-6 py-2 rounded-md transition-all duration-200 ${
              active === category
                ? "bg-pink-600 text-white border border-pink-600"
                : " hover:text-pink-600"
            } ${theme === "dark" ? "text-white" : "text-gray-700"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter Component */}
      <div className="w-full mb-8">
        <PropertyFilters
          search={search}
          setSearch={setSearch}
          room={room}
          setRoom={setRoom}
          bedroom={bedroom}
          setBedroom={setBedroom}
          bath={bath}
          setBath={setBath}
          garage={garage}
          setGarage={setGarage}
          sortByPrice={sortByPrice}
          setSortByPrice={setSortByPrice}
          sortByTime={sortByTime}
          setSortByTime={setSortByTime}
        />
      </div>

      {/* Property List */}
      {loading ? (
        <div className=" w-full">
          <Loading />
        </div>
      ) : filteredProperties?.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No properties found.</div>
      )}
    </section>
  );
}
