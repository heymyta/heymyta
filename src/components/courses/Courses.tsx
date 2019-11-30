import React, { useState, useEffect } from 'react';
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
  const path = `/queue/get/${props.courseId}`;
  const [waitingStudents, setWaitingStudents] = useState([]);
  const [activeStudents, setActiveStudents] = useState({});
  const [activeTeachers, setActiveTeachers] = useState({});
  console.log('path', path);
  
  useEffect(() => {
    HttpService.get(path).then((res) => {
      if (res.code === 0) {
        if(!_.isEqual(res.queue.waitingStudents, waitingStudents) ){
          setWaitingStudents(res.queue.waitingStudents);
        }

        if(!_.isEqual(res.queue.activeTeachers, activeTeachers) ){
          setActiveTeachers(res.queue.activeTeachers);
        }

        if(!_.isEqual(res.queue.activeStudents, activeStudents) ){
          setActiveStudents(res.queue.activeStudents);
        }
      }
      console.log('activeStudents', activeStudents);
      console.log('activeTeachers', activeTeachers);
    })
  }, []);

  let teacherCards = [], studentCards = [];
  if(activeTeachers){
    for (const [teacherId, teacher] of Object.entries(activeTeachers)) {
      console.log('teacher', teacher);
        teacherCards.push(
          <TeacherCard name={teacher['username']} status={teacher['status']} />
        );
    } 
  }
  if(activeStudents){
    for (const [studentId, student] of Object.entries(activeStudents)) {
      console.log('student', student);
        studentCards.push(
          <StudentCard name={student['username']} />
        );
    }
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
              <StudentQueueCard name="Harry" />
            </Modal.Body>
            <Modal.Footer>Help next inline</Modal.Footer>
          </Modal.Dialog>
        </Col>
      </Row>
    </Container>
  );
}

export default Courses;