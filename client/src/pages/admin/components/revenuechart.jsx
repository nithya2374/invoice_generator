const RevenueChart = ({ data }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <h3>Revenue Chart</h3>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: "5px" }}>
          <span>{item.month}: </span>
          <div style={{ background: "#4caf50", height: "10px", width: `${item.revenue / 100}px` }}></div>
        </div>
      ))}
    </div>
  );
};

export default RevenueChart;
