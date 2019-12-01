import React, { Component } from 'react';
import { 
  Toast
} from 'react-bootstrap';

import './CardStyle.scss';
import { Teacher } from './models';

interface TeacherProps {
  entity: Teacher;
}

interface TeacherState {
  username: string;
  email: string;
  tid: number;
  status: string;
}

class TeacherCard extends Component<TeacherProps, TeacherState> {
  constructor(props: TeacherProps) {
    super(props);
    this.state = {
      username: '',
      email: '',
      tid: -1,
      status: '',
    }
  }

  componentDidMount() {
    this.setState({
      username: this.props.entity.username,
      email: this.props.entity.email,
      tid: this.props.entity.tid,
      status: this.props.entity.status,
    })
  }

  render() {
    return( 
      <Toast>
        <Toast.Header closeButton={false}>
          <div className={`status ${this.state.status}`}></div>
          <span>{this.state.username}</span>
        </Toast.Header>
      </Toast>
    );
  }
}

export default TeacherCard;