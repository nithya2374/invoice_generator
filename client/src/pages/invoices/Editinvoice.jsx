import { useState } from "react";
import { useParams } from "react-router-dom";

const EditInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({
    clientName: "Sample Client",
    amount: "1000",
    date: "2025-07-29",
    status: "Pending",
  });

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Invoice Updated:", id, invoice);
  };

  return (
    <div>
      <h2>Edit Invoice #{id}</h2>
      <form onSubmit={handleSubmit}>
        <input name="clientName" value={invoice.clientName} onChange={handleChange} />
        <input name="amount" value={invoice.amount} onChange={handleChange} />
        <input type="date" name="date" value={invoice.date} onChange={handleChange} />
        <select name="status" value={invoice.status} onChange={handleChange}>
          <option>Pending</option>
          <option>Paid</option>
          <option>Overdue</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditInvoice;
