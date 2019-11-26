import React, { useState } from 'react';
import { 
  Container, Modal,
  Button, Row
} from 'react-bootstrap';

import ContactUsModal from '../contactUsModal/';
interface MyProps {
}

function Footer(props: MyProps) {
  const [modalShow, setModalShow] = useState(false);

  return (
    /*<div style={{bottom: 0, position: 'fixed', width: '100%'}}>
      <Container className="bg-dark">
        <Button onClick={() => setModalShow(true)}>
          Contact us
        </Button>
      </Container>

      
      <ContactUsModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>*/
    <div>
      <hr className="featurette-divider" />
      
      <footer className="text-muted" >
        <div className="container">
        <Row>
          <p>
            <Button variant="link" onClick={() => setModalShow(true)}>
              Contact us
            </Button>
          </p>
          </Row>
        </div>
      </footer>
      
      <ContactUsModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Footer;