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
            selectedDate: "",
            daysInMonth: []
        };
    }


    componentDidMount() {
        this.handleDateChange("2020-11-2");
    }

    handleDateChange = (date) => {
        if (date) {
            this.setState({
                selectedDate: date,
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


    // handleYearChange = (year) => {
    //     var newDate = this.state.dateSelected;

    //     this.setState({
    //         selectedDate
    //     })
    // }


    render() {
        if (!(this.state.daysInMonth === undefined || this.state.daysInMonth.length == 0)) {
            var allWeeks = [];
            var currentDayIx = 0;
            var currentWeek = [];
            const nrOfDaysInMonth = this.state.daysInMonth.length;
            for (var i = 0; i < nrOfDaysInMonth; i++){
                currentDayIx = this.state.daysInMonth[i].getDay();
                currentDayIx = (currentDayIx == 0) ? 6 : currentDayIx - 1;
                currentWeek.push(this.state.daysInMonth[i]);
                if (currentDayIx == 6 || (this.state.daysInMonth.length == i + 1)) {
                    allWeeks.push(currentWeek);
                    currentWeek = [];
                }
            }

            const firstDayIx = (this.state.daysInMonth[0].getDay() == 0) ? 6 : this.state.daysInMonth[0].getDay() - 1;
            const lastDayIx = (this.state.daysInMonth[nrOfDaysInMonth-1].getDay() == 0) ? 6 : this.state.daysInMonth[nrOfDaysInMonth-1].getDay() - 1;
            console.log(firstDayIx);

            var emptyDates;
            if (firstDayIx != 0) {
                emptyDates = Array(firstDayIx).fill(null)
                allWeeks[0].unshift(...emptyDates);
            }

            if (lastDayIx != 6) {
                emptyDates = Array(6-lastDayIx).fill(null)
                allWeeks[allWeeks.length-1].push(...emptyDates);
            }
        }
        


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
                <Row className="Calendar-dayNames">
                    <Col xs="2" />
                    {days.map((day, i) =>
                        <Col xs="1" key={i}>
                            <p>{day}</p>
                        </Col>
                    )}
                </Row>
                <Row className="Calendar-days">
                <Col xs="2" />
                    <CalendarDay day={new Date()}/>
                </Row>
            </Container>
        );
    }
}

// function CalendarWeek(props) {

//     var week = []

//     return (
//         // var startIx = props.days[0].getDay();
//         // for (int i = 0; i < props.week.length; )
//         <div className="CalendarWeek">

//         </div>
//     );
// }

function CalendarDay(props) {
    if (props.day){
        return (
            <Col className="CalendarDay" xs="1">
                <p>{props.day.getDate()}</p>
            </Col>
        );
    }
    else{
        return (
            <Col className="CalendarDay" xs="1"/>
        ); 
    }

}


export default Calendar;