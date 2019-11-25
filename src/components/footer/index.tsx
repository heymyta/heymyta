import React, { useState } from 'react';
import { 
  Container, Modal,
  Button
} from 'react-bootstrap';

import ContactusModal from '../ContactusModal';
interface MyProps {
}

function Footer(props: MyProps) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button onClick={() => setModalShow(true)}>
        Contact us
      </Button>
      <ContactusModal show={modalShow} onHide{() => setModalShow(false)}
    </>
  );
}

export default Footer;