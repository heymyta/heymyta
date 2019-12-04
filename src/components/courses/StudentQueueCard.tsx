import React, { Component } from 'react';
import { 
  Toast, Button, 
  Container, Row,
  Col, ButtonGroup
} from 'react-bootstrap';
import { cpus } from 'os';
import HttpService from '../../services/http-service';
import { Student } from './models';
import UserType from '../../services/UserType';

interface StudentProps {
  entity: Student,
  auth,
  getHelpAction
}

interface StudentState {
  username: string,
  sid: number,
  qid: number,
  status: string,
}

class StudentQueueCard extends Component<StudentProps, StudentState> {
  userType;
  constructor(props: StudentProps) {
    super(props);
    this.state = {
      username: '',
      sid: -1,
      qid: -1,
      status: '',
    }
    this.userType = props.auth.userType;
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

  render() {
    const sid = this.state.sid;
    let taAction = (
      <ButtonGroup vertical>
        <Button size="sm" variant="success" onClick={() => this.props.getHelpAction(sid)}>Help</Button>
        <Button size="sm" variant="danger" onClick={this.removeStudent}>Remove</Button>
      </ButtonGroup>
    );
    
    return( 
      <Toast>
        <Toast.Header closeButton={false}>
          <Container fluid>
            <Row>
              <Col md={9}>
                <Row>
                  <div className={`queue-status ${this.state.status}`}></div>
                  <span className="queue-username">{this.state.username}</span>
                </Row>
              </Col>
              <Col md={3}>
                {(this.userType==UserType.TA) && taAction}
              </Col>
            </Row>
          </Container>
        </Toast.Header>
      </Toast>
    );
  }
}

export default StudentQueueCard;