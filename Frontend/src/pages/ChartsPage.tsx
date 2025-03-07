import { useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Dummy data added
const dummyData = Array.from({ length: 52 }, (_, i) => ({
  week: `W${(i + 1).toString().padStart(2, "0")}`,
  gmDollars: Math.floor(Math.random() * 150000) + 50000,
  gmPercent: Math.floor(Math.random() * 30) + 20,
}));

const generateData = () => {
  const data = [];
  for (let i = 1; i <= 52; i++) {
    const week = `W${i.toString().padStart(2, "0")}`;
    const gmDollars = Math.floor(Math.random() * 150000) + 50000;
    const gmPercent = Math.floor(Math.random() * 30) + 20;
    data.push({ week, gmDollars, gmPercent });
  }
  return data;
};

const chartData = dummyData; // Use dummy data instead of generated data

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) => `${value}%`;

export default function ChartsPage() {
  const [location, setLocation] = useState("San Francisco Bay Trends");
  const locations = [
    "San Francisco Bay Trends",
    "Los Angeles Trends",
    "New York Trends",
    "Chicago Trends",
    "Seattle Trends",
  ];

  return (
    <div className="w-full p-4">
      {/* Dropdown */}
      <div className="mb-4 relative">
        <button 
          className="w-full sm:w-auto px-4 py-2 border-2 border-gray-300 rounded-lg flex justify-between items-center" 
          onClick={() => {
            const dropdown = document.getElementById("dropdown");
            if (dropdown) dropdown.classList.toggle("hidden");
          }}
        >
          {location} <span className="ml-2">▼</span>
        </button>
        <div id="dropdown" className="absolute left-0 w-56 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg hidden z-20">
          {locations.map((loc) => (
            <div
              key={loc}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setLocation(loc);
                const dropdown = document.getElementById("dropdown");
                if (dropdown) dropdown.classList.add("hidden");
              }}
            >
              {loc}
            </div>
          ))}
        </div>
      </div>

      {/* Chart Card */}
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg border border-gray-700 min-w-[700px]">
        <h2 className="text-center text-lg font-bold">Gross Margin</h2>
        <div className="h-[500px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" vertical={false} />
              <XAxis dataKey="week" stroke="#999" tick={{ fill: "#999" }} angle={-45} textAnchor="end" tickMargin={10} />
              <YAxis yAxisId="left" stroke="#999" tick={{ fill: "#999" }} tickFormatter={formatCurrency} domain={[0, 250000]} />
              <YAxis yAxisId="right" orientation="right" stroke="#999" tick={{ fill: "#999" }} tickFormatter={formatPercent} domain={[0, 70]} />
              <Tooltip
                formatter={(value, name) =>
                  name === "gmDollars"
                    ? [formatCurrency(Number(value)), "GM Dollars"]
                    : [formatPercent(Number(value)), "GM %"]
                }
                contentStyle={{ backgroundColor: "#444", border: "none" }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend verticalAlign="bottom" height={36} />
              <Bar yAxisId="left" dataKey="gmDollars" fill="#4dabf5" name="GM Dollars" barSize={10} />
              <Line yAxisId="right" type="monotone" dataKey="gmPercent" stroke="#ff7043" name="GM %" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
