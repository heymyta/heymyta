import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Container, Button } from 'react-bootstrap';
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
import { toast } from 'react-toastify';

interface CoursesProps {
  courseId: number,
  auth : AuthService,
}

function Courses(props: CoursesProps) {
  const delay = 3000;
  let path = `/queue/get/${props.courseId}`;
  let userType = props.auth.userType;

  const [authPendingRequest, setAuthPendingRequest] = useState(false);
  const [queueState, setQueueState] = useState({
    longPoll: false,
    pendingRequest: false
  })
  const [state, setState] = useState({
    waitingStudents: [],
    activeStudents: new Map<number, Student>(),
    activeTeachers: new Map<number, Teacher>()
  });

  let _getUserState = (auth: AuthService) => {
    let _state = {
      userType: null,
      status: null
    };
    if(auth.userType == UserType.STUDENT){
      _state.userType = UserType.STUDENT;
      if(auth.userInfo['status']['inQueue'] == null){
        _state.status = SStatus.AWAY;
      }else if(auth.userInfo['status']['inQueue']['status'] == 'waiting'){
        _state.status = SStatus.WAITING;
      }else if(auth.userInfo['status']['inQueue']['status'] == 'resolving'){
        _state.status = SStatus.RESOLVING;
      }
    }else if(auth.userType == UserType.TA){
      console.log('props.auth.userInfo', auth.userInfo);
      _state = {
        userType: UserType.TA,
        status: (auth.userInfo['status']['helping'] != null) ? TStatus.RESOLVING : TStatus.READY 
      }
    }
    return _state;
  }

  let initialUserState = _getUserState(props.auth);
  const [userState, setUserState] = useState(initialUserState);

  if(queueState.longPoll){
    path += `?longpoll=true`;
  }
  
  let updateActiveTeacherStudentAndWaitingStudent = () => {
    setQueueState({
      longPoll: true, pendingRequest: true
    });
    httpService.get(path).then((res) => {
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
        console.log('updateActiveTeacherStudentAndWaitingStudent res', res);
        toast.error(`longpollQueue: ${res.msg}`);
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
  const updateUserStatus = () => {
    setAuthPendingRequest(true);
    props.auth.updateStatusWithLongPoll().then((res) => {
      if(res.code == 0){
        let current =_getUserState(props.auth);
        if(!_.isEqual(current, userState))
          setUserState(current);
      } else {
        console.log('updateUserStatus res', res);
        toast.error(`longpoll userstatus: ${res.msg}`);
      }
      setAuthPendingRequest(false);
      return res;
    }).catch((e) => {
      console.log('e', e);
      setAuthPendingRequest(false);
    });

  }

  useEffect(() => {
    if(queueState.pendingRequest == false)
      updateActiveTeacherStudentAndWaitingStudent();

    if(authPendingRequest == false)
      updateUserStatus();
  });
  

  let serverAction = async (api, nextUserStatus) => {
    await httpService.post(api, {}).then((res) => {
      if(res.code == 0){
        setUserState((prevState) => {
          return {
            userType: prevState.userType,
            status: nextUserStatus
          }
        });
      }else{
        console.log(`api: ${api}`, res);
        toast.error(`error serverAction ${res.code}: ${res.msg}`);
      }
    });
  }
  
  let studentGetHelp = async () => {
    await serverAction(`/queue/student/${props.courseId}/join`, SStatus.WAITING);
  }

  let studentMarkDone =async () => {
    await serverAction(`/queue/student/${props.courseId}/mark_done`, SStatus.AWAY);
  }

  let studentLeaveQueue =async () => {
    await serverAction(`/queue/student/${props.courseId}/leave`, SStatus.AWAY);
  }

  let doneResolving =async () => {
    await serverAction(`/queue/teacher/${props.courseId}/mark_done`, TStatus.READY);
  }

  let helpStudent =async (sid='') => {
    await serverAction(`/queue/teacher/${props.courseId}/pop/${sid}`, TStatus.RESOLVING);
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



  let studentAction = <></>;
  
  if(userState.status == SStatus.AWAY){
    studentAction = <Button className="btn btn-primary" onClick={studentGetHelp}>Get Help</Button>;
  } else if(userState.status == SStatus.WAITING){
    studentAction = <Button className="btn btn-danger" onClick={studentLeaveQueue}>Leave queue</Button>;
  }else if(userState.status == SStatus.RESOLVING){
    studentAction = <Button className="btn btn-success" onClick={studentMarkDone}>Done</Button>;
  }
  let teacherAction = (
    <div>
      {
        (userState.status == TStatus.READY) ?
          <Button onClick={() => helpStudent('')}> Help next in line</Button> :
          <Button onClick={doneResolving}> Done resolving</Button>
      }
    </div>
  );

  let userAction = (userState.userType == UserType.STUDENT) ? studentAction : teacherAction;
  
  return (
    <Container fluid>
      <Row>
        <Col className="courses-left-container" md={5} lg={5} xl={5}>
          <Container fluid>
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
              {/* <Col>
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Active Student</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{overflowY: 'auto', height: '250px'}}>
                    {studentCards}
                  </Modal.Body>
                </Modal.Dialog>
              </Col> */}
            </Row>
          </Container>
        </Col>
        <Col className="courses-right-container" md={5} lg={5} xl={5}>
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