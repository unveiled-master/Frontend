import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { day: "Mon", stockIn: 120, stockOut: 80 },
  { day: "Tue", stockIn: 90, stockOut: 110 },
  { day: "Wed", stockIn: 150, stockOut: 95 },
  { day: "Thu", stockIn: 100, stockOut: 130 },
  { day: "Fri", stockIn: 180, stockOut: 120 },
  { day: "Sat", stockIn: 140, stockOut: 100 },
  { day: "Sun", stockIn: 200, stockOut: 150 },
];

function InventoryActivity() {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            width={40}
          />

          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="stockIn"
            name="Stock In"
            stroke="#059669"
            strokeWidth={2.5}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="stockOut"
            name="Stock Out"
            stroke="#f59e0b"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InventoryActivity;