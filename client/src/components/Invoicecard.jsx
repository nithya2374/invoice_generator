const InvoiceCard = ({ invoice }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", borderRadius: "5px" }}>
      <h3>{invoice.clientName}</h3>
      <p>Invoice #: {invoice.invoiceNumber}</p>
      <p>Date: {invoice.date}</p>
      <p>Amount: ₹{invoice.amount}</p>
      <p>Status: {invoice.status}</p>
    </div>
  );
};

export default InvoiceCard;
