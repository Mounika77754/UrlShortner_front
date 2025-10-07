import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [surl, setSurl] = useState(null);
  const [status, setStatus] = useState(null);

  const hanSub = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://urlshortner-back-h2lv.onrender.com/url",
        { originalUrl: url },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setSurl(res.data);
      setStatus(res.status);
      setUrl("")
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
        setStatus(err.response.status);
        if (err.response.status === 401) window.location.href = "/";
      } else {
        alert("Network error");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">URL Shortener</h2>
        <form onSubmit={hanSub}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Shorten
            </button>
          </div>
        </form>

        {status && <p>Status Code: {status}</p>}

        {surl?.shUrl && (
          <div className="alert alert-success mt-3 text-center">
            <h5>Shortened URL:</h5>
            <a href={surl.shUrl} target="_blank" rel="noopener noreferrer">
              {surl.shUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
