// Components
import React, { Component } from "react";
import { Col } from "react-bootstrap";

// Styles
import "../styles/calendar-day.style.css";

// Other
import PropTypes from 'prop-types';


// CalendarDay component that renders each date and styles it accordingly (sundays, holidays...)
class CalendarDay extends Component {
    constructor(props) {
        super(props);
    }


    // Returns true, if the date's day is sunday
    isSunday = (date) => {
        if (date && date instanceof Date) {
            if (date.getDay() === 0) {
                return true;
            }
        }
        return false;
    }


    // Returns true, if the date is a holiday
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
                    <Col className="CalendarDay CalendarDay-holiday">
                        <p>{this.props.date.getDate()}</p>
                    </Col>
                );
            }
            else if (this.isSunday(this.props.date)) {
                return (
                    <Col className="CalendarDay CalendarDay-sunday">
                        <p>{this.props.date.getDate()}</p>
                    </Col>
                );
            }
            else {
                return (
                    <Col className="CalendarDay">
                        <p>{this.props.date.getDate()}</p>
                    </Col>
                );
            }
        }
        else {
            return (
                <Col/>
            );
        }
    }
}


// Checking the props' types
CalendarDay.propTypes = {
    date: PropTypes.instanceOf(Date),
    holidays: PropTypes.arrayOf(
        PropTypes.instanceOf(Date)
    )
};


export default CalendarDay;