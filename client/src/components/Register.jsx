import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      toast.success("Registration successful! 🎉");
      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed! ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <Row className="w-100">
          <Col
            xs={12}
            md={6}
            lg={4}
            className="mx-auto p-4"
            style={{
              background: "white",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password_confirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>

            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
