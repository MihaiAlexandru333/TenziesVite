



export default function Die({ value, holdDice, isHeld }) {
    const dots = [];
    for (let i = 0; i < value; i++) {
      dots.push(<div key={i} className="dot"></div>);
    }
  
    return (
      <div className={`die ${isHeld ? 'is-held' : ''}`} onClick={holdDice}>
        <div className="dots-container">{dots}</div>
      </div>
    )
  }