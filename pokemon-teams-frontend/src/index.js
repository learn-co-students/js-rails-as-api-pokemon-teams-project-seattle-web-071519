const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", main)
let trainers_list = document.getElementById("trainers-list")

function main(e){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => makeTrainers(json))

    

}

function makeTrainers(json){
    for (i=0; i<json.length; i++){
        let div = document.createElement("div")
        div.setAttribute("class","card")
        div.setAttribute("data-id", json[i].id)
        let p = document.createElement("p")
        p.textContent = json[i].name
        let button = document.createElement("button")
        button.addEventListener("click", catchPokemon)
        button.setAttribute("trainer_id", json[i].id)
        button.textContent = "Catch Pokemon"
        p.appendChild(button)
        div.appendChild(p)
        trainers_list.appendChild(div)
        let ul = document.createElement("ul")
        div.appendChild(ul)
        fetch(TRAINERS_URL+`/${json[i].id}`)
        .then(response => response.json())
        .then(json => addPokemon(json, ul))


        
    }
}

function addPokemon(json, ul){
    console.log(json)
    if (!!json[0].alert){
        alert(json[0].alert)
    } else {
        for (i=0; i<json.length; i++){
            let li = document.createElement("li")
            li.textContent = `${json[i].nickname} (${json[i].species})`
            let button = document.createElement("button")
            button.setAttribute("class","release")
            button.setAttribute("data-pokemon-id",json[i].id)
            button.innerText = "Release"
            button.addEventListener("click", releasePokemon)
            li.appendChild(button)
            ul.appendChild(li)

    }
    }
}

function releasePokemon(e){
    let pokemon_id = e.target.getAttribute("data-pokemon-id")
    console.log(pokemon_id)
    fetch(POKEMONS_URL+`/${pokemon_id}`, {method:'delete'})
    let li = e.target.parentElement
    li.parentElement.removeChild(li)
}

function catchPokemon(e){
    
    let ul = e.target.parentElement.parentElement.querySelector("ul")
    console.log(ul)
    let paramsObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            trainer_id: `${e.target.getAttribute("trainer_id")}`
            // nickname:
            // species:
        })
    }
    fetch(POKEMONS_URL, paramsObject)
    .then(response => response.json())
    .then(json => addPokemon([json], ul))
}