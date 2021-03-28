// Components
import React, { Component } from "react";
import { Row } from "react-bootstrap";
import CalendarDay from '../components/calendar-day.component'

// Other
import PropTypes from 'prop-types';


// CalendarWeek component, that renders days of the week with the help of CalendarDay
class CalendarWeek extends Component {
    constructor(props) {
        super(props);
    }


    // Invokes parent component's function to change the selected date.
    handleDateChange = (selectedDate) => {
        this.props.onChangeDate(selectedDate);
    }


    render() {
        return (
            <Row className="justify-content-md-center">
                {this.props.week.map((date, i) =>
                    <CalendarDay
                        key={i}
                        date={date}
                        holidays={this.props.holidays}
                        selectedDate={this.props.selectedDate}
                        onChangeDate={this.handleDateChange}
                    />
                )}
            </Row>
        );
    }
}


// Checking the props' types
CalendarWeek.propTypes = {
    week: PropTypes.arrayOf(
        PropTypes.instanceOf(Date)
    ),
    holidays: PropTypes.arrayOf(
        PropTypes.instanceOf(Date)
    ),
    selectedDate: PropTypes.instanceOf(Date),
    onChangeDate: PropTypes.func
}


export default CalendarWeek;