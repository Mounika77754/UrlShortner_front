// IntroPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const IntroPage = () => {
  const navigate = useNavigate();
  const fullText = "Shorten your URL";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  // Typing animation
  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 150); // typing speed
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "black", color: "white" }}
    >
      <h1 className="mb-4" style={{ fontSize: "3rem", fontWeight: "bold" }}>
        {text}<span className="blinking-cursor">|</span>
      </h1>
      <button
        className="btn btn-light btn-lg"
        onClick={() => navigate("/login")}
        style={{ color: "black" }}
      >
        Get Started
      </button>
      <style>
        {`
          .blinking-cursor {
            font-weight: 100;
            font-size: 3rem;
            color: white;
            animation: blink 1s infinite;
          }

          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default IntroPage;
