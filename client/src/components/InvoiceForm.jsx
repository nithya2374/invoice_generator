import { useState } from "react";

const InvoiceForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    clientName: "",
    invoiceNumber: "",
    date: "",
    amount: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ clientName: "", invoiceNumber: "", date: "", amount: "", status: "Pending" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
      <input name="clientName" placeholder="Client Name" value={form.clientName} onChange={handleChange} />
      <input name="invoiceNumber" placeholder="Invoice Number" value={form.invoiceNumber} onChange={handleChange} />
      <input type="date" name="date" value={form.date} onChange={handleChange} />
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Pending</option>
        <option>Paid</option>
        <option>Overdue</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default InvoiceForm;
