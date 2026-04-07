import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

//function AuthCard() {
//}

const AuthCard = ({ title, children }) => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">{title} </h3>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthCard;
