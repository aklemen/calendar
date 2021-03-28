// Components
import React, { Component } from "react";
import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import CalendarWeek from '../components/calendar-week.component'

// Data
import { days, months, yearsRange } from "../data/constants.jsx"
import holidaysData from '../data/holidays.json';

// Styles
import "../styles/calendar.style.css";


// Calendar parent component
class Calendar extends Component {
    constructor(props) {
        super(props);

        // Intializing state with today's date

        const todayDate = new Date();

        this.state = {
            selectedDate: todayDate,
            selectedDay: todayDate.getDate(),
            selectedMonth: todayDate.getMonth(),
            selectedYear: todayDate.getFullYear(),
            weeksInMonth: this.getWeeksInMonth(todayDate),
            holidaysInMonth: this.getHolidaysInMonth(todayDate),
            warning: ""
        };
    }


    // Returns an array of weeks in selected date's month.
    // Each week is an array of corresponding dates.
    // The position of each date in the week's array corresponds to the day in a week ([0] = Mon, [1] = Tue, etc.).
    getWeeksInMonth = (selectedDate) => {
        if (selectedDate) {
            const numberOfDaysInMonth = this.getNumberOfDaysInMonth(selectedDate);
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth();

            var weeksInMonth = new Array();
            var currentWeek = new Array(7).fill(null);
            var currentDate;
            var currentDayIx;
            for (var i = 1; i <= numberOfDaysInMonth; i++) {
                currentDate = new Date(year, month, i);
                currentDayIx = (currentDate.getDay() == 0) ? 6 : (currentDate.getDay() - 1);
                currentWeek[currentDayIx] = currentDate;
                if (currentDayIx == 6 && i != numberOfDaysInMonth) {
                    weeksInMonth.push(currentWeek);
                    currentWeek = new Array(7).fill(null);
                }
            }
            weeksInMonth.push(currentWeek);
            return weeksInMonth;
        }
        return null;
    }


    // Returns an array of holidays' dates, that take place in selected date's month.
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
        return null;
    }


    // Returns the number of days in selected date's month.
    getNumberOfDaysInMonth = (selectedDate) => {
        if (selectedDate && selectedDate instanceof Date) {
            const numberOfDays = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
            return numberOfDays;
        }
    }


    // Changes the currently selected date on the calendar = updates all the necessary states.
    changeDate = (newDate) => {
        if (newDate && newDate instanceof Date) {
            if (this.state.selectedDate.setHours(0, 0, 0, 0) != newDate.setHours(0, 0, 0, 0)) {
                this.setState({
                    selectedDate: newDate,
                    selectedDay: newDate.getDate(),
                    selectedMonth: newDate.getMonth(),
                    selectedYear: newDate.getFullYear(),
                    weeksInMonth: this.getWeeksInMonth(newDate),
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


    // Handles the click event on 'Today' button = updates selected date to the today's date.
    handleTodayClick = () => {
        this.changeDate(new Date());
    }


    // Handles the change of day in selected date.
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


    // Handles the change of month in selected date.
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


    // Handles the change of year in selected date.
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

    // Rendering the user interface
    render() {
        return (
            <Container className="Calendar">
                <Row>
                    <Col className="Calendar-title">
                        <h1>Calendar</h1>
                    </Col>
                </Row>
                <Form>
                    <Row className="justify-content-md-center">
                        <Form.Group as={Col}>
                            <Button
                                onClick={this.handleTodayClick}
                                variant="outline-dark"
                                className="Calendar-button"
                                block
                            >Today</Button>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Form.Group as={Col}>
                            <Button variant="light" block>{"<"}</Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control
                                type="number"
                                placeholder="dd"
                                min="1"
                                max={this.getNumberOfDaysInMonth(this.state.selectedDate)}
                                value={this.state.selectedDay}
                                onChange={this.handleDayChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control
                                as="select"
                                value={this.state.selectedMonth}
                                onChange={this.handleMonthChange}
                            >
                                {months.map((month, i) =>
                                    <option value={i} key={i}>{month}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control
                                type="number"
                                placeholder="yyyy"
                                min={yearsRange[0]}
                                max={yearsRange[1]}
                                value={this.state.selectedYear}
                                onChange={this.handleYearChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button variant="light" block>{">"}</Button>
                        </Form.Group>
                    </Row>
                    {this.state.warning &&
                        <Row className="justify-content-md-center">
                            <Col>
                                <Alert
                                    className="Calendar-alert"
                                    variant="warning">
                                    {this.state.warning}
                                </Alert>
                            </Col>
                        </Row>
                    }
                </Form>
                <Row className="Calendar-dayNames justify-content-md-center">
                    {days.map((day, i) =>
                        <Col
                            key={i}
                        >
                            <p>{day}</p>
                        </Col>
                    )}
                </Row>
                <Container className="Calendar-days" fluid>
                    {this.state.weeksInMonth.map((week, i) =>
                        <CalendarWeek
                            key={i}
                            week={week}
                            holidays={this.state.holidaysInMonth}
                        />
                    )}
                </Container>
            </Container>
        );
    }
}


export default Calendar;