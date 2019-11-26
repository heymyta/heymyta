import React, { useState } from 'react';
import { Modal, Row, Col, Container } from 'react-bootstrap';
import HttpService from '../../services/http-service';
import StudentCard from './StudentCard';
import TeacherCard from './TeacherCard';

interface CoursesProps {
  queueId?: number,
}

function Courses(props: CoursesProps) {
  const path = `/queue/get/${props.queueId}`;
  const [activeStudents, setActiveStudents] = useState('');
  const [waitingStudents, setWaitingStudents] = useState('');
  const [activeTeachers, setActiveTeachers] = useState('');

  HttpService.get(path, (res) => {
    if (res.msg === 'OK') {
      setActiveStudents(res.queue.waitingStudents);
      setActiveTeachers(res.queue.activeTeachers);
      setWaitingStudents(res.queue.waitingStudents);
    }
  });

  return (
    <Container>
      <Row>
        <Col>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Active TAs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TeacherCard name="TA1" />
              <TeacherCard name="TA1" status="working" />
              <TeacherCard name="TA1" status="unavailable" />
            </Modal.Body>
          </Modal.Dialog>
        </Col>
        <Col>
         <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Student in Queues</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <StudentCard name="Harry" />
            </Modal.Body>
          </Modal.Dialog>
        </Col>
        <Col>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Yada</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
          </Modal.Dialog>
        </Col>
      </Row>
    </Container>
  );
}

export default Courses;