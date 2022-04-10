import React from 'react'
import { Col } from 'react-bootstrap'

function Controller({ start, handleTimer, handleReset }) {
    return (
        <Col xs="12" sm="12" md="12" lg="12" >
            <div className='text-center control'><i id="start_stop" className={start ? "fa fa-pause" : "fa fa-play"} onClick={handleTimer}></i><i id="reset" className="fas fa-sync-alt" onClick={handleReset}></i></div>
        </Col>
    )
}

export default Controller