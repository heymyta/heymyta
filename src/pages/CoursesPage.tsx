
import React, { Component } from 'react';
import { 
  Container, Row, 
  Card, CardDeck
} from 'react-bootstrap';

import Header from '../components/header/Header';
import httpService from '../services/http-service';
import AuthService from '../services/auth-service';

interface MyProps {
  auth: AuthService,
}
  
interface MyState {
  courses: Array<any>,
}

let CourseListing = (props) => (
  <Card style={{ width: '18rem', boxShadow: '0 3px 10px rgba(0,0,0,0.1)'}}>
    <Card.Body>
      <Card.Title>{props.course.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Instructor: ...</Card.Subtitle>
      <Card.Text>
      {props.course.desc} <br />
        {"#"} of Active TA: {Object.keys(props.course.activeTeachers).length}
      </Card.Text>
      <Card.Link href={`/courses/${props.course.qid}`}>Enter</Card.Link>
    </Card.Body>
  </Card>
);

class CoursesPage extends Component<MyProps, MyState>{
  constructor(props){
    super(props);
    this.state = {
      courses : [],
    }
    this.getCourses = this.getCourses.bind(this);
  }

  async getCourses(){
    let $this = this;
    httpService.get(`/queue/get_all?full=true`,
      (status, res) => {
        $this.setState({
          courses: res.queues,
        });
      });
  }

  componentDidMount(){
    this.getCourses();
  }
  render() {
    let courseList = this.state.courses.map(
      (course) => (
        <CourseListing course={course} />
      )                        
    );
    return (
      <div>
        <Header />
        <Container>
          <Row className='mt-5'>
            <CardDeck>
              {courseList}
            </CardDeck>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CoursesPage;