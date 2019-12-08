import React, { Component } from 'react';
import { 
  Toast, Button, 
  Container, Row,
  Col
} from 'react-bootstrap';
import { cpus } from 'os';
import { Student } from './models';
import _ from 'lodash';

interface StudentProps {
  entity: Student
}

interface StudentState {
  username: string,
  sid: number,
  qid: number,
  status: string,
}

class StudentCard extends Component<StudentProps, StudentState> {
  constructor(props: StudentProps) {
    super(props);
    this.state = {
      username: '',
      sid: -1,
      qid: -1,
      status: '',
    }
    this.updateCardInfo = this.updateCardInfo.bind(this);
  }

  updateCardInfo() {
    this.setState({
      username: this.props.entity.username,
      sid: this.props.entity.sid,
      qid: this.props.entity.qid,
      status: this.props.entity.status,
    });
  }

  componentDidMount() {
    this.updateCardInfo();
  }

  componentDidUpdate(prevProps) {
    if(!_.isEqual(prevProps, this.props) ){
      this.updateCardInfo();
    }
  }

  render() {
    return( 
      <Toast>
        <Toast.Header closeButton={false}>
          <div className={`status ${this.state.status}`}></div>
          <span>{this.state.username}</span>
        </Toast.Header>
        <Toast.Body>yada</Toast.Body>
      </Toast>
    );
  }
}

export default StudentCard;