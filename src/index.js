import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { isSameDate, isDisabled } from './utils/utils';

export default class ScrollCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null
    };

    this.handleSelectedDate = this.handleSelectedDate.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
  }

  handleSelectedDate(e, value) {
    e && e.preventDefault();
    this.setSelectedDate(value);
    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
  }

  setSelectedDate(date) {
    this.setState({
      selectedDate: date
    });
  }

  componentDidMount() {
    this.setSelectedDate(this.props.selectedDate);
    let element = document.getElementById(
      moment(this.props.selectedDate, 'DD/MMM/YYYY').format('MMMM-YYYY')
    );
    if (element) {
      element.scrollIntoView();
    }
  }

  componentWillReceiveProps(props) {
    if (props.selectedDate) {
      this.setSelectedDate(props.selectedDate);
    }
  }

  render() {
    let props = {
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      selectedDate: this.state.selectedDate,
      handleSelect: this.handleSelectedDate
    };
    let className = this.props.className + ' mobile-datepicker'
    return (
      <div className={className}>
        <RenderCalendarYear {...props} />
      </div>
    );
  }
}

export const RenderCalendarYear = props => {
  let { minDate, maxDate } = props;
  let totalMonth = Math.round(maxDate.diff(minDate, 'months', true)) + 1;
  let now = moment(minDate, 'DD/MMM/YYYY');
  let elements = [];
  for (let i = 0; i < totalMonth; i++) {
    elements.push(
      <RenderMonthCard key={i} currentMonth={now.clone()} {...props} />
    );
    now = now.add(1, 'M');
  }
  return elements;
};

export const RenderMonthCard = props => {
  let now = props.currentMonth;
  return (
    <section className="month" id={now.format('MMMM-YYYY')}>
      <RenderMonthHeader date={now} />
      <RenderDayHeader />
      <RenderDays date={now} {...props} />
    </section>
  );
};

export const RenderMonthHeader = props => {
  let month = props.date.format('MMMM');
  let year = props.date.format('YYYY');
  return (
    <p className="month-title">
      <span>{year}</span>
      {month}
    </p>
  );
};

export const RenderDayHeader = () => {
  return (
    <ul className="days">
      <li key={'Sunday'}>Su</li>
      <li key={'Monday'}>Mo</li>
      <li key={'Tuesday'}>Tu</li>
      <li key={'Wednesday'}>We</li>
      <li key={'Thursday'}>Th</li>
      <li key={'Friday'}>Fr</li>
      <li key={'Saturday'}>Sa</li>
    </ul>
  );
};

export const RenderSingleDay = ({
  isActive,
  handleClick,
  currentValue,
  isDisabled
}) => {
  let className = '' + (isActive ? 'active' : '') + (isDisabled ? 'disabled' : '')
  return (
    <li
      className={className}
      key={currentValue}
      onClick={e => handleClick(e, currentValue)}
    >
      <span>{currentValue.date()}</span>
    </li>
  );
};

export const RenderDays = ({
  date,
  selectedDate,
  handleSelect,
  minDate,
  maxDate
}) => {
  let daysInMonth = date.daysInMonth();
  let startDate = date.startOf('month');
  let balanceDayCount = startDate.day();

  let renderDay = () => {
    let elements = [];
    let now = moment(date, 'DD/MMM/YYYY');
    for (let i = 1; i <= daysInMonth; i++) {
      elements.push(
        <RenderSingleDay
          isActive={isSameDate(now.clone(), selectedDate)}
          isDisabled={isDisabled(minDate, now.clone(), maxDate)}
          handleClick={handleSelect}
          currentValue={now.clone()}
        />
      );
      now = now.add(1, 'days');
    }
    return elements;
  };
  let renderUnwantedDay = balanceDayCount => {
    let elements = [];
    for (let i = 0; i < balanceDayCount; i++) {
      elements.push(<li className="visible-hidden" key={i} />);
    }
    return elements;
  };
  return (
    <ul className="date">
      {renderUnwantedDay(balanceDayCount)}
      {renderDay(selectedDate, startDate)}
    </ul>
  );
};

ScrollCalendar.propTypes = {
  minDate: PropTypes.moment,
  maxDate: PropTypes.moment,
  selectedDate: PropTypes.moment,
  onSelect: PropTypes.func
};

ScrollCalendar.defaultProps = {
  minDate: moment().add(1, 'd'),
  maxDate: moment().add(9, 'M'),
  selectedDate: null
};