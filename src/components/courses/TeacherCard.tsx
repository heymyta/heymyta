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
          <div className={`status ${this.state.status}`}></div>
          <span>{this.state.name}</span>
        </Toast.Header>
      </Toast>
    );
  }
}

export default TeacherCard;