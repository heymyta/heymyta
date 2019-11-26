import React, { Component } from 'react';
import { 
  Toast, Button, 
  Container, Row,
  Col
} from 'react-bootstrap';
import { cpus } from 'os';

interface StudentProps {
  name: string,
}

interface StudentState {
  name: string,
  helping: boolean,
}

class StudentQueueCard extends Component<StudentProps, StudentState> {
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
          <Container>
            <Row>
              <Col>
                <span>{this.state.name}</span>
              </Col>
              <Col>
                <Row><Button size="sm" variant="success">Help</Button></Row>
                <Row><Button size="sm" variant="danger">Remove</Button></Row>
              </Col>
            </Row>
          </Container>
        </Toast.Header>
      </Toast>
    );
  }
}

export default StudentQueueCard;