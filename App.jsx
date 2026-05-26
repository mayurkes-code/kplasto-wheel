import React, { useState, useRef } from "react";
import { Gift, Phone, User, MapPin } from "lucide-react";

export default function KPlastoRewardWheel() {
  const wheelRef = useRef(null);

  const segments = [
    { label: "₹10 OFF", color: "#f97316", probability: 40, coupon: "KP10" },
    { label: "₹20 OFF", color: "#fb923c", probability: 30, coupon: "KP20" },
    { label: "₹50 OFF", color: "#fdba74", probability: 18, coupon: "KP50" },
    { label: "₹100 OFF", color: "#ea580c", probability: 9, coupon: "KP100" },
    { label: "₹200 OFF", color: "#c2410c", probability: 3, coupon: "KP200" },
  ];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState(null);
  const [coupon, setCoupon] = useState("");

  const weightedPick = () => {
    const rand = Math.random() * 100;

    if (rand < 40) return segments[0];
    if (rand < 70) return segments[1];
    if (rand < 88) return segments[2];
    if (rand < 97) return segments[3];
    return segments[4];
  };

  const handleSpin = () => {
    if (!name || !phone) {
      alert("Please enter your name and WhatsApp number.");
      return;
    }

    if (phone.length < 10) {
      alert("Please enter a valid WhatsApp number.");
      return;
    }

    setSpinning(true);

    const selectedReward = weightedPick();

    const index = segments.findIndex(
      (item) => item.label === selectedReward.label
    );

    const anglePerSegment = 360 / segments.length;
    const finalAngle = 3600 + (360 - index * anglePerSegment - 36);

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
      wheelRef.current.style.transform = `rotate(${finalAngle}deg)`;
    }

    setTimeout(() => {
      const last4 = phone.slice(-4);
      const generatedCoupon = `${selectedReward.coupon}-${last4}`;

      setReward(selectedReward.label);
      setCoupon(generatedCoupon);
      setSpinning(false);
    }, 5200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-semibold text-sm shadow-sm">
            <Gift className="w-4 h-4" />
            GRAND LAUNCH OFFER
          </div>

          <h1 className="text-6xl font-black mt-6 text-gray-900 tracking-tight">
            K <span className="text-orange-500">PLASTO</span>
          </h1>

          <p className="text-xl text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
            Spin the wheel and win guaranteed rewards on purchases above ₹1000.
            Every customer wins exciting discounts instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 z-20">
                <div className="w-0 h-0 border-l-[25px] border-r-[25px] border-t-[45px] border-l-transparent border-r-transparent border-t-orange-600 drop-shadow-lg"></div>
              </div>

              <div
                ref={wheelRef}
                className="relative w-[420px] h-[420px] rounded-full border-[14px] border-orange-500 shadow-2xl overflow-hidden"
                style={{ background: "white" }}
              >
                {segments.map((segment, index) => {
                  const rotation = index * (360 / segments.length);

                  return (
                    <div
                      key={index}
                      className="absolute w-1/2 h-1/2 origin-bottom-right flex items-center justify-center text-white font-black text-2xl"
                      style={{
                        background: segment.color,
                        transform: `rotate(${rotation}deg) skewY(-18deg)`,
                        transformOrigin: "100% 100%",
                        clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                        right: "50%",
                        bottom: "50%",
                      }}
                    >
                      <div
                        style={{ transform: "skewY(18deg) rotate(36deg)" }}
                        className="ml-24 mb-10"
                      >
                        {segment.label}
                      </div>
                    </div>
                  );
                })}

                <div className="absolute inset-[33%] rounded-full bg-white shadow-inner flex items-center justify-center border-8 border-orange-100">
                  <div className="text-center">
                    <div className="text-orange-500 text-4xl font-black">KP</div>
                    <div className="text-xs font-semibold text-gray-500 tracking-wide">
                      REWARD WHEEL
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSpin}
              disabled={spinning}
              className="mt-10 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 transition text-white px-14 py-5 rounded-3xl text-2xl font-black shadow-2xl"
            >
              {spinning ? "SPINNING..." : "SPIN NOW"}
            </button>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-[32px] shadow-2xl p-8 border border-orange-100">
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                Enter Your Details
              </h2>

              <div className="space-y-6">
                <div className="relative">
                  <User className="absolute left-4 top-4 text-orange-500" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 text-lg"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-orange-500" />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 text-lg"
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {segments.map((segment, index) => (
                  <div
                    key={index}
                    className="rounded-2xl p-4 text-white font-bold text-center shadow-lg"
                    style={{ background: segment.color }}
                  >
                    {segment.label}
                  </div>
                ))}
              </div>

              <div className="mt-8 text-sm text-gray-500 leading-relaxed">
                * Applicable on minimum purchase of ₹1000 only.<br />
                * One spin per WhatsApp number.<br />
                * Coupons valid for same-day redemption only.
              </div>
            </div>

            {reward && (
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[32px] p-8 text-white shadow-2xl animate-pulse">
                <div className="text-center">
                  <div className="text-2xl font-semibold mb-2">
                    🎉 Congratulations 🎉
                  </div>

                  <div className="text-5xl font-black mb-4">{reward}</div>

                  <div className="bg-white text-orange-600 rounded-2xl px-6 py-5 inline-block shadow-xl">
                    <div className="text-sm font-semibold">Your Coupon Code</div>
                    <div className="text-3xl font-black tracking-widest mt-1">
                      {coupon}
                    </div>
                  </div>

                  <div className="mt-6 text-orange-100 text-lg">
                    Show this coupon at the billing counter.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 bg-white rounded-[36px] p-10 shadow-2xl border border-orange-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-orange-500 text-5xl mb-4">♻️</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Eco Friendly
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Recyclable and sustainable packaging products.
              </p>
            </div>

            <div>
              <div className="text-orange-500 text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Safe & Hygienic
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Premium quality hygienic Ganga Jal cans.
              </p>
            </div>

            <div>
              <div className="text-orange-500 text-5xl mb-4">💧</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Pure Packaging
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Trusted by customers for durable quality.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 text-center">
          <div className="flex justify-center items-center gap-3 text-gray-700 text-lg mb-3">
            <MapPin className="text-orange-500" />
            Shop No. B1, MJ Centre Point Railway Station Rd, Near Trend Store,
            Manvendera Nagar, Rishikesh, Uttarakhand – 249201
          </div>

          <div className="text-3xl font-black text-orange-500 tracking-wide">
            +91 82185 81842
          </div>
        </div>
      </div>
    </div>
  );
}
