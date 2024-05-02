import { useState, useEffect } from "react";
import Navbar from "./components/Appbar";
import Home from "./pages/Home";
import Admindashboard from "./pages/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const [strength, setStrength] = useState("medium");
  useEffect(() => {
    const fetchStrictness = async () => {
      try {
        const response = await fetch("http://localhost:4000/strictness");
        if (!response.ok) {
          throw new Error("Failed to fetch strictness");
        }
        const data = await response.json();

        setStrength(data.strictness.level); // Update the state with the fetched strictness
      } catch (error) {
        console.error("Error fetching strictness:", error);
        // Handle fetch error (e.g., display an error message)
      }
    };

    fetchStrictness();
  }, []); // The empty array ensures this effect runs only once when the component mounts

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              component={Admindashboard}
              strength={strength}
              setStrength={setStrength}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
