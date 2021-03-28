import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Row } from "react-bootstrap";
import CalendarDay from '../components/calendar-day.component'

class CalendarWeek extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row className="justify-content-md-center">
                {this.props.week.map((date, i) =>
                    <CalendarDay
                        key={i}
                        date={date}
                        holidays={this.props.holidays}
                    />
                )}
            </Row>
        );
    }
}

CalendarWeek.propTypes = {
    week: PropTypes.arrayOf(
        PropTypes.instanceOf(Date)
    ),
    holidays: PropTypes.arrayOf(
        PropTypes.instanceOf(Date)
    )
}

export default CalendarWeek;