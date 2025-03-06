import { Row, Col, Card } from "react-bootstrap";

const SummaryCards = ({ summary }) => {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="text-center text-white bg-success p-3">
          <Card.Body>
            <Card.Title>Total Income</Card.Title>
            <h3>₹{summary.totalIncome}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center text-white bg-danger p-3">
          <Card.Body>
            <Card.Title>Total Expense</Card.Title>
            <h3>₹{summary.totalExpense}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center text-white bg-primary p-3">
          <Card.Body>
            <Card.Title>Total Savings</Card.Title>
            <h3>₹{summary.totalSavings}</h3>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryCards;