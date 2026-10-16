import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", added: 450, sold: 320, remaining: 1200 },
  { month: "Feb", added: 380, sold: 350, remaining: 1230 },
  { month: "Mar", added: 520, sold: 410, remaining: 1340 },
  { month: "Apr", added: 400, sold: 360, remaining: 1380 },
  { month: "May", added: 600, sold: 480, remaining: 1500 },
  { month: "Jun", added: 480, sold: 390, remaining: 1590 },
  { month: "Jul", added: 550, sold: 430, remaining: 1710 },
  { month: "Aug", added: 620, sold: 510, remaining: 1820 },
  { month: "Sep", added: 500, sold: 420, remaining: 1900 },
  { month: "Oct", added: 580, sold: 460, remaining: 2020 },
  { month: "Nov", added: 700, sold: 540, remaining: 2180 },
  { month: "Dec", added: 650, sold: 600, remaining: 2230 },
];

function InventoryPerformance() {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            width={45}
          />

          <Tooltip
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #e2e8f0",
            }}
          />

          <Legend />

          <Bar
            dataKey="added"
            name="Added"
            fill="#059669"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="sold"
            name="Sold"
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="remaining"
            name="Remaining"
            fill="#64748b"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InventoryPerformance;