import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/"
       style={{ textDecoration: "none", color: "#4fa94d", fontSize: "20px" }}>
        Go back to Home
      </Link>
    </div>
  );
}
