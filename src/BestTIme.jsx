import React from "react"
export default function BestTime(props) {
    return (
      <div className="best-time">
        <p>Best time: {props.bestTime !== null ? `${props.bestTime} seconds` : '-'}</p>
      </div>
    )
  }