import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import AuthCard from "../components/AuthCard";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    event.preventDefault();
    setErrors({});

    try {
      const res = await axios.post("http://localhost:8000/api/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      Swal.fire({
        icon: "success",
        title: "Login success",
        text: res.data?.message || "Welcome",
        time: 2000,
        showConfirmButton: false,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data?.errors);
      } else if (error.response.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Login failed",
          text: error.response.data?.message || "Please check your email or password!!",
        });
      }
    }
  };
  return (
    <AuthCard title="Login Form">
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control isInvalid={!!errors?.email} name="email" onChange={handleChange} type="email" placeholder="Enter your mail"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control isInvalid={!!errors?.email} name="password" onChange={handleChange} type="password" placeholder="Enter your mail"></Form.Control>
        </Form.Group>
        <Button variant="primary" className="w-100" type="submit">
          Login
        </Button>

        <div className="text-center">
          <small>
            Dont have an account ? <Link to="/register">Register</Link>
          </small>
        </div>
      </Form>
    </AuthCard>
  );
};

export default LoginPage;