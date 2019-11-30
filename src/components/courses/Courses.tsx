import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Container } from 'react-bootstrap';
import HttpService from '../../services/http-service';
import StudentQueueCard from './StudentQueueCard';
import StudentCard from './StudentCard';
import TeacherCard from './TeacherCard';
import _ from 'lodash';

interface CoursesProps {
  courseId: number,
}

function Courses(props: CoursesProps) {
  const delay = 3000;
  let path = `/queue/get/${props.courseId}`;
  let [longPoll, setLongPoll] = useState(false);
  const [waitingStudents, setWaitingStudents] = useState([]);
  const [activeStudents, setActiveStudents] = useState({});
  const [activeTeachers, setActiveTeachers] = useState({});
  const timerId = useRef<any>();
  console.log('timerId', timerId);
  if(timerId.current != null){
    path += `?longpoll=true`;
  }
  
  let updateActiveTeacherStudentAndWaitingStudent = () => {
    HttpService.get(path).then((res) => {
      if (res.code === 0) {
        setLongPoll(true);
        if(!_.isEqual(res.queue.activeTeachers, activeTeachers) ){
          setActiveTeachers(res.queue.activeTeachers);
        }

        if(!_.isEqual(res.queue.activeStudents, activeStudents) ){
          setActiveStudents(res.queue.activeStudents);
        }

        if(!_.isEqual(res.queue.waitingStudents, waitingStudents) ){
          setWaitingStudents(res.queue.waitingStudents);
        }
      }
    });
  }

  useEffect(() => {
    if(!longPoll){
      updateActiveTeacherStudentAndWaitingStudent();
    }
    //using data longpolling
    timerId.current = setInterval(() => {
      updateActiveTeacherStudentAndWaitingStudent();
    }, delay);

    return () => {
      clearTimeout(timerId.current)
      timerId.current = null;
    }
  });

  let teacherCards = [], studentCards = [], waitingStudentCards = [];

  for (const [teacherId, teacher] of Object.entries(activeTeachers)) {
      teacherCards.push(
        <TeacherCard name={teacher['username']} status={teacher['status']} />
      );
  } 

  for (const [studentId, student] of Object.entries(activeStudents)) {
      studentCards.push(
        <StudentCard name={student['username']} />
      );
  }


  for (const studentId of waitingStudents){
    waitingStudentCards.push(
      <StudentQueueCard name={activeStudents[studentId]['username']} />
    )
  }

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
                  <Modal.Body>
                    {teacherCards}
                  </Modal.Body>
                </Modal.Dialog>
              </Col>
              <Col>
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Active Student</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
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
                <span>Queue length: {waitingStudents.length}</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {waitingStudentCards}
            </Modal.Body>
            <Modal.Footer>Help next inline</Modal.Footer>
          </Modal.Dialog>
        </Col>
      </Row>
    </Container>
  );
}

export default Courses;