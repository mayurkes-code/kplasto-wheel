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
      // CHECK EXISTING NUMBER
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

      // GENERATE REWARD
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

        // SAVE TO FIREBASE
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
        background: "#f5efe5",
        fontFamily: "Arial",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          color: "#ff7a00",
          fontWeight: "900",
          marginBottom: "10px",
        }}
      >
        K PLASTO
      </h1>

      <p
        style={{
          fontSize: "22px",
          color: "#333",
          marginBottom: "40px",
        }}
      >
        Spin & Win Guaranteed Rewards
      </p>

      {/* WHEEL */}
      <div
        style={{
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          border: "12px solid #ff7a00",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 5s ease-out",
          background:
            "conic-gradient(#ff7a00 0deg 72deg,#f7933a 72deg 144deg,#f1b36a 144deg 216deg,#f35b04 216deg 288deg,#cf4307 288deg 360deg)",
          boxShadow: "0 0 35px rgba(255,122,0,0.4)",
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
                  `rotate(${angle}deg) translate(0,-130px)`,
                transformOrigin: "0 0",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                textShadow: "0 2px 5px rgba(0,0,0,0.4)",
              }}
            >
              {reward}
            </div>
          );
        })}
      </div>

      {/* POINTER */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "22px solid transparent",
          borderRight: "22px solid transparent",
          borderTop: "45px solid #ff7a00",
          margin: "15px auto 35px",
        }}
      ></div>

      {/* FORM */}
      <div
        style={{
          maxWidth: "420px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(10px)",
          padding: "35px",
          borderRadius: "28px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "18px",
            borderRadius: "15px",
            border: "2px solid #ddd",
            fontSize: "17px",
            outline: "none",
          }}
        />

        <input
          type="tel"
          placeholder="WhatsApp Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "22px",
            borderRadius: "15px",
            border: "2px solid #ddd",
            fontSize: "17px",
            outline: "none",
          }}
        />

        <button
          onClick={spinWheel}
          disabled={loading}
          style={{
            width: "100%",
            background: "#ff7a00",
            color: "white",
            padding: "18px",
            border: "none",
            borderRadius: "18px",
            fontSize: "24px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 5px 20px rgba(255,122,0,0.4)",
          }}
        >
          {loading ? "PLEASE WAIT..." : "SPIN NOW"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div
          style={{
            maxWidth: "420px",
            margin: "35px auto",
            background: "#ff7a00",
            color: "white",
            padding: "30px",
            borderRadius: "25px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h2>🎉 Congratulations 🎉</h2>

          <h1
            style={{
              fontSize: "42px",
              marginTop: "10px",
            }}
          >
            {result}
          </h1>

          <div
            style={{
              background: "white",
              color: "#ff7a00",
              padding: "18px",
              borderRadius: "15px",
              marginTop: "20px",
              fontWeight: "bold",
              fontSize: "26px",
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

          <p style={{ marginTop: "18px" }}>
            Show this coupon at billing counter.
          </p>
        </div>
      )}
    </div>
  );
}
