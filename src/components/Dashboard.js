import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home.js";
import Track from "./Track.js";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "track":
        return <Track />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "220px", minHeight: "100vh" }}
      >
        <h4 className="text-center mb-4">URL Shortener</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${
                activePage === "home" ? "btn-primary" : "btn-outline-light"
              }`}
              onClick={() => setActivePage("home")}
            >
              Home
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${
                activePage === "track" ? "btn-primary" : "btn-outline-light"
              }`}
              onClick={() => setActivePage("track")}
            >
              Track
            </button>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-grow-1 p-4 bg-light">
        {renderPage()}
      </div>
    </div>
  );
}
