import React, { Component } from 'react';
import { 
  Toast, Button, 
  Container, Row,
  Col
} from 'react-bootstrap';
import { cpus } from 'os';
import { Student } from './models';

interface StudentProps {
  entity: Student
}

interface StudentState {
  entity: Student,
  helping: boolean,
}

class StudentCard extends Component<StudentProps, StudentState> {
  constructor(props: StudentProps) {
    super(props);
    this.state = {
      entity: null ,
      helping: false,
    }
  }

  componentDidMount() {
    this.setState({
      entity: this.props.entity,
      helping: false
    })
  }

  render() {
    return( 
      <Toast>
        <Toast.Header closeButton={false}>
          <span>{this.props.entity.username}</span>
        </Toast.Header>
      </Toast>
    );
  }
}

export default StudentCard;