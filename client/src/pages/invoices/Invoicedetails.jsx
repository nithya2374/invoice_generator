import { useParams } from "react-router-dom";

const InvoiceDetails = () => {
  const { id } = useParams();

  const invoice = {
    id,
    clientName: "Sample Client",
    amount: 2000,
    date: "2025-07-29",
    status: "Paid",
  };

  return (
    <div>
      <h2>Invoice Details</h2>
      <p>Invoice ID: {invoice.id}</p>
      <p>Client Name: {invoice.clientName}</p>
      <p>Amount: ₹{invoice.amount}</p>
      <p>Date: {invoice.date}</p>
      <p>Status: {invoice.status}</p>
    </div>
  );
};

export default InvoiceDetails;
