import React, { Component } from "react";
import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import "../styles/calendar.style.css";
import { days, months, yearsRange } from "../data/constants.jsx"
import holidaysData from '../data/holidays.json';
import CalendarDay from '../components/calendar-day.component'


class Calendar extends Component {
    constructor(props) {
        super(props);
        // this.getDates = this.getDates.bind(this);

        const todayDate = new Date();

        this.state = {
            selectedDate: todayDate,
            selectedDay: todayDate.getDate(),
            selectedMonth: todayDate.getMonth(),
            selectedYear: todayDate.getFullYear(),
            daysInMonth: [],
            holidaysInMonth: this.getHolidaysInMonth(todayDate),
            warning: ""
        };
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


    // getAllDaysInMonth = (selectedDate) => {
    //     if (selectedDate) {
    //         const date = new Date(selectedDate);
    //         const year = date.getFullYear();
    //         const month = date.getMonth();

    //         const numberOfDays = new Date(year, month + 1, 0).getDate();

    //         var daysInMonth = new Array();
    //         for (var i = 0; i < numberOfDays; i++) {
    //             daysInMonth.push(new Date(year, month, i + 1));
    //         }

    //         return daysInMonth;
    //     }
    // }


    getNumberOfDaysInMonth = (date) => {
        if (date && date instanceof Date) {
            const numberOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            return numberOfDays;
        }
    }


    changeDate = (newDate) => {
        if (newDate && newDate instanceof Date) {
            if (this.state.selectedDate.setHours(0, 0, 0, 0) != newDate.setHours(0, 0, 0, 0)) {
                this.setState({
                    selectedDate: newDate,
                    selectedDay: newDate.getDate(),
                    selectedMonth: newDate.getMonth(),
                    selectedYear: newDate.getFullYear(),
                    holidaysInMonth: this.getHolidaysInMonth(newDate),
                    warning: ""
                });
            }
            else {
                this.setState({
                    warning: ""
                });
            }
        }
        else {
            this.setState({
                warning: "Date is invalid. Please try again."
            });
        }
    }


    handleTodayClick = () => {
        this.changeDate(new Date());
    }


    handleDayChange = (e) => {
        const day = e.target.value;
        this.setState({
            selectedDay: day
        })
        const numberOfDaysInMonth = this.getNumberOfDaysInMonth(this.state.selectedDate);
        if (day > 0 && day <= numberOfDaysInMonth) {
            const oldDate = new Date(this.state.selectedDate);
            const newDate = new Date(oldDate.setDate(day));
            this.changeDate(newDate);
        }
        else {
            this.setState({
                warning: "Please, type in a valid date."
            });
        }
    }


    handleMonthChange = (e) => {
        const month = e.target.value;
        this.setState({
            selectedMonth: month
        })
        if (month > -1 && month < 12) {
            const oldDate = new Date(this.state.selectedDate);
            const newDate = new Date(oldDate.getFullYear(), month, 1);
            const numberOfDaysInMonth = this.getNumberOfDaysInMonth(newDate)
            if (oldDate.getDate() > numberOfDaysInMonth) {
                newDate.setDate(numberOfDaysInMonth);
            }
            else {
                newDate.setDate(oldDate.getDate());
            }
            this.changeDate(newDate);
        }
        else {
            this.setState({
                warning: "Something went wrong. Try refreshing the page."
            });
        }
    }


    handleYearChange = (e) => {
        const year = e.target.value;
        this.setState({
            selectedYear: year
        })
        if (year >= yearsRange[0] && year <= yearsRange[1]) {
            const oldDate = new Date(this.state.selectedDate);
            const newDate = new Date(oldDate.setFullYear(year));
            this.changeDate(newDate);
        }
        else {
            this.setState({
                warning: `Only years ${yearsRange[0]}-${yearsRange[1]} are supported.`
            });
        }
    }


    render() {
        // if (!(this.state.daysInMonth === undefined || this.state.daysInMonth.length == 0)) {
        //     var allWeeks = [];
        //     var currentDayIx = 0;
        //     var currentWeek = [];
        //     const nrOfDaysInMonth = this.state.daysInMonth.length;
        //     for (var i = 0; i < nrOfDaysInMonth; i++) {
        //         currentDayIx = this.state.daysInMonth[i].getDay();
        //         currentDayIx = (currentDayIx == 0) ? 6 : currentDayIx - 1;
        //         currentWeek.push(this.state.daysInMonth[i]);
        //         if (currentDayIx == 6 || (this.state.daysInMonth.length == i + 1)) {
        //             allWeeks.push(currentWeek);
        //             currentWeek = [];
        //         }
        //     }

        //     const firstDayIx = (this.state.daysInMonth[0].getDay() == 0) ? 6 : this.state.daysInMonth[0].getDay() - 1;
        //     const lastDayIx = (this.state.daysInMonth[nrOfDaysInMonth - 1].getDay() == 0) ? 6 : this.state.daysInMonth[nrOfDaysInMonth - 1].getDay() - 1;

        //     var emptyDates;
        //     if (firstDayIx != 0) {
        //         emptyDates = Array(firstDayIx).fill(null)
        //         allWeeks[0].unshift(...emptyDates);
        //     }

        //     if (lastDayIx != 6) {
        //         emptyDates = Array(6 - lastDayIx).fill(null)
        //         allWeeks[allWeeks.length - 1].push(...emptyDates);
        //     }
        // }


        return (
            <Container className="Calendar">
                <Row>
                    <Col className="Calendar-title" xs={{ span: 11 }}>
                        <h1>Calendar</h1>
                    </Col>
                </Row>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} xs={{ span: 5, offset: 3 }}>
                            <Button
                                onClick={this.handleTodayClick}
                                variant="outline-dark"
                                className="Button-today"
                                block
                            >Today</Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} xs={{ span: 1, offset: 1 }}>
                            <Button variant="light" block>{"<"}</Button>
                        </Form.Group>
                        <Form.Group as={Col} xs={{ span: 1, offset: 1 }}>
                            <Form.Control
                                type="number"
                                placeholder="dd"
                                min="1"
                                max={this.getNumberOfDaysInMonth(this.state.selectedDate)}
                                value={this.state.selectedDay}
                                onChange={this.handleDayChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={{ span: 3 }}>
                            <Form.Control
                                as="select"
                                value={this.state.selectedMonth}
                                onChange={this.handleMonthChange}
                            >
                                {months.map((month, i) => <option value={i} key={i}>{month}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={{ span: 1 }}>
                            <Form.Control
                                type="number"
                                placeholder="yyyy"
                                min={yearsRange[0]}
                                max={yearsRange[1]}
                                value={this.state.selectedYear}
                                onChange={this.handleYearChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={{ span: 1, offset: 1 }}>
                            <Button variant="light" block>{">"}</Button>
                        </Form.Group>
                    </Form.Row>
                    {this.state.warning &&
                        <Form.Row>
                            <Col xs={{ span: 5, offset: 3 }}>
                                <Alert
                                    className="Calendar-alert"
                                    variant="warning">
                                    {this.state.warning}
                                </Alert>
                            </Col>
                        </Form.Row>
                    }
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
                    <CalendarDay
                        date={this.state.selectedDate}
                        holidays={this.state.holidaysInMonth}
                    />
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

export default Calendar;