import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { category: "Electronics", products: 145 },
  { category: "Beverages", products: 120 },
  { category: "Groceries", products: 98 },
  { category: "Personal Care", products: 76 },
  { category: "Accessories", products: 52 },
];

function TopCategories() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, bottom: 5, left: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
          />

          <XAxis type="number" axisLine={false} tickLine={false} />

          <YAxis
            type="category"
            dataKey="category"
            width={110}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Bar
            dataKey="products"
            name="Products"
            fill="#059669"
            radius={[0, 5, 5, 0]}
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopCategories;