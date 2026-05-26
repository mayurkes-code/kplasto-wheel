import React, { useState } from "react";

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDJ15kAjGmO_geq7XPMIlGHUCzPzfXMKxc",
  authDomain: "kplastolaunch.firebaseapp.com",
  projectId: "kplastolaunch",
  storageBucket: "kplastolaunch.firebasestorage.app",
  messagingSenderId: "839147346821",
  appId: "1:839147346821:web:81ed664b1a3c1a6448c2ec",
  measurementId: "G-K1GVS67FW6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default function App() {
  const rewards = [
    "₹10 OFF",
    "₹20 OFF",
    "₹50 OFF",
    "₹100 OFF",
    "₹200 OFF",
  ];

  const [result, setResult] = useState("");
  const [coupon, setCoupon] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rotation, setRotation] = useState(0);

  const weightedReward = () => {
    const rand = Math.random() * 100;

    if (rand < 40) return "₹10 OFF";
    if (rand < 70) return "₹20 OFF";
    if (rand < 88) return "₹50 OFF";
    if (rand < 97) return "₹100 OFF";
    return "₹200 OFF";
  };

  const spinWheel = () => {
    if (!name || !phone) {
      alert("Please enter details");
      return;
    }

    const reward = weightedReward();

    const extraRotation = 3600 + Math.floor(Math.random() * 360);

    setRotation(rotation + extraRotation);

    setTimeout(() => {
      setResult(reward);

      const value = reward.replace("₹", "").replace(" OFF", "");

      setCoupon(`KP${value}-${phone.slice(-4)}`);
      addDoc(collection(db, "customers"), {
  name: name,
  phone: phone,
  reward: reward,
  coupon: `KP${value}-${phone.slice(-4)}`,
  createdAt: new Date(),
});
    }, 5000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff7ed",
        fontFamily: "Arial",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          color: "#f97316",
          fontWeight: "900",
        }}
      >
        K PLASTO
      </h1>

      <p
        style={{
          fontSize: "22px",
          color: "#444",
          marginBottom: "40px",
        }}
      >
        Spin & Win Guaranteed Rewards
      </p>

      <div
        style={{
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          border: "12px solid #f97316",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 5s ease-out",
          background:
            "conic-gradient(#f97316 0deg 72deg,#fb923c 72deg 144deg,#fdba74 144deg 216deg,#ea580c 216deg 288deg,#c2410c 288deg 360deg)",
        }}
      >
        {rewards.map((reward, index) => {
          const angle = index * 72;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translate(0,-120px)`,
                transformOrigin: "0 0",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {reward}
            </div>
          );
        })}
      </div>

      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderTop: "40px solid #f97316",
          margin: "20px auto",
        }}
      ></div>

      <div
        style={{
          maxWidth: "400px",
          margin: "30px auto",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />

        <input
          type="tel"
          placeholder="WhatsApp Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />

        <button
          onClick={spinWheel}
          style={{
            width: "100%",
            background: "#f97316",
            color: "white",
            padding: "18px",
            border: "none",
            borderRadius: "15px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          SPIN NOW
        </button>
      </div>

      {result && (
        <div
          style={{
            maxWidth: "400px",
            margin: "30px auto",
            background: "#f97316",
            color: "white",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <h2>🎉 Congratulations 🎉</h2>

          <h1>{result}</h1>

          <div
            style={{
              background: "white",
              color: "#f97316",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "20px",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            {coupon}
          </div>
        </div>
      )}
    </div>
  );
}
