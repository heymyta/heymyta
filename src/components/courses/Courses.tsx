import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Container, Button } from 'react-bootstrap';
import HttpService from '../../services/http-service';
import StudentQueueCard from './StudentQueueCard';
import StudentCard from './StudentCard';
import TeacherCard from './TeacherCard';
import { Student, Teacher } from './models';
import _ from 'lodash';
import UserType from '../../services/UserType';
import SStatus from '../../services/StudentStatus';
import TStatus from '../../services/TeacherStatus';
import AuthService from '../../services/auth-service';
import httpService from '../../services/http-service';

interface CoursesProps {
  courseId: number,
  auth : AuthService,
}

function Courses(props: CoursesProps) {
  const delay = 3000;
  let path = `/queue/get/${props.courseId}`;
  let userType = props.auth.userType;

  const [queueState, setQueueState] = useState({
    longPoll: false,
    pendingRequest: false
  })
  const [state, setState] = useState({
    waitingStudents: [],
    activeStudents: new Map<number, Student>(),
    activeTeachers: new Map<number, Teacher>()
  });

  let initialUserState = {
    userType: null, status: null
  };

  let student_FSM = new Map<SStatus, SStatus>();
  student_FSM.set(SStatus.IDLING, SStatus.RESOLVING);
  student_FSM.set(SStatus.RESOLVING, SStatus.IDLING);
  student_FSM.set(SStatus.NONE, SStatus.NONE);


  let teacher_FSM = new Map<TStatus, TStatus>();
  teacher_FSM.set(TStatus.READY, TStatus.RESOLVING);
  teacher_FSM.set(TStatus.RESOLVING, TStatus.READY);
  teacher_FSM.set(TStatus.NONE, TStatus.NONE);

  if(props.auth.userType == UserType.STUDENT){
    initialUserState = {
      userType: UserType.STUDENT,
      status: (props.auth.userInfo['status']['inQueue'] != null) ? SStatus.RESOLVING : SStatus.IDLING
    }
  }else if(props.auth.userType == UserType.TA){
    console.log('props.auth.userInfo', props.auth.userInfo);
    initialUserState = {
      userType: UserType.TA,
      status: (props.auth.userInfo['status']['helping'] != null) ? TStatus.RESOLVING : TStatus.READY 
    }
  }
  const [userState, setUserState] = useState(initialUserState);

  if(queueState.longPoll){
    path += `?longpoll=true`;
  }
  
  
  let updateActiveTeacherStudentAndWaitingStudent = () => {
    setQueueState({
      longPoll: true, pendingRequest: true
    });
    HttpService.get(path).then((res) => {
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
  
  let helpStudent = async (sid='') => {
    let api = `/queue/teacher/${props.courseId}/pop/${sid}`;
    await httpService.post(api, {}).then((res) => {
      if(res.code == 0){
        setUserState((prevState) => {
          return {
            userType: prevState.userType,
            status: teacher_FSM.get(prevState.status)
          }
        });
      }else if(res.code == 403){
        console.log('helpStudent res', res);
      }
    });
  }

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
      <StudentQueueCard auth={props.auth} getHelpAction={helpStudent} entity={state.activeStudents[studentId]} />
    )
  }


  
  let getHelp = async () => {
    await httpService.post(`/queue/student/${props.courseId}/join`, {}).then((res) => {
      if(res.code == 0){
        setUserState((prevState) => {
          return {
            userType: prevState.userType,
            status: student_FSM.get(prevState.status)
          }
        });
      }else if(res.code == 403){
        console.log('getHelp res', res);
      }
    });
  }

  let doneLeaveQueue = async () => {
    await httpService.post(`/queue/student/${props.courseId}/leave`, {}).then((res) => {
      if(res.code == 0){
        setUserState((prevState) => {
          return {
            userType: prevState.userType,
            status: student_FSM.get(prevState.status)
          }
        });
      }else if(res.code == 403){
        console.log('doneLeaveQueue res', res);
      }
    });
  }

  let doneResolving = async () => {
    await httpService.post(`/queue/teacher/${props.courseId}/mark_done`, {}).then((res) => {
      if(res.code == 0){
        setUserState((prevState) => {
          return {
            userType: prevState.userType,
            status: teacher_FSM.get(prevState.status)
          }
        });
      }else if(res.code == 403){
        console.log('helpStudent res', res);
      }
    });
  }

  let studentAction = (
    <div>
      {(userState.status == SStatus.IDLING) ? 
        <Button onClick={getHelp}>Get Help</Button> :
        <Button onClick={doneLeaveQueue}>Done(Leave queue)</Button>
      }
    </div>
  );
  
  let teacherAction = (
    <div>
      {
        (userState.status == TStatus.READY) ?
          <Button onClick={helpStudent}> Help next in line</Button> :
          <Button onClick={doneResolving}> Done resolving</Button>
      }
    </div>
  );

  let userAction = (userState.userType == UserType.STUDENT) ? studentAction : teacherAction;
  
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
              {/* <Button variant="dark" bg="dark" size="lg">Help next inline</Button> */}
              {userAction}
            </Modal.Footer>
          </Modal.Dialog>
        </Col>
      </Row>
    </Container>
  );
}

export default Courses;