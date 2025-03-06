import { useState } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const TransactionForm = ({ setTransactions, setSummary }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "income",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/transaction/store",
        formData,
        { withCredentials: true }
      );

      if (!res.data || res.data.status !== "success" || !res.data.transaction) {
        return toast.error("Something went wrong! API response is incorrect.");
      }

      const newTransaction = res.data.transaction;

      setTransactions((prev) => [newTransaction, ...prev]);

      setSummary((prev) => ({
        totalIncome:
          newTransaction.type === "income"
            ? prev.totalIncome + Number(newTransaction.amount)
            : prev.totalIncome,
        totalExpense:
          newTransaction.type === "expense"
            ? prev.totalExpense + Number(newTransaction.amount)
            : prev.totalExpense,
        totalSavings:
          newTransaction.type === "income"
            ? prev.totalSavings + Number(newTransaction.amount)
            : prev.totalSavings - Number(newTransaction.amount),
      }));

      setFormData({ description: "", amount: "", type: "income", date: "" });

      toast.success("Transaction added successfully! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add transaction");
    }
  };

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <Card className="p-4 shadow">
          <h4 className="text-center mb-3">Add Transaction</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Add Transaction
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default TransactionForm;
