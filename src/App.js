// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Container, Row, Col, } from 'react-bootstrap'
import Controller from './components/Controller'
import SessionBreakLength from './components/SessionBreakLength'
import Timer from './components/Timer'

import './styles/style.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      isSession: true, // true Session , false Break
      intervalId: null, // ID setInterval
      stopStart: false, // false pause timer ,true start ttimer
      time: {
        minute: 25,
        second: 0
      },

    }
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleTimerChange = this.handleTimerChange.bind(this);
    this.handleTimerReset = this.handleTimerReset.bind(this);
  }

  handleTimeChange = (nameState) => {
    this.setState((prevState) => ({
      time: { minute: this.state.isSession && nameState === "sessionLength" ? prevState.sessionLength : !this.state.isSession && nameState === "breakLength" ? prevState.breakLength : prevState.time.minute, second: prevState.time.minute === 0 && ((this.state.isSession && prevState.sessionLength === 1) || (!this.state.isSession && prevState.breakLength === 1)) ? prevState.time.second : 0 }
    }));
  }
  handleIncrement = (nameState, length) => {
    if (!this.state.stopStart) {
      if (length < 60) {
        this.setState((prevState) => ({
          [nameState]: prevState[nameState] + 1
        }));
        this.handleTimeChange(nameState);
      }
    }
  }
  handleDecrement = (nameState, length) => {
    if (!this.state.stopStart) {
      if (length > 1) {
        this.setState((prevState) => ({
          [nameState]: prevState[nameState] - 1
        }));
        this.handleTimeChange(nameState);
      }
    }
  }
  handleSessionBreakIncrement = (id) => {
    if (id === "break-label")
      this.handleIncrement("breakLength", this.state.breakLength);
    else {
      this.handleIncrement("sessionLength", this.state.sessionLength);

    }
  }
  handleSessionBreakDecrement = (id) => {
    if (id === "break-label")
      this.handleDecrement("breakLength", this.state.breakLength);
    else {
      this.handleDecrement("sessionLength", this.state.sessionLength);

    }
  }

  handleTimerChange = () => {
    if (this.state.time.minute === 0 && this.state.time.second === 0) {
      document.getElementsByClassName("timer-container")[0].classList.remove("danger");
      let beep = document.getElementById("beep");
      beep.currentTime = 0;
      beep.volume = 1.0;
      beep.play();
      this.setState({ isSession: !this.state.isSession });
      switch (this.state.isSession) {
        case true:
          this.setState({ time: { minute: this.state.sessionLength, second: 0 } });
          break;
        case false:
          this.setState({ time: { minute: this.state.breakLength, second: 0 } });
          break;
        default:
          console.log("nothing");
      }
    }
    else {
      switch (this.state.time.second) {
        case 0:
          this.setState({ time: { minute: this.state.time.minute - 1, second: 59 } });
          if (this.state.time.minute === 0 && this.state.time.second === 59)
            document.getElementsByClassName("timer-container")[0].classList.add("danger");
          break;
        default:
          this.setState({ time: { minute: this.state.time.minute, second: this.state.time.second - 1 } });
      }
    }
  }

  handleIntervalChnage = () => {

    switch (this.state.stopStart) {
      case false:
        this.setState({
          intervalId: setInterval(
            this.handleTimerChange
            , 1000)
        });
        break;
      case true:
        clearInterval(this.state.intervalId);
        break;
      default:
        console.log("nothing");
    }
    this.setState((prevState) => ({
      stopStart: !prevState.stopStart
    }));
  }

  handleTimerReset = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: null });
    }
    let beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      time: {
        minute: 25,
        second: 0
      },
      stopStart: false,
      isSession: true
    })
  }


  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs lg="4" >
            <h1 className='text-center mt-5 title'>25 + 5 Clock</h1>
          </Col>
        </Row>
        <Row className='justify-content-center mt-2'>
          <SessionBreakLength id={"break-label"} name={"Break Length"} value={this.state.breakLength} handleIncrement={this.handleSessionBreakIncrement}
            handleDecrement={this.handleSessionBreakDecrement}
          />
          <SessionBreakLength id={"session-label"} name={"Session Length"} value={this.state.sessionLength} handleIncrement={this.handleSessionBreakIncrement} handleDecrement={this.handleSessionBreakDecrement}
          />
        </Row>
        <Row className='justify-content-center mt-3'>
          <Timer name={this.state.isSession ? "Session" : "Break"} time={this.state.time} />
        </Row>
        <Row className='justify-content-center mt-3'>
          <Controller start={this.state.stopStart} handleTimer={this.handleIntervalChnage} handleReset={this.handleTimerReset} />
        </Row>
      </Container>)
  }
}

export default App