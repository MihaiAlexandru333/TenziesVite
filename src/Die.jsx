



export default function Die(props) {
    console.log(props)
    const {value, isHeld} = props
    const styles = {backgroundColor: props.isHeld ? "#59E391" : "white"}


    return (
        <div className="die-face" 
        style={styles}
        onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}