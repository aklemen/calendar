import React, { Component } from "react";
import "../styles/calendar-day.style.css";
import { Col } from "react-bootstrap";
import PropTypes from 'prop-types';

class CalendarDay extends Component {
    constructor(props) {
        super(props);
    }


    isSunday = (date) => {
        if (date && date instanceof Date) {
            if (date.getDay() === 0) {
                return true;
            }
        }
        return false;
    }


    isHoliday = (date, holidays) => {
        if (date && date instanceof Date) {
            for (var i = 0; i < holidays.length; i++) {
                if (holidays[i].getDate() == date.getDate() &&
                    holidays[i].getMonth() == date.getMonth()) {
                    return true;
                }
            }
        }
        return false;
    }


    render() {


        if (this.props.date) {
            if (this.isHoliday(this.props.date, this.props.holidays)) {
                return (
                    <Col className="CalendarDay CalendarDay-holiday" xs="1">
                        <p>{this.props.date.getDate()}</p>
                    </Col>
                )
            }
            else if (this.isSunday(this.props.date)) {
                return (
                    <Col className="CalendarDay CalendarDay-sunday" xs="1">
                        <p>{this.props.date.getDate()}</p>
                    </Col>
                )
            }
            else {
                return (
                    <Col className="CalendarDay" xs="1">
                        <p>{this.props.date.getDate()}</p>
                    </Col>
                )
            }
        }
        else {
            <Col className="CalendarDay" xs="1" />
        }

    }
}

CalendarDay.propTypes = {
    date: PropTypes.instanceOf(Date),
    holidays: PropTypes.array
};

export default CalendarDay;