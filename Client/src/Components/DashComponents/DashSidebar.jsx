import React, { useState } from "react";
import { Collapse } from "react-bootstrap"; // Import Bootstrap Collapse for sidebar
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const [open, setOpen] = useState(true); // Sidebar initial state (open or collapsed)

  return (
    <div>
      {/* Button to toggle Sidebar visibility */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: "20px",
          left: open ? "250px" : "0", // Button's position changes based on sidebar state
          zIndex: 9999,
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        {open ? "<" : ">"}
      </button>

      {/* Sidebar Content */}
      <Collapse in={open}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100vh",
            backgroundColor: "#343a40", // Dark background for the sidebar
            color: "#fff", // White text
            overflowY: "auto",
            zIndex: 1000,
            transition: "left 0.3s ease", // Smooth slide transition
            left: open ? "0" : "-250px", // Sidebar sliding effect
            paddingTop: "50px",
          }}
        >
          {/* Links inside Sidebar */}
          <div style={{ padding: "15px" }}>
            <a
              href="#home"
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                padding: "10px",
                fontSize: "16px",
                borderBottom: "1px solid #ddd", // Add space between links
              }}
            >
              Home
            </a>
            <a
              href="#about"
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                padding: "10px",
                fontSize: "16px",
                borderBottom: "1px solid #ddd", // Add space between links
              }}
            >
              About Us
            </a>
            <a
              href="#contact"
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                padding: "10px",
                fontSize: "16px",
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Sidebar;
