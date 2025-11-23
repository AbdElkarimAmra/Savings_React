import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // optional
import { createAcquisitionsChart } from "@/components/pieChart";

export default function Dashboard() {
console.log("API base URL =", import.meta.env.VITE_API_BASE_URL);


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = Cookies.get("token");

  const chartRef = useRef(null);      // Chart.js instance
  const canvasRef = useRef(null);     // <canvas> element
  const hasFetchedRef = useRef(false); // avoid double fetch in StrictMode

  const [messages, setMessages] = useState([
  { role: "assistant", content: "Hi! I’m SHAK. Ask me anything about your budget or this dashboard." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // -------- FETCH RECOMMENDATIONS --------
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    async function fetchRecommendations() {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/user-finances/recommendations`;

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            lastPaycheckCents: 200000,
            currentBalanceCents: 50000,
            savedToGoalCents: 10000,
            needsMonthlyCents: 90000,
            wantsMonthlyCents: 40000,
            housingCents: 55000,
            foodGroceriesCents: 16000,
            transportCents: 10000,
            utilitiesCents: 7000,
            insuranceHealthCents: 5000,
            personalShoppingCents: 6000,
            entertainmentEatingOutCents: 8000,
            subscriptionsCents: 3000,
            miscFunCents: 7000,
            emergencyShortTermCents: 12000,
            longTermInvestingDebtCents: 8000,
          }),
        });

        if (!res.ok) throw new Error("Failed to load data");

        const json = await res.json();
        console.log("DATA:", json);
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [token]);

  // --- CHATBOT SEND MESSAGE FUNCTION 👇 ---
async function handleSendMessage() {
  if (!chatInput.trim()) return;

  const newMessages = [
    ...messages,
    { role: "user", content: chatInput },
  ];
  setMessages(newMessages);
  setChatInput("");
  setChatLoading(true);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: chatInput,
        context: {
          summary: data.summary,
          recommendations: data.recommendations,
          recommendations: data.recommendations
        }
      }),
      
    });

    console.log("RES:", res);

    const json = await res.json() ;
    if (!json.ok) throw new Error(json.error || "Chat failed");

    setMessages(prev => [...prev, { role: "assistant", content: json.reply }]);
  } catch (err) {
    console.error(err);
    setMessages(prev => [
      ...prev,
      { role: "assistant", content: "Sorry, I couldn't respond right now." },
    ]);
  } finally {
    setChatLoading(false);
  }
}

  // -------- CHART EFFECT --------
  useEffect(() => {
    if (!data?.ok) return;
    if (!canvasRef.current) return;

    // destroy old chart
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    chartRef.current = createAcquisitionsChart(canvasRef.current, data);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data]);

  // -------- UI STATES --------
  if (loading) return <p className="text-center mt-10">Loading recommendations...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!data?.ok) return <p className="text-center mt-10">No data available.</p>;

  const { summary, recommendations } = data;

  return (
    // main container
    <div className="min-h-screen bg-orange-50 flex flex-row items-center p-6 gap-160">
      {/* charts / data analysis */}
      <div className=" bg-orange-50 flex flex-col">
       {/* Pie chart canvas */}
      <div style={{ width: 300 }}>
        <canvas ref={canvasRef} />
      </div>
      </div>
      <div className="min-h-screen bg-orange-50 flex flex-col items-center p-6">

        <Card className="w-full max-w-2xl shadow-lg border-0 rounded-2xl bg-white mt-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#F46B2E] text-center">
              SHAK Dashboard
            </CardTitle>
            <p className="text-center text-gray-600">
              Your AI-powered savings overview
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Summary */}
            <section>
              <h2 className="font-semibold text-lg mb-2 text-gray-800">Summary</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                <li>Needs: {summary.totalsPercent.needs}</li>
                <li>Wants: {summary.totalsPercent.wants}</li>
                <li>Savings &amp; Debt: {summary.totalsPercent.savingsDebt}</li>
                <li>Total Used: {summary.totalsPercent.totalUsed}</li>
                <li>Unallocated: {summary.totalsPercent.unallocated}</li>
                <li>Unallocated dollars: ${summary.unallocatedDollars}</li>
              </ul>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="font-semibold text-lg mb-2 text-gray-800">Highlights</h2>
              {recommendations.highlights?.length ? (
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {recommendations.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No highlights available.</p>
              )}
            </section>

            {/* Actions */}
            <section>
              <h2 className="font-semibold text-lg mb-2 text-gray-800">
                Recommended Actions
              </h2>
              {recommendations.actions?.length ? (
                <div className="space-y-2">
                  {recommendations.actions.map((a, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-orange-100 rounded-lg px-3 py-2"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{a.label}</p>
                        <p className="text-xs text-gray-600">{a.rationale}</p>
                      </div>
                      <span className="text-[#F46B2E] font-semibold">
                        +{a.deltaPercent}% {a.dollars ? `($${a.dollars})` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No actions available.</p>
              )}
            </section>

            {/* Notes */}
            <section>
              <h2 className="font-semibold text-lg mb-2 text-gray-800">Notes</h2>
              {recommendations.notes?.length ? (
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {recommendations.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No notes available.</p>
              )}
            </section>
          </CardContent>
        </Card>

        {/* CHATBOT SECTION */}
<div className="w-full max-w-2xl mt-6">
  <h2 className="font-semibold text-lg mb-2 text-gray-800">Ask SHAK</h2>

  <div className="border rounded-2xl bg-white shadow-sm flex flex-col h-64">
    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
      {messages.map((m, i) => (
        <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
          <span
            className={
              "inline-block px-3 py-2 rounded-xl " +
              (m.role === "user"
                ? "bg-[#F46B2E] text-white"
                : "bg-gray-100 text-gray-800")
            }
          >
            {m.content}
          </span>
        </div>
      ))}
    </div>

    <form
      className="flex border-t"
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
    >
      <input
        className="flex-1 px-3 py-2 text-sm outline-none rounded-bl-2xl"
        placeholder="Ask about your budget..."
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
      />
      <button
        type="submit"
        disabled={chatLoading}
        className="px-4 py-2 text-sm font-semibold text-white bg-[#F46B2E] rounded-br-2xl disabled:opacity-50"
      >
        {chatLoading ? "..." : "Send"}
      </button>
    </form>
  </div>
</div>
      </div>
      

    </div>
  );
}
