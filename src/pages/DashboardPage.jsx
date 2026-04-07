import { Row, Col, Container, Table, Card } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";


const DashboardPage = () => {
  return (
    <>
      <NavbarComponent />
      <Container className="mt-5">
        <Row>
          <Col md={12}>
          <Card className="shadow-sm border-0 mt-3">
            <Card.Body>
                <h3>Data Pengguna</h3>
                <Table stripped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="td"></tr>
                        <tr className="td"></tr>
                        <tr className="td"></tr>
                        <tr className="td"></tr>
                    </tbody>
                </Table>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardPage;
