import React from "react"

function Memes(props) {
    return (
        <div className="memesComponent">
            <div className="singleMemeContainer">
                <img src={props.choices} name={props.id} width="600" height="600" />
                <p className="topTextSingleMeme">{props.topText}</p>
                <p className="bottomTextSingleMeme">{props.bottomText}</p>
            </div>
            <button onClick={() => props.editBtn(props.choices, props.topText, props.bottomText, props.id)}>Edit</button>
            <button onClick={() => props.deleteBtn(props.id)}>Delete</button>
        </div>
    )
}

export default Memes