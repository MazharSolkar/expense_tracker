import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SummaryCards from "./SummaryCards";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";
import axios from "axios";

const ExpenseTracker = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, totalSavings: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:3000/api/transaction", { withCredentials: true });
      setSummary(res.data.summary || {});
      setTransactions(res.data.transactions || []);
    })();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Expense Tracker</h2>
      <SummaryCards summary={summary} />
      <TransactionForm setTransactions={setTransactions} setSummary={setSummary} />
      <TransactionTable transactions={transactions} setTransactions={setTransactions} setSummary={setSummary} />
    </Container>
  );
};

export default ExpenseTracker;
