
import React, { Component } from 'react';
import { 
    Container, Row, Card
} from 'react-bootstrap';



import Header from '../components/header/Header';
import httpService from '../utils/http-service';

interface MyProps {
}
  
interface MyState {
    courses: any
}

let CourseListing = (props) => (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
        <Card.Title>{props.course.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
        {props.course.desc}
        </Card.Text>
        <Card.Link href="#">Enter</Card.Link>
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
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        {JSON.stringify(this.state.courses)}
                    </Row>
                    <Row>
                        {courseList}
                    </Row>
                </Container>

            </div>
        );
    }
}

export default CoursesPage;