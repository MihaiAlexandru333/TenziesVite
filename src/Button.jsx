

export default function Button(props) {
    return (
        <div className="button-container">
            <button className="button" onClick={props.onClick}>{props.text}</button>
        </div>
    )
}