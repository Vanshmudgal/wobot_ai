import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import WobotDashboard from "./components/WobotDashboard";

function App() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <>
     
      <WobotDashboard/>
    </>
  );
}

export default App;
