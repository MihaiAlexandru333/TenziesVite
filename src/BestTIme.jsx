



export default function BestTime({ bestTime }) {
    return (
      <div className="best-time">
        <p>Best time: {bestTime !== null ? `${bestTime} seconds` : '-'}</p>
      </div>
    )
  }