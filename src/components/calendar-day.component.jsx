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
    isSunday = () => {
        if (this.props.date && this.props.date instanceof Date) {
            if (this.props.date.getDay() === 0) {
                return true;
            }
        }
        return false;
    }


    // Returns true, if the date is a holiday
    isHoliday = () => {
        if (this.props.date && this.props.date instanceof Date && this.props.holidays) {
            for (var i = 0; i < this.props.holidays.length; i++) {
                if (this.props.holidays[i].getDate() == this.props.date.getDate() &&
                    this.props.holidays[i].getMonth() == this.props.date.getMonth()) {
                    return true;
                }
            }
        }
        return false;
    }


    isSelected = () => {
        if (this.props.date && this.props.date instanceof Date &&
            this.props.selectedDate && this.props.selectedDate instanceof Date
        ) {
            if (this.props.selectedDate.setHours(0, 0, 0, 0) == this.props.date.setHours(0, 0, 0, 0)) {
                return true;
            }
        }
        return false;
    }


    render() {
        if (this.props.date) {
            if (this.isHoliday()) {
                return (
                    <Col className={`CalendarDay CalendarDay-holiday ${(this.isSelected() ? 'active' : '')}`}>
                        <p>{this.props.date.getDate()}</p>
                    </Col>
                );
            }
            else if (this.isSunday()) {
                return (
                    <Col className={`CalendarDay CalendarDay-sunday ${(this.isSelected() ? 'active' : '')}`}>
                        <p>{this.props.date.getDate()}</p>
                    </Col>
                );
            }
            else {
                return (
                    <Col className={`CalendarDay ${(this.isSelected() ? 'active' : '')}`}>
                        <p>{this.props.date.getDate()}</p>
                    </Col>
                );
            }
        }
        else {
            return (
                <Col className="CalendarDay CalendarDay-empty"/>
            );
        }
    }
}


// Checking the props' types
CalendarDay.propTypes = {
    date: PropTypes.instanceOf(Date),
    selectedDate: PropTypes.instanceOf(Date),
    holidays: PropTypes.arrayOf(
        PropTypes.instanceOf(Date)
    )
};


export default CalendarDay;