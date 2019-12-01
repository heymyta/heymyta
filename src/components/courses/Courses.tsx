import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Container } from 'react-bootstrap';
import HttpService from '../../services/http-service';
import StudentQueueCard from './StudentQueueCard';
import StudentCard from './StudentCard';
import TeacherCard from './TeacherCard';
import { Student, Teacher } from './models';
import _ from 'lodash';
import UserType from '../../services/UserType';
import SStatus from '../../services/StudentStatus';
import TStatus from '../../services/TeacherStatus';

interface CoursesProps {
  courseId: number,
  auth,
}

function Courses(props: CoursesProps) {
  const delay = 3000;
  let path = `/queue/get/${props.courseId}`;
  let userType = props.auth.userType;
  const [studentState, setStudentState] = useState({
    status: SStatus.NONE
  });
  const [teacherState, setTeacherState] = useState({
    status: TStatus.NONE
  });
  const [queueState, setQueueState] = useState({
    longPoll: false,
    pendingRequest: false
  })
  const [state, setState] = useState({
    waitingStudents: [],
    activeStudents: new Map<number, Student>(),
    activeTeachers: new Map<number, Teacher>()
  });
  if(queueState.longPoll){
    path += `?longpoll=true`;
  }
  
  
  let updateActiveTeacherStudentAndWaitingStudent = async () => {
    setQueueState({
      longPoll: true, pendingRequest: true
    });
    await HttpService.get(path).then((res) => {
      if (res.code === 0) {
        if(!_.isEqual(res.queue.activeTeachers, state.activeTeachers) ||
           !_.isEqual(res.queue.activeStudents, state.activeStudents) ||
           !_.isEqual(res.queue.waitingStudents, state.waitingStudents)){
            setState({
              waitingStudents: res.queue.waitingStudents,
              activeStudents: res.queue.activeStudents,
              activeTeachers: res.queue.activeTeachers
            });
        }
      } else {
        console.log('updateActiveTeacherStudentAndWaitingStudent error', res);
      }
      setQueueState({
        longPoll: true, pendingRequest: false
      })
      return res;
    }).catch((error) => {
      console.log('error', error);
      setQueueState({
        longPoll: true, pendingRequest: false
      })
    });
    
  }


  useEffect(() => {
    if(queueState.pendingRequest == false)
      updateActiveTeacherStudentAndWaitingStudent();
  });

  let teacherCards = [], studentCards = [], waitingStudentCards = [];

  for (const [_, teacher] of Object.entries(state.activeTeachers)) {
      teacherCards.push(
        <TeacherCard entity={teacher} />
      );
  } 

  for (const [_, student] of Object.entries(state.activeStudents)) {
      studentCards.push(
        <StudentCard entity={student} />
      );
  }


  for (const studentId of state.waitingStudents){
    waitingStudentCards.push(
      <StudentQueueCard auth={props.auth} entity={state.activeStudents[studentId]} />
    )
  }

  let studentAction = (
    <div>
    </div>
  );
  
  let teacherAction = (
    <div>
    </div>
  );
  
  return (
    <Container fluid>
      <Row>
        <Col className="courses-left-container" xl={5}>
          <Container>
            <Row>
              <h1 className="courses-title">CSCE {props.courseId}</h1>
            </Row>
            <Row>
              <h5 className="courses-description">Description:</h5>
            </Row>
            <Row>
              <h2 className="courses-queue-title">Queue Status:</h2>
            </Row>
            <Row>
              <Col>
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Active TAs</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{overflowY: 'auto', height: '250px'}}>
                    {teacherCards}
                  </Modal.Body>
                </Modal.Dialog>
              </Col>
              <Col>
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Active Student</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{overflowY: 'auto', height: '250px'}}>
                    {studentCards}
                  </Modal.Body>
                </Modal.Dialog>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="courses-right-container" xl={5}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>
                <span>Queue length: {state.waitingStudents.length}</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflowY: 'auto', height: '400px'}}>
              {waitingStudentCards}
            </Modal.Body>
            <Modal.Footer>
              Help next inline
            </Modal.Footer>
          </Modal.Dialog>
        </Col>
      </Row>
    </Container>
  );
}

export default Courses;