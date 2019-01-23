import React, { Component } from 'react';
import ReactDOM from "react-dom";
import moment from "moment";
import MobileCalendar from "react-scroll-calendar";
import "react-scroll-calendar/build/react-scroll-calendar.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MobileCalendar
          minDate={moment('2019-01-14', 'YYYY-MM-DD')}
          selectedDate={moment('2019-09-23', 'YYYY-MM-DD')}
          maxDate={moment('2019-10-14', 'YYYY-MM-DD')}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);