// require 'faker'

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", main)

function main() {
    fetchTrainer()
}

function fetchTrainer() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => createTrainerCard(json))
}

function createTrainerCard(data) {
    let teamCardsHolder = document.querySelector("main")

    data.forEach(function(trainer) {
        let div = document.createElement("div")
        div.className = "card"
        div["data-id"] = trainer.id
        let trainerName = document.createElement("p")
        trainerName.innerText = trainer.name
        let editBtn = document.createElement("button")
        editBtn.textContent = "Edit Trainer Name"
        editBtn.addEventListener("click", editTrainerName)

        let addButton = document.createElement("button")
        addButton.innerText = "Add Pokemon"
        addButton["data-trainer-id"] = trainer.id
        addButton.addEventListener("click", getPokemon)
        let createBtn = document.createElement("button")
        createBtn.addEventListener("click", fetchPokemon)
        createBtn.innerText = "Create New Pokemon"
        let ul = document.createElement("ul")
        trainerName.appendChild(editBtn)
        div.appendChild(trainerName)
        div.appendChild(addButton)
        div.appendChild(createBtn)
        div.appendChild(ul)
        teamCardsHolder.appendChild(div)
    })
}

function editTrainerName(e) {
    let inputName = document.createElement("input")
    inputName.type = "text"
    let submitName = document.createElement("button")
    submitName.textContent = "Submit"
    submitName.addEventListener("click", updateName)
    let momP = e.target.parentElement
    momP.appendChild(inputName)
    momP.appendChild(submitName)
    e.target.style = "display: none"
}

function updateName(e) {
    let trainer_id = e.target.parentElement.parentElement["data-id"]
    // debugger
    let momP = e.target.parentElement
    let newName = e.target.parentElement.children[1].value
    // text from input field above
    // e.target.parentElement[0].style = "display: block"
    // debugger


    fetch(`http://localhost:3000/trainers/${trainer_id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: `${trainer_id}`,
            name: `${newName}`
        })
    })
    momP.innerText = newName
    momP.children[0].style = "display: block"
    momP.removeChild(e.target.parentElement.children[1])
    momP.removeChild(e.target)

}

function fetchPokemon(e) {
    let event = e
    // debugger
    let target = event.target.parentElement["data-id"]
    return fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            trainer_id: `${target}`
        })
    })
    .then(response => response.json())
    .then(json => addPokemonToTeam(json, event))   
}

function addPokemonToTeam(pokemon_data, event) {
    debugger
    createPokemonList([pokemon_data],event)
}



function getPokemon(e) {
    return fetch(POKEMONS_URL)
        .then(response => response.json())
        .then(json => createPokemonList(json, e))
}

function createPokemonList(pokemonData, event) {
    let ul = event.target.parentNode.children[3]
    // debugger
    if (ul.children.length > 5) {
        alert("You already have 6 pokemon on your team! You must release one before adding another.")
    } else {
    // debugger
    let randomPokemon = pokemonData[Math.floor(Math.random() * pokemonData.length)]
    // let ul = document.querySelector(`${trainerCard} ul`)
    let li = document.createElement("li")
    li.innerText = `${randomPokemon.nickname} (${randomPokemon.species})`
    let releaseBtn = document.createElement("button")
    releaseBtn.innerText = "Release"
    releaseBtn.className = "release"
    releaseBtn["data-pokemon-id"] = randomPokemon.id
    releaseBtn.addEventListener("click", releasePokemon)
    li.appendChild(releaseBtn)
    ul.appendChild(li)
    }
}

function releasePokemon(e) {
    let pokemon_id = e.target["data-pokemon-id"]
    // debugger
    fetch(`http://localhost:3000/pokemons/${pokemon_id}`, {
        method: "DELETE"
    })
    let ul = e.target.parentElement.parentElement
    let li = e.target.parentElement
    ul.removeChild(li)
}