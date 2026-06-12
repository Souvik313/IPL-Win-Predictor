import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

function ProbabilityCard({ probability }) {
  const value = Math.round(probability * 100);

  const data = [
    {
      name: "Background",
      value: 100,
      fill: "#90caf9",
    },

    {
      name: "Win",
      value: value,
      fill: "#ff9800",
    },
  ];

  return (
    <div className="prob-card">
      <h2>Win Probability</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={270}>
          <RadialBarChart
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius="68%"
            outerRadius="100%"
            barSize={28}
            cx="50%"
            cy="85%"
          >
            <RadialBar dataKey="value" clockWise cornerRadius={14} />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="center-text">
          <span>{value}%</span>
        </div>
      </div>

      <div className="custom-legend">
        <div>
          <span className="win-box"></span>
          Win Probability
        </div>

        <div>
          <span className="remain-box"></span>
          Losing Probability
        </div>
      </div>

      <p className="chart-note">
        Orange → predicted chance of winning
        <br />
        Blue → remaining probability
      </p>
    </div>
  );
}

export default ProbabilityCard;
