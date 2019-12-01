import React, { Component } from 'react';
import { 
  Toast, Button, 
  Container, Row,
  Col, ButtonGroup
} from 'react-bootstrap';
import { cpus } from 'os';
import HttpService from '../../services/http-service';
import { Student } from './models';
import UserType form '../../services/UserType';

interface StudentProps {
  entity: Student,
  auth
}

interface StudentState {
  username: string,
  sid: number,
  qid: number,
  status: string,
}

class StudentQueueCard extends Component<StudentProps, StudentState> {
  constructor(props: StudentProps) {
    super(props);
    this.state = {
      username: '',
      sid: -1,
      qid: -1,
      status: '',
    }
    this.removeStudent = this.removeStudent.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: this.props.entity.username,
      sid: this.props.entity.sid,
      qid: this.props.entity.qid,
      status: this.props.entity.status,
    });
  }

  removeStudent() {
    const sid = this.state.sid;
    const qid = this.state.qid;
    const path = `/queue/teacher/${qid}/kick/${sid}`
    HttpService.post(path, {}).then((res) => {
      if(res.code == 403){
        console.log('res removeStudent error', res);
      }
    });
  }

  const taAction = (
    <ButtonGroup vertical>
      <Button size="sm" variant="success" disabled>Help</Button>
      <Button size="sm" variant="danger" onClick={this.removeStudent}>Remove</Button>
    </ButtonGroup>
  );
  render() {
    return( 
      <Toast>
        <Toast.Header closeButton={false}>
          <Container fluid>
            <Row>
              <Col md={9}>
                <span>{this.state.username}</span>
              </Col>
              <Col md={3}>
                {}
              </Col>
            </Row>
          </Container>
        </Toast.Header>
      </Toast>
    );
  }
}

export default StudentQueueCard;