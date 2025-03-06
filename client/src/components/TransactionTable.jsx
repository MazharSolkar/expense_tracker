import { Table, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const TransactionTable = ({ transactions, setTransactions, setSummary }) => {
  const handleDelete = async (transactionId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/transaction/delete/${transactionId}`,
        { withCredentials: true }
      );

      if (!res.data || res.data.status !== "success") {
        return toast.error("Something went wrong! API response is incorrect.");
      }

      setTransactions((prev) => prev.filter((transaction) => transaction._id !== transactionId));

      setSummary((prev) => {
        const deletedTransaction = transactions.find((t) => t._id === transactionId);

        if (!deletedTransaction) return prev;

        return {
          totalIncome:
            deletedTransaction.type === "income"
              ? prev.totalIncome - Number(deletedTransaction.amount)
              : prev.totalIncome,
          totalExpense:
            deletedTransaction.type === "expense"
              ? prev.totalExpense - Number(deletedTransaction.amount)
              : prev.totalExpense,
          totalSavings:
            deletedTransaction.type === "income"
              ? prev.totalSavings - Number(deletedTransaction.amount)
              : prev.totalSavings + Number(deletedTransaction.amount),
        };
      });

      toast.success("Transaction deleted successfully! 🗑️");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <Card className="p-3 shadow">
      <h4 className="text-center mb-3">Transaction History</h4>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((t, index) => (
              <tr key={t._id}>
                <td>{index + 1}</td>
                <td>{t.description}</td>
                <td className={t.type === "income" ? "text-success" : "text-danger"}>₹{t.amount}</td>
                <td>{t.type === "income" ? "Income" : "Expense"}</td>
                <td>{t.date}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(t._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No transactions yet
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default TransactionTable;
