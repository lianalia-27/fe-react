import { use, useEffect, useState } from "react";
import { Container, Table, Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import api from "../utils/api";
import Swal from "sweetalert2";

const RolePage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
    setFormData({ name: "" });
    setErrors({});
  };

  const handleShow = () => setShow(true);

  const fetchRoles = async () => {
    try {
      const res = await api.get("/roles");
      setRoles(res.data?.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to fetch roles", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (isEdit) {
        const res = await api.put(`/roles/${currentId}`, formData);
        Swal.fire("Success!", res.data.message, "success");
        handleClose();
        fetchRoles();
        setFormData({ name: "" });
      } else {
        const res = await api.post("/roles", formData);
        Swal.fire("Success!", res.data.message, "success");
        handleClose();
        fetchRoles();
        setFormData({ name: "" });
      }
    } catch (error) {
      console.log(error.response.data?.error);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data?.error);
      } else {
        Swal.fire("Error", "Failed create new data", "error");
      }
    }
  };

  const handleEdit = (role) => {
    setIsEdit(true);
    setCurrentId(role.id);
    setFormData({
      name: role?.name,
    });

    handleShow();
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure??",
      text: "Deleted data cannot be recovered!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await api.delete(`/roles/${id}`);
          Swal.fire("Deleted", res.data.message, "success");
          fetchRoles();
        } catch (error) {
          console.log(error);
          Swal.fire("Failed!!", "Cannot deleted this data", "error");
        }
      }
    });
  };

  useEffect(() => {
    // 1.apa yang mau dilakukan
    fetchRoles();
  }, []); //[]: cukup 1 kali perintah fetchUsers/users dijalankan

  return (
    <>
      <NavbarComponent />
      <Container>
        <Row>
          <Col md={12}>
            <Card className="shadow-sm border-0 mt-3">
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <h3>Data Role</h3>
                  <Button variant="primary" onClick={handleShow}>
                    Create New Role
                  </Button>
                </div>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.length > 0 ? (
                      roles.map((role, index) => (
                        <tr key={role.id}>
                          <td>{index + 1}</td>
                          <td>{role.name}</td>
                          <td>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(role)}>
                              Edit
                            </Button>
                            <Button onClick={() => handleDelete(role.id)} variant="danger" size="sm" className="me-2">
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          Data Empty
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? "Edit Role" : "Create New Role"}</Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">Name</Form.Label>
                        <Form.Control value={formData?.name} onChange={handleChange} isInvalid={!!errors?.name} name="name" type="text" placeholder="Enter your name"></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.name?.[0]}</Form.Control.Feedback>
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

export default RolePage;