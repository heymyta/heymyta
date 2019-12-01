import React, { Component } from 'react';
import { 
  Toast, Button, 
  Container, Row,
  Col, ButtonGroup
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
    });
  }

  render() {
    return( 
      <Toast>
        <Toast.Header closeButton={false}>
          <Container fluid>
            <Row>
              <Col md={9}>
                <span>{this.props.name}</span>
              </Col>
              <Col md={3}>
                <ButtonGroup vertical>
                  <Button size="sm" variant="success">Help</Button>
                  <Button size="sm" variant="danger">Remove</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Container>
        </Toast.Header>
      </Toast>
    );
  }
}

export default StudentQueueCard;