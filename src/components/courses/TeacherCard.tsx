import React, { Component } from 'react';
import { 
  Toast, Button, 
  Container, Row,
  Col
} from 'react-bootstrap';

import './CardStyle.scss';
import { Teacher } from './models';

interface TeacherProps {
  entity: Teacher;
}

interface TeacherState {
  entity: Teacher;
}

class TeacherCard extends Component<TeacherProps, TeacherState> {
  constructor(props: TeacherProps) {
    super(props);
    this.state = {
      entity: null,
    }
  }

  componentDidMount() {
    this.setState({
      entity: this.props.entity,
    })
    console.log(this.state.entity);
  }

  render() {
    return( 
      <Toast>
        <Toast.Header closeButton={false}>
          <div className={`status ${this.props.entity.status}`}></div>
          <span>{this.props.entity.username}</span>
        </Toast.Header>
      </Toast>
    );
  }
}

export default TeacherCard;