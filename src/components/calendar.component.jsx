import React, { Component } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import "../styles/calendar.style.css";

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
]

const days = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
]

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.getDates = this.getDates.bind(this);
        this.state = {
            daySelected: null
        };

    }


    getDates(selectedDate){
        const date = new Date(selectedDate);
        const firstDay = date.getDay();
        console.log(firstDay);
    }

    render() {
        return (
            <Container className="Calendar">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} xs={{ span: 3, offset: 3 }}>
                            <Form.Control type="date" placeholder="DD/MM/YYYY" />
                        </Form.Group>
                        <Form.Group as={Col} xs={{ span: 2}}>
                            <Button variant="outline-dark" block>Today</Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} xs={{ span: 1, offset: 1 }}>
                            <Button variant="light" block>{"<"}</Button>
                        </Form.Group>
                        <Form.Group as={Col} xs={{ span: 3, offset: 1 }}>
                            <Form.Control as="select">
                                {months.map((month, i) => <option value={month} key={i}>{month}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={{ span: 2 }}>
                            <Form.Control controlid="year" type="number" placeholder="yyyy" pattern="^\d{4}$" />
                        </Form.Group>
                        <Form.Group as={Col} xs={{ span: 1, offset: 1 }}>
                            <Button variant="light" block>{">"}</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <Row className="Calendar-days">
                    <Col xs="2"/>
                    {days.map((day, i) =>
                        <Col xs="1" key={i}>
                            <p>{day}</p>
                        </Col>
                    )}
                </Row>
                {this.getDates("2021-4-1")}
            </Container>
        );
    }
}

// function CalendarWeek(props) {
//     return (
//         for (int i = 0; i < props.week.length; )
//         <div className="CalendarWeek">

//         </div>
//     );
// }

// function CalendarDay() {
//     return (
//         <div className="CalendarDay">
//             {days.map((day, i) =>
//                 <Col className="DayName" xs="1" key={i}>
//                     <p>{day}</p>
//                 </Col>
//             )}
//         </div>
//     );
// }


export default Calendar;