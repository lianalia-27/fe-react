import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const NavbarComponent = () => {
    return (
         <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Belajar React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#user">User</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Amelia Ardani</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default NavbarComponent;