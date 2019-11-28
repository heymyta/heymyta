import React, { useState } from 'react';
import { 
  Container, Modal,
  Button
} from 'react-bootstrap';
interface MyProps {
}

function Footer(props: MyProps) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <footer className="text-muted" >

      </footer>
    </div>
  );
}

export default Footer;