import React from "react";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: "#fff7ed",
      fontFamily: "Arial"
    }}>
      <h1 style={{
        fontSize: "60px",
        color: "#f97316",
        fontWeight: "900"
      }}>
        K PLASTO
      </h1>

      <p style={{
        fontSize: "24px",
        color: "#444",
        marginTop: "10px"
      }}>
        Reward Wheel Launch App
      </p>

      <button style={{
        marginTop: "30px",
        background: "#f97316",
        color: "white",
        border: "none",
        padding: "18px 40px",
        borderRadius: "20px",
        fontSize: "22px",
        fontWeight: "bold",
        cursor: "pointer"
      }}>
        SPIN NOW
      </button>
    </div>
  );
}
