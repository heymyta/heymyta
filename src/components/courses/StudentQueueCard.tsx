import React, { Component } from 'react';
import { 
  Toast, Button, 
  Container, Row,
  Col, ButtonGroup
} from 'react-bootstrap';
import { cpus } from 'os';
import HttpService from '../../services/http-service';
import { Student } from './models';

interface StudentProps {
  entity: Student,
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
    // HttpService.post
    
    const sid = this.state.sid;
    const qid = this.state.qid;
    const path = `/queue/teacher/${qid}/kick/${sid}`
    HttpService.post(path, {}).then((res) => {
      if(res.code == 403){
        console.log('res', res);
      }
    });
  }

  render() {
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
                <ButtonGroup vertical>
                  <Button size="sm" variant="success">Help</Button>
                  <Button size="sm" variant="danger" onClick={this.removeStudent}>Remove</Button>
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