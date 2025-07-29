const InvoiceTable = ({ invoices }) => {
  return (
    <table border="1" cellPadding="5" style={{ width: "100%", marginBottom: "10px" }}>
      <thead>
        <tr>
          <th>Invoice #</th>
          <th>Client</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv, index) => (
          <tr key={index}>
            <td>{inv.invoiceNumber}</td>
            <td>{inv.clientName}</td>
            <td>{inv.date}</td>
            <td>₹{inv.amount}</td>
            <td>{inv.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
