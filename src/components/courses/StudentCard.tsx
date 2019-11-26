import React, { Component } from 'react';
import { 
  Toast, Button, 
  Container, Row,
  Col
} from 'react-bootstrap';

interface StudentProps {
  name: string,
}

interface StudentState {
  name: string,
  helping: boolean,
}

class StudentCard extends Component<StudentProps, StudentState> {
  constructor(props: StudentProps) {
    super(props);
    this.state = {
      name: '',
      helping: false,
    }
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      helping: false
    })
  }

  render() {
    return( 
      <Toast>
        <Toast.Header closeButton={false}>
          <strong>{this.state.name}</strong>
        </Toast.Header>
        <Toast.Body>
          <Container>
            <Row>
              <Col md={{ span: 0 }}><Button size="sm" variant="success">Help</Button></Col>
              <Col md={{ span: 1, offset: 2 }}><Button size="sm" variant="danger">Remove</Button></Col>
            </Row>
          </Container>
        </Toast.Body>
      </Toast>
    );
  }
}

export default StudentCard;