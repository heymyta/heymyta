import React, { useState } from 'react';
import { 
  Container, Modal,
  Button
} from 'react-bootstrap';

import ContactUsModal from '../contactUsModal/';
interface MyProps {
}

function Footer(props: MyProps) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div style={{bottom: 0, position: 'fixed', width: '100%'}}>
      <Container className="bg-dark">
        <Button onClick={() => setModalShow(true)}>
          Contact us
        </Button>
      </Container>

      
      <ContactUsModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Footer;