import React from 'react'
import { Col, Stack } from 'react-bootstrap'

function SessionBreakLength({ name, id, value, handleIncrement, handleDecrement }) {
    return (
        <Col xs="12" sm="6" md="4" lg="3" >
            <Stack gap={3}>
                <h3 id={id} className='text-center'>{name} </h3>
                <div className='text-center controller'>
                    <p>
                        <i id={id === "session-label" ? "session-decrement" : "break-decrement"} className="fas fa-arrow-down " onClick={handleDecrement.bind(null, id)} ></i></p>
                    <p>
                        <span id={id === "session-label" ? "session-length" : "break-length"}>{value}</span>
                    </p>
                    <p>
                        <i id={id === "session-label" ? "session-increment" : "break-increment"} className="fas fa-arrow-up" onClick={handleIncrement.bind(null, id)} ></i>
                    </p>
                </div>
            </Stack>
        </Col >
    )
}

export default SessionBreakLength