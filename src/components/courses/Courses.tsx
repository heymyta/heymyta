import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Container } from 'react-bootstrap';
import HttpService from '../../services/http-service';
import StudentQueueCard from './StudentQueueCard';
import StudentCard from './StudentCard';
import TeacherCard from './TeacherCard';

interface CoursesProps {
  courseId: number,
}

function Courses(props: CoursesProps) {
  const path = `/queue/get/${props.courseId}`;
  const [activeStudents, setActiveStudents] = useState('');
  const [waitingStudents, setWaitingStudents] = useState('');
  const [activeTeachers, setActiveTeachers] = useState('');
  console.log('path', path);
  
  useEffect(() => {
    HttpService.get(path).then((res) => {
      console.log('res', res);
      if (res.code === 0) {
        //causing infinite GET request
        setActiveStudents(res.queue.waitingStudents);
        setActiveTeachers(res.queue.activeTeachers);
        setWaitingStudents(res.queue.waitingStudents);
      }
      console.log('activeStudents', activeStudents);
      console.log('activeTeachers', activeTeachers);
    })
  }, [activeStudents, waitingStudents, activeTeachers]);

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
                    <TeacherCard name="Huy" status="available" />
                    <TeacherCard name="Testing de Crule" status="working" />
                    <TeacherCard name="Donald Duck" status="unavailable" />
                  </Modal.Body>
                </Modal.Dialog>
              </Col>
              <Col>
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Active Student</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <StudentCard name="Student 1"></StudentCard>
                    <StudentCard name="Student 2"></StudentCard>
                    <StudentCard name="Some interesting name"></StudentCard>
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