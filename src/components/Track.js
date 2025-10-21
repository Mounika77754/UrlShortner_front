import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Track() {
  const [urlinfo, setUrlinfo] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // store which card is expanded

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://urlshortner-back-h2lv.onrender.com/urlinfo",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data) {
        setUrlinfo(res.data);
      } else {
        alert("No data found");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
        URL Tracker
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
        }}
      >
        {urlinfo.map((item, index) => {
          const isExpanded = expandedId === item._id;

          return (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                padding: "1.5rem",
                width: "300px",
                transition: "transform 0.2s, max-height 0.3s",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                wordBreak: "break-all",
                cursor: "pointer",
              }}
              onClick={() =>
                setExpandedId(isExpanded ? null : item._id)
              }
            >
              <p>
                <strong>Short URL:</strong>{" "}
                <a
                  href={item.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1d4ed8", wordBreak: "break-all" }}
                >
                  {item.shortUrl}
                </a>
              </p>
              <p>
                <strong>Original URL:</strong>{" "}
                <a
                  href={item.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1d4ed8", wordBreak: "break-all" }}
                >
                  {item.originalUrl}
                </a>
              </p>
              <p>
                <strong>Clicks:</strong> {item.clicks}
              </p>

              {isExpanded && (
                <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                  <strong>Access Info:</strong>
                  {item.accessInfo.length > 0 ? (
                    item.accessInfo.map((access, idx) => (
                      <div
                        key={idx}
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.5rem",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "5px",
                        }}
                      >
                        <p>IP: {access.ip}</p>
                        <p>Country: {access.country}</p>
                        <p>Device: {access.device}</p>
                        <p>Browser: {access.browser}</p>
                        <p>
                          Accessed At:{" "}
                          {new Date(access.accessedAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No access info yet.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
