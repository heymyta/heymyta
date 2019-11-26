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
          <span>{this.state.name}</span>
        </Toast.Header>
      </Toast>
    );
  }
}

export default StudentCard;