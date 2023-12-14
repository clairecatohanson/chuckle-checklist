export const postJoke = (userJokeObject) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userJokeObject),
    }

    return fetch("http://localhost:8088/jokes", postOptions)
}

export const putJoke = (jokeObject) => {
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jokeObject),
    }

    return fetch(`http://localhost:8088/jokes/${jokeObject.id}`, putOptions)
}

export const deleteJoke = (jokeObject) => {
    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jokeObject),
    }

    return fetch(`http://localhost:8088/jokes/${jokeObject.id}`, deleteOptions)
}

export const getJokes = () => {
    return fetch("http://localhost:8088/jokes").then((response) =>
        response.json()
    )
}

export const editJoke = (jokeObject) => {
    if (jokeObject.told) {
        jokeObject.told = false
    } else {
        jokeObject.told = true
    }
    return jokeObject
}
