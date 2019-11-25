import React, { useState } from 'react';
import { 
  Container, Modal,
  Button
} from 'react-bootstrap';

interface MyProps {
}

function ContactusModal(props: MyProps) {
  const onSubmit = () => {
    
  }
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Contact us!</Modal.Title>
        </Modal.Header>
        <Modal.Body>..</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ContactusModal;