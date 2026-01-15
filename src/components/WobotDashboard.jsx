import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, ChevronDown, RotateCcw } from 'lucide-react';
import brand from "./brand.svg"; // Make sure this path is correct
import CameraTable from './CameraTable'; // Make sure your table component is named this
import Pagination from './Pagination';



const WobotDashboard = () => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  
  // --- STATES FOR SEARCH & FILTER ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); 
  const [locationFilter, setLocationFilter] = useState("All"); 

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  

  const API_TOKEN  = import.meta.env.VITE_APITOKEN
    const BASE_URL = import.meta.env.VITE_URL
    const BASE_URL2 = import.meta.env.VITE_URL2

    

  // --- 1. FETCH CAMERAS ---
  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/fetch/cameras`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });

      // Transform API data to match our UI needs
      const mappedData = res.data.data.map((cam, index) => ({
        id: cam.id,
        name: cam.name || `Camera ${index + 1}`,
        location: cam.location || "Unknown Location", 
        recorder: cam.recorder || "N/A",
        tasks: cam.tasks || "0 Tasks",
        status: cam.status || "Inactive",
        sub: cam.sub || "sherwinwilliams@wobot.ai", 
        health: cam.health || { cloud: "A", device: "A" }, 
        hasWarning: cam.hasWarning || false,
        online: cam.status === "Active" 
      }));

      setCameras(mappedData);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setErrorMsg("Failed to load cameras.");
      setLoading(false);
    }
  };

  // --- 2. UPDATE STATUS LOGIC ---
  const updateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    
    // Optimistic Update (Update UI immediately)
    setCameras(cameras.map(c => c.id === id ? { ...c, status: newStatus, online: newStatus === "Active" } : c));

    try {
      await axios.put(
        `${BASE_URL}/update/camera/status`,
        { id: Number(id), status: newStatus },
        { headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json" } }
      );
    } catch (err) {
      alert("Failed to update status on server. Reverting...");
      fetchCameras(); // Revert on error
    }
  };

  // --- 3. DELETE LOGIC ---
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this camera?")) {
      setCameras(cameras.filter((cam) => cam.id !== id));
    }
  };

  // --- 4. CORE LOGIC: FILTERING & SEARCH ---
  // This runs on every render to filter the 'cameras' array
  // --- 4. CORE LOGIC: FILTERING & SEARCH ---
  const filteredCameras = cameras.filter((cam) => {
    // 1. Safe Search (Converts nulls to empty strings to prevent crashes)
    const term = searchTerm.toLowerCase();
    
    const matchesSearch = 
      String(cam.name || "").toLowerCase().includes(term) || 
      String(cam.location || "").toLowerCase().includes(term) ||
      String(cam.recorder || "").toLowerCase().includes(term) ||
      String(cam.id || "").includes(term); // Now you can search by ID too!

    // 2. Check Filters
    const matchesStatus = statusFilter === "All" || cam.status === statusFilter;
    const matchesLocation = locationFilter === "All" || cam.location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Extract unique locations for the dropdown menu
  const uniqueLocations = ["All", ...new Set(cameras.map(c => c.location))];

  // --- 5. PAGINATION LOGIC (Applied to filtered results) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCameras.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-600">
      
      {/* Top Logo Section */}
      <div className="flex justify-center py-6">
        <img src={brand} alt="Wobot Logo" className="h-10" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header & Search Bar */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Cameras</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your cameras here.</p>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="search" 
              value={searchTerm}
              onChange={(e) => {
                 setSearchTerm(e.target.value);
                 setCurrentPage(1); // Important: Reset to page 1 when searching
              }}
              className="pl-4 pr-10 py-2 w-64 bg-gray-50 rounded-lg border-none focus:ring-0 text-sm text-gray-600 placeholder-gray-400"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex gap-4 mb-8">
           
           {/* Location Dropdown */}
           <div className="relative">
             <select 
               className="appearance-none pl-8 pr-8 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-600 focus:outline-none cursor-pointer hover:bg-gray-50"
               value={locationFilter}
               onChange={(e) => {
                  setLocationFilter(e.target.value);
                  setCurrentPage(1); // Reset page on filter change
               }}
             >
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc === "All" ? "Location" : loc}</option>
                ))}
             </select>
             <MapPin className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
             <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
           </div>

           {/* Status Dropdown */}
           <div className="relative">
             <select 
               className="appearance-none pl-8 pr-8 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-600 focus:outline-none cursor-pointer hover:bg-gray-50"
               value={statusFilter}
               onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
               }}
             >
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
             </select>
             <RotateCcw className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
             <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
           </div>
        </div>

        {/* Error Message Display */}
        {errorMsg && <div className="mb-4 text-red-500 bg-red-50 p-3 rounded">{errorMsg}</div>}

        {/* Table Component */}
        <CameraTable 
          cameras={currentItems} 
          loading={loading} 
          onUpdateStatus={updateStatus} 
          onDelete={handleDelete} 
        />

        {/* Pagination Component */}
        {!loading && filteredCameras.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalItems={filteredCameras.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}

      </div>
    </div>
  );
};

export default WobotDashboard;
