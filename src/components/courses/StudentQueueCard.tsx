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
  entity: Student,
  helping: boolean,
}

class StudentQueueCard extends Component<StudentProps, StudentState> {
  constructor(props: StudentProps) {
    super(props);
    this.state = {
      entity: null,
      helping: false,
    }
  }

  componentDidMount() {
    this.setState({
      entity: this.props.entity,
      helping: false
    });
  }

  removeStudent(student: Student) {
    // HttpService.post
    
    const sid = student.sid;
    const qid = student.qid;
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
                <span>{this.props.entity.username}</span>
              </Col>
              <Col md={3}>
                <ButtonGroup vertical>
                  <Button size="sm" variant="success">Help</Button>
                  <Button size="sm" variant="danger" onClick={this.removeStudent(this.props.entity)}>Remove</Button>
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