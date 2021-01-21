import React from "react"

import axios from "axios"

import Memes from "./Memes"

/*const allSelectedMemes = []
const placeKeeper = []*/
const savedMemeAndText = []

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [],
            memeValue: 0,
            newMeme: [],
            memeKey: 0,
            memeUrl: "",
            /*allMemes: placeKeeper,*/
            topText: "",
            bottomText: "",
            selectedMemeAndText: savedMemeAndText
        }
        this.randomNumber = this.randomNumber.bind(this)
        this.selectedMemeText = this.selectedMemeText.bind(this)
        this.fillIn = this.fillIn.bind(this)
        this.editButton = this.editButton.bind(this)
        this.deleteButton = this.deleteButton.bind(this)
    }

    componentDidMount() {
        axios.get("https://api.imgflip.com/get_memes").then((response) => {
            this.setState({
                list: response.data.data.memes
            })
            /*console.log(response.data)*/
            this.randomNumber()
        })
    }

    randomNumber() {
        const total = this.state.list.length
        let random = Math.floor(Math.random() * total)

        let memeData = this.state.list
        let memePosition = this.state.memeValue
        const data = memeData[memePosition]

        this.setState({
            memeValue: random,
            newMeme: data
        })
        /*console.log(random)
        console.log(total)*/
    }

    selectedMemeText() {

        this.setState((prevState) => {

            let newMemeAndText = {
                topText: prevState.topText,
                bottomText: prevState.bottomText,
                memeKey: prevState.newMeme.id,
                memeUrl: prevState.newMeme.url
            }
            return {
                topText: "",
                bottomText: "",
                selectedMemeAndText: [...prevState.selectedMemeAndText, newMemeAndText]
            }
        })
    }

    fillIn(event) {
        const { name, value } = event.target
        this.setState({
            [name]: [value]
        })
    }

    editButton(choices, topText, bottomText, id) {
        /*console.log(choices)
        console.log(topText)
        console.log(bottomText)
        console.log(id)*/

        this.setState({
            newMeme: { url: choices, id: id },
            topText: topText,
            bottomText: bottomText
        })

        this.deleteButton(id)
    }

    /*deleteButton(id) {
        let search = this.state.selectedMemeAndText
        console.log(id)
        console.log(search)
        const index = search.findIndex(x => x.memeKey === id)
        console.log(index)

        let erasedMemeAndTextArr = search.splice(index, 1)
        console.log(erasedMemeAndTextArr)
        console.log(search)

        this.setState({
            selectedMemeAndText: search
        })
    }*/

    //Alternate Delete Method Below//

    deleteButton(id) {

        this.setState((prevState) => {
            let newArr = prevState.selectedMemeAndText.filter(function (each) {
                if (each.memeKey !== id) {
                    return true
                } else {
                    return false
                }
            })
            return {
                selectedMemeAndText: newArr
            }
        })
    }

    render() {

        let selection = this.state.selectedMemeAndText
        /*console.log(selection)*/

        const edit = this.editButton
        const remove = this.deleteButton

        const updatedData = selection.map(function (each) {
            return (
                <Memes
                    key={each.memeKey}
                    id={each.memeKey}
                    choices={each.memeUrl}
                    topText={each.topText}
                    bottomText={each.bottomText}
                    editBtn={edit}
                    deleteBtn={remove}
                />
            )
        })

        console.log(this.state.newMeme)
        let choosenMeme = this.state.newMeme.url

        return (
            <div>
                <h1>React Meme Generator</h1>
                <div className="mainInputContainer">
                    <div className="intialMemeContainer">
                        <img src={choosenMeme} height="600" width="600" />
                        <p className="topText">{this.state.topText}</p>
                        <p className="bottomText">{this.state.bottomText}</p>
                    </div>
                    <form>
                        <input
                            type="text"
                            name="topText"
                            placeHolder="Top Text"
                            value={this.state.topText}
                            onChange={this.fillIn}
                        />
                        <input
                            type="text"
                            name="bottomText"
                            placeHolder="Bottom Text"
                            value={this.state.bottomText}
                            onChange={this.fillIn}
                        />
                    </form>
                    <button onClick={this.randomNumber}>New Meme</button>
                    <button onClick={this.selectedMemeText}>Select Meme</button>
                </div>
                {updatedData}
            </div>
        )
    }
}

export default App