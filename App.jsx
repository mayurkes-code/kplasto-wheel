import React, { useState } from "react";

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
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
  const [timestamp, setTimestamp] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);

  const weightedReward = () => {
    const rand = Math.random() * 100;

    if (rand < 40) return "₹10 OFF";
    if (rand < 70) return "₹20 OFF";
    if (rand < 88) return "₹50 OFF";
    if (rand < 97) return "₹100 OFF";

    return "₹200 OFF";
  };

  const spinWheel = async () => {
    if (!name || !phone) {
      alert("Please enter your details");
      return;
    }

    if (phone.length < 10) {
      alert("Please enter valid WhatsApp number");
      return;
    }

    setLoading(true);

    try {
      const checkQuery = query(
        collection(db, "customers"),
        where("phone", "==", phone)
      );

      const snapshot = await getDocs(checkQuery);

      if (!snapshot.empty) {
        alert("This WhatsApp number has already used the spin.");
        setLoading(false);
        return;
      }

      const reward = weightedReward();

      const extraRotation =
        3600 + Math.floor(Math.random() * 360);

      setRotation((prev) => prev + extraRotation);

      setTimeout(async () => {
        setResult(reward);

        const value = reward
          .replace("₹", "")
          .replace(" OFF", "");

        const now = new Date();

        const formattedTime =
          now.getDate() +
          "/" +
          (now.getMonth() + 1) +
          "/" +
          now.getFullYear() +
          " " +
          now.getHours() +
          ":" +
          now.getMinutes();

        setTimestamp(formattedTime);

        const generatedCoupon =
          `KP${value}-${phone.slice(-4)}`;

        setCoupon(generatedCoupon);

        await addDoc(collection(db, "customers"), {
          name: name,
          phone: phone,
          reward: reward,
          coupon: generatedCoupon,
          createdAt: formattedTime,
        });

        setLoading(false);

      }, 5000);

    } catch (error) {
      console.log(error);

      alert("Something went wrong");

      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "Arial",
        padding: "30px",
        textAlign: "center",
        color: "white",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.45)",
          minHeight: "100vh",
          padding: "30px",
          borderRadius: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "65px",
            fontWeight: "900",
            color: "#ff8c00",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            marginBottom: "10px",
          }}
        >
          K PLASTO
        </h1>

        <p
          style={{
            fontSize: "24px",
            marginBottom: "40px",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          Spin & Win Guaranteed Rewards
        </p>

        <div
          style={{
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            border: "12px solid #ff8c00",
            margin: "0 auto",
            position: "relative",
            overflow: "hidden",
            transform: `rotate(${rotation}deg)`,
            transition: "transform 5s ease-out",
            background:
              "conic-gradient(#f97316 0deg 72deg,#fb923c 72deg 144deg,#fdba74 144deg 216deg,#ea580c 216deg 288deg,#c2410c 288deg 360deg)",
            boxShadow: "0 0 40px rgba(255,140,0,0.6)",
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
                  transform:
                    `rotate(${angle}deg) translate(0,-125px)`,
                  transformOrigin: "0 0",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "20px",
                  textShadow: "0 2px 5px black",
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
            borderTop: "40px solid #ff8c00",
            margin: "20px auto",
          }}
        ></div>

        <div
          style={{
            maxWidth: "420px",
            margin: "30px auto",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            padding: "30px",
            borderRadius: "25px",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
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
              border: "none",
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
              border: "none",
              fontSize: "16px",
            }}
          />

          <button
            onClick={spinWheel}
            disabled={loading}
            style={{
              width: "100%",
              background: "#ff8c00",
              color: "white",
              padding: "18px",
              border: "none",
              borderRadius: "15px",
              fontSize: "22px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 5px 20px rgba(255,140,0,0.5)",
            }}
          >
            {loading ? "PLEASE WAIT..." : "SPIN NOW"}
          </button>
        </div>

        {result && (
          <div
            style={{
              maxWidth: "420px",
              margin: "30px auto",
              background: "rgba(255,140,0,0.95)",
              color: "white",
              padding: "30px",
              borderRadius: "25px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            }}
          >
            <h2>🎉 Congratulations 🎉</h2>

            <h1>{result}</h1>

            <div
              style={{
                background: "white",
                color: "#ff8c00",
                padding: "15px",
                borderRadius: "12px",
                marginTop: "20px",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {coupon}

              <div
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  color: "#444",
                }}
              >
                {timestamp}
              </div>
            </div>

            <p style={{ marginTop: "15px" }}>
              Show this coupon at billing counter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
