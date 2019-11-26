import React, { Component } from 'react';
import { 
  Toast, Button, 
  Container, Row,
  Col
} from 'react-bootstrap';

import './CardStyle.scss';

interface TeacherProps {
  name: string,
  status?: string,
}

interface TeacherState {
  name: string,
  status: string,
}

class TeacherCard extends Component<TeacherProps, TeacherState> {
  constructor(props: TeacherProps) {
    super(props);
    this.state = {
      name: '',
      status: ''
    }
  }

  componentDidMount() {

    this.setState({
      name: this.props.name,
      status: this.props.status ? this.props.status : 'available'
    })
  }

  render() {
    return( 
      <Toast>
        <Toast.Header closeButton={false}>
          <div className={`label label-${this.state.status === 'available' ? 'success' : this.state.status === 'working' ? 'warning' : 'danger'}`}></div>
          <strong>{this.state.name}</strong>
        </Toast.Header>
        {/* <Toast.Body>
          <Container>
            <Row>
              <Col md={{ span: 0 }}><Button size="sm" variant="success">Help</Button></Col>
              <Col md={{ span: 1, offset: 2 }}><Button size="sm" variant="danger">Remove</Button></Col>
            </Row>
          </Container>
        </Toast.Body> */}
      </Toast>
    );
  }
}

export default TeacherCard;