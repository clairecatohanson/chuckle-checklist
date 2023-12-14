import { useState, useEffect } from "react"
import "./App.css"
import {
    postJoke,
    putJoke,
    deleteJoke,
    getJokes,
    editJoke,
} from "./services/jokeService"
import stevePic from "./assets/steve.png"

export const App = () => {
    const [userInput, setUserInput] = useState("")
    const [allJokes, setAllJokes] = useState([])
    const [toldJokes, setToldJokes] = useState([])
    const [untoldJokes, setUntoldJokes] = useState([])
    const [toldCount, setToldCount] = useState(0)
    const [untoldCount, setUntoldCount] = useState(0)

    useEffect(() => {
        getJokes().then((jokesArray) => {
            setAllJokes(jokesArray)
            console.log("jokes set")
        })
    }, [])

    useEffect(() => {
        const untoldJokes = allJokes.filter((joke) => !joke.told)
        setUntoldJokes(untoldJokes)
        setUntoldCount(untoldJokes.length)
        const toldJokes = allJokes.filter((joke) => joke.told)
        setToldJokes(toldJokes)
        setToldCount(toldJokes.length)
    }, [allJokes])

    const updateAllJokes = () => {
        getJokes().then((jokes) => setAllJokes(jokes))
    }

    const makeJokeObject = (userInputString) => {
        return { text: userInputString, told: false }
    }

    return (
        <div className="app-container">
            <div className="app-heading">
                <div className="app-heading-circle">
                    <img
                        className="app-logo"
                        src={stevePic}
                        alt="Good job Steve"
                    />
                </div>
                <h1 className="app-heading-text">Chuckle Checklist</h1>
            </div>
            <h2>Add Joke</h2>
            <div className="joke-add-form">
                <input
                    className="joke-input"
                    type="text"
                    name="new-jokes"
                    value={userInput}
                    placeholder="New One Liner"
                    onChange={(event) => {
                        setUserInput(event.target.value)
                    }}
                />
                <button
                    className="joke-input-submit"
                    onClick={() => {
                        postJoke(makeJokeObject(userInput)).then(() => {
                            updateAllJokes()
                        })
                        setUserInput("")
                    }}
                >
                    Add
                </button>
            </div>
            <div className="joke-lists-container">
                <div className="joke-list-container">
                    <h2>
                        Untold
                        <span className="untold-count">{untoldCount}</span>
                    </h2>
                    <ul>
                        {untoldJokes.map((joke) => {
                            return (
                                <li className="joke-list-item" key={joke.id}>
                                    <p className="joke-list-item-text">
                                        {joke.text}
                                    </p>
                                    <button
                                        className="joke-list-action-delete"
                                        onClick={(click) => {
                                            deleteJoke(joke).then(() => {
                                                updateAllJokes()
                                            })
                                        }}
                                    >
                                        <i class="fa-regular fa-trash-can"></i>
                                    </button>
                                    <button
                                        className="joke-list-action-toggle"
                                        onClick={() => {
                                            putJoke(editJoke(joke)).then(
                                                (res) => {
                                                    updateAllJokes()
                                                }
                                            )
                                        }}
                                    >
                                        <i class="fa-solid fa-check"></i>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="joke-list-container">
                    <h2>
                        Told<span className="told-count">{toldCount}</span>
                    </h2>
                    <ul>
                        {toldJokes.map((joke) => {
                            return (
                                <li className="joke-list-item" key={joke.id}>
                                    <p className="joke-list-item-text">
                                        {joke.text}
                                    </p>
                                    <button className="joke-list-action-delete">
                                        <i class="fa-regular fa-trash-can"></i>
                                    </button>
                                    <button
                                        className="joke-list-action-toggle"
                                        onClick={() => {
                                            const editedJoke = editJoke(joke)
                                            putJoke(editedJoke).then(() => {
                                                updateAllJokes()
                                            })
                                        }}
                                    >
                                        <i class="fa-regular fa-star"></i>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
