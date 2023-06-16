
import React from "react"

export default function TimesRolled(props) {
    return (
        <div className="times-rolled">
            <p>Number of rolls: {props.rolls}</p>
            {props.endTIme && <p>Elapsed time: {props.calculateElapsedTime()} seconds</p>}
        </div>
    )
}