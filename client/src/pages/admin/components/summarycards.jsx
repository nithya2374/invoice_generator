const SummaryCards = ({ summary }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      {summary.map((item, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px", flex: 1 }}>
          <h4>{item.title}</h4>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
