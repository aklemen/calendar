import React, { Component } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import "../styles/calendar.style.css";
import { months, days } from "../data/constants.jsx"
import holidaysData from '../data/holidays.json';


class Calendar extends Component {
    constructor(props) {
        super(props);
        // this.getDates = this.getDates.bind(this);
        this.state = {
            daySelected: "",
            daysInMonth: []
        };
    }


    componentDidMount() {

    }

    handleDateChange = (date) => {
        if (date) {
            this.setState({
                daySelected: date,
                daysInMonth: this.getAllDaysInMonth(date)
            }, () => {
                // console.log(this.state.daysInMonth);
            });
        }
    }


    getHolidaysInMonth = (selectedDate) => {
        if (selectedDate) {
            const date = new Date(selectedDate);
            var holidaysInMonth = new Array();

            for (var i = 0; i < holidaysData.length; i++) {
                var holidayDate = new Date(holidaysData[i].date);
                var holidayIsRepeating = holidaysData[i].repeating;
                if (holidayDate.getFullYear() == date.getFullYear() && holidayDate.getMonth() == date.getMonth()) {
                    holidaysInMonth.push(holidayDate);
                }
                else if (holidayIsRepeating && holidayDate.getMonth() == date.getMonth()) {
                    holidaysInMonth.push(holidayDate);
                }
            }

            return holidaysInMonth;
        }
    }


    getAllDaysInMonth = (selectedDate) => {
        if (selectedDate) {
            const date = new Date(selectedDate);
            const year = date.getFullYear();
            const month = date.getMonth();

            const numberOfDays = new Date(year, month + 1, 0).getDate();

            var daysInMonth = new Array();
            for (var i = 0; i < numberOfDays; i++) {
                daysInMonth.push(new Date(year, month, i + 1));
            }

            return daysInMonth;
        }
    }


    getFirstDayIx = () => {

    }




    render() {
        return (
            <Container className="Calendar">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} xs={{ span: 3, offset: 3 }}>
                            <Form.Control type="date" placeholder="DD/MM/YYYY" />
                        </Form.Group>
                        <Form.Group as={Col} xs={{ span: 2 }}>
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
                    <Col xs="2" />
                    {days.map((day, i) =>
                        <Col xs="1" key={i}>
                            <p>{day}</p>
                        </Col>
                    )}
                </Row>
                <Row className="Calendar-dates">
                    {days.map((day, i) =>
                        <Col xs="1" key={i}>
                            <p>{day}</p>
                        </Col>
                    )}
                </Row>
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