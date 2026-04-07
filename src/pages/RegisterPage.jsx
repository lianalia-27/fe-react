import {useState} from "react";
import { Form, Button} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import AuthCard from "../components/AuthCard";
import { Link, useNavigate } from "react-router-dom";



function RegisterPage () {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [errors, setErrors] = useState([]);
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    const handleRegister = async(e) => {
        e.preventDefault();
        setErrors([]);

        try {
            const res = await axios.post("http://localhost:8000/api/register", formData);
            const successMsg = res.data.message;
           Swal.fire({
            icon: "success",
            title: "Success Registration",
            text: successMsg,
            timer: 2000,
            showConfirmButton: false
           });
            navigate("/login");
        } catch (error) {
            if(error.response && error.response.status === 422){
                console.log(error.response.data?.error);
                setErrors(error.response.data?.errors);
            } else {
                const errorMsg = error.response?.data?.message || "Internal server error";
                Swal.fire({
                    icon: "error",
                    title: "error Registration",
                    text: errorMsg,
                    timer: 2000,       
           }); 
           
         }
    }
};




    return (
        <AuthCard title="Register Form">
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label">Name</Form.Label>
                    <Form.Control type="text" name="name" 
                    isInvalid={!!errors?.name}
                    placeholder="Enter your Name" onChange={handleChange}></Form.Control>
                    <Form.Control.Feedback type="invalid">{errors?.name?.[0]}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label">Email address</Form.Label>
                    <Form.Control type="email" name="email" isInvalid={!!errors?.email} placeholder="Enter your email"  onChange={handleChange}></Form.Control>
                    <Form.Control.Feedback type="invalid">{errors?.email?.[0]}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control type="password" name="password" isInvalid={!!errors?.password} placeholder="Enter your password" onChange={handleChange}></Form.Control>
                    <Form.Control.Feedback type="invalid">{errors?.password?.[0]}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label">Confirmation Password</Form.Label>
                    <Form.Control type="password" name="password_confirmation" isInvalid={!!errors?.password_confirmation} placeholder="Confirmation your password" onChange={handleChange}></Form.Control>
                    <Form.Control.Feedback type="invalid">{errors?.password_confirmation?.[0]}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" className="w-100" type="submit">
                    Save
                </Button>

                <div className="text-center">
                     <small>
                         Dont have an account?{""}
                        <Link to="/login">Login</Link>
                    </small>
                </div>
            </Form>
        </AuthCard>
    );
};

export default RegisterPage