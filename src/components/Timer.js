import React from 'react'
import { Col } from 'react-bootstrap'

function Timer({ name, time }) {
    return (
        <Col xs="12" sm="12" md="12" lg="12" >
            <div className="timer-container">
                <p id="timer-label">{name}</p>
                <p id="time-left">{time.minute >= 10 ? time.minute : "0" + time.minute}:{time.second >= 10 ? time.second : "0" + time.second}</p>
                <audio id="beep">
                    <source src="https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Electro%20and%20Synthetic/192[kb]clock_radio_alarm.wav.mp3" type="audio/mpeg" />
                </audio>
            </div>
        </Col>
    )
}

export default Timer