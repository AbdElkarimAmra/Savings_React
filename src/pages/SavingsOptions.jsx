import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


/**
 * Simple SavingsSetup (MVP)
 *
 * After sign‑up, user picks one of three saving options (10%, 15%, 20%).
 * The rest of the income is split automatically into Needs and Wants.
 * For simplicity, we’ll assume Needs = 70% of the remaining amount and Wants = 30%.
 * Color scheme: SHAK orange (#F46B2E) and white to match app identity.
 */
export default function SavingsSetup({ onContinue }) {
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  const handleSelect = (pct) => {
    setSelected(pct);
  };

  const handleContinue = () => {
    if (!selected) return;
    const savings = selected;
    const remaining = 100 - savings;
    const needs = (remaining * 0.7).toFixed(1);
    const wants = (remaining * 0.3).toFixed(1);

    const payload = { savings, needs, wants };
    onContinue?.(payload);

    navigate("/userInfo");

  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F46B2E] text-white px-6 py-10">
      <div className="max-w-md w-full space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight">Choose Your Savings Option</h1>
          <p className="text-white/80 text-sm">Pick one to get started. The rest will be split automatically.</p>
        </header>

        <div className="grid grid-cols-3 gap-4">
          {[10, 15, 20].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handleSelect(pct)}
              className={`rounded-xl px-4 py-6 border text-center transition-colors font-semibold shadow-md ${
                selected === pct
                  ? "bg-white text-[#F46B2E] border-white"
                  : "bg-[#F46B2E]/20 border-white/40 hover:bg-[#F46B2E]/30"
              }`}
            >
              {pct}%
              <div className="text-xs text-white/80 font-normal mt-1">Savings</div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="text-center text-sm text-white/90 bg-white/10 py-3 rounded-xl">
            <p>Your savings: <strong>{selected}%</strong></p>
            <p>Needs: <strong>{(100 - selected) * 0.7}%</strong> | Wants: <strong>{(100 - selected) * 0.3}%</strong></p>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md ${
              selected
                ? "bg-white text-[#F46B2E] hover:opacity-90"
                : "bg-white/30 text-white/60 cursor-not-allowed"
            }`}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </main>
  );
}
