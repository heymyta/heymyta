import React from 'react';
import { Modal, Row, Col, Container } from 'react-bootstrap';

function Courses() {
  return (
    <Container>
      <Row>
        <Col>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Active TAs</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
          </Modal.Dialog>
        </Col>
        <Col>
         <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Student in Queues</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
          </Modal.Dialog>
        </Col>
        <Col>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Yada</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
          </Modal.Dialog>
        </Col>
      </Row>
    </Container>
  );
}

export default Courses;