import { useEffect, useState } from "react";
import { Row, Col, Container, Table, Card, Button, Modal, Form } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import api from "../utils/api";
import Swal from "sweetalert2";

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      role_id: "",
    });
    setErrors({});
  };

  const handleShow = () => setShow(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data?.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (isEdit) {
        const res = await api.put(`/users/${currentId}`, formData);
         Swal.fire("Success", res.data.message, "success");
        handleClose();
        fetchUsers();
        setFormData({
          name: "",
          email: "",
          password: "",
        });

      } else {
        const res = await api.post("/users", formData);
        Swal.fire("Success", res.data.message, "success");
        handleClose();
        fetchUsers();
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data?.error);
      } else {
        Swal.fire("Error", "Failed to create new data", "error");
      }
    }
  };


  const handleEdit = (user) => {
    console.log(user);
    setIsEdit(true);
    setCurrentId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
    });
    handleShow();
  };

const handleDelete = async (user) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await api.delete(`/users/${id}`);
        Swal.fire("Deleted!", res.data.message, "success");
        fetchUsers();
      } catch (error) {
        console.log(error);
        Swal.fire("Failed!!", "Failed to delete user", "error");
      }
    }
  });
};

  useEffect(() => {
    // apa yang terjadi ketika halaman dashboard dibuka, maka akan memanggil fungsi fetchUsers untuk mengambil data pengguna dari API
    fetchUsers();
  }, []);

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Card className="shadow-sm border-0 mt-3">
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <h3>Data User</h3>
                  <Button variant="primary" onClick={handleShow}>
                    Create New User
                  </Button>
                </div>

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEdit(user)}>Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              className="me-2"
                              onClick={() => handleDelete(user)}>Delete
                            </Button>

                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? "Edit User" : "Create New User"}</Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          isInvalid={!!errors?.name}
                          placeholder="Enter your Name"
                          value={formData?.name}
                          onChange={handleChange}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors?.name?.[0]}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          isInvalid={!!errors?.email}
                          placeholder="Enter your email"
                          value={formData?.email}
                          onChange={handleChange}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors?.email?.[0]}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          isInvalid={!!errors?.password}
                          placeholder="Enter your password"
                          onChange={handleChange}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors?.password?.[0]}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardPage;
