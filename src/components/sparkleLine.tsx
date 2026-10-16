import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

type SparklineProps = {
  data: number[];
  color?: string;
};

function Sparkline({
  data,
  color = "#059669",
}: SparklineProps) {
  const chartData = data.map((value, index) => ({
    index,
    value,
  }));

  return (
    <div style={{ width: "100%", height: 55 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 4, bottom: 2, left: 4 }}
        >
          <defs>
            <linearGradient
              id="sparklineGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={color}
                stopOpacity={0.22}
              />
              <stop
                offset="100%"
                stopColor={color}
                stopOpacity={0.01}
              />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            fill="url(#sparklineGradient)"
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Sparkline;