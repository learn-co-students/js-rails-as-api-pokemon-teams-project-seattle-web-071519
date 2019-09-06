const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", main)

function main(e) {
    fetchTrainers()
}

function fetchTrainers() {
    return fetch("http://localhost:3000/trainers")
    .then(response => response.json())
    .then(trainers => createCards(trainers))
}

function createCards(trainers){
    trainers.forEach(trainer => {

        let div= document.createElement("div");
        div.className = "card"
        div.setAttribute("data-id", trainer.id)
    
        let p= document.createElement("p")
        p.innerText= trainer.name
        div.appendChild(p)
        
        let addButton = document.createElement("button")
        addButton.setAttribute("data-trainer-id", trainer.id)
        addButton.textContent = "Add Pokemon"
        addButton.addEventListener("click", event => (addPokemon(trainer)))
        div.appendChild(addButton)
        
        let ul= document.createElement("ul")
        ul.setAttribute("id", trainer.id)
        div.appendChild(ul)
    
    
        let cards = document.getElementById("cards-div")
        cards.appendChild(div)
        // addTeam(trainer, div)
        //added an id in the HTML to point directly to main

        listPokemons(trainer)

    });
};


function listPokemons(trainer){
    let uls = document.getElementsByTagName("ul")
    let ul;
    for (let i = 0; ul == undefined; i++){
        if (uls[i].id == trainer.id){
            ul = uls[i]
        }
    }
    fetch("http://localhost:3000/pokemons")
        .then(response => response.json())
        .then(function(pokemons) {
            pokemons.forEach(pokemon => {


                if (ul.id == pokemon.trainer_id){
                let li = document.createElement("li")
                li.setAttribute('id', `li-${trainer.id}-${pokemon.id}`)
                li.innerText = pokeString(pokemon)

                let releaseButton = document.createElement("button")
                releaseButton.setAttribute("class", "release")
                releaseButton.setAttribute("data-pokemon-id", pokemon.id)
                releaseButton.textContent = "Release"
                releaseButton.addEventListener("click", event => (release(pokemon)))
                li.appendChild(releaseButton)

                ul.appendChild(li)
                }
            })
        })
}
    
function pokeString(pokemon){
    return `${pokemon.nickname} (${pokemon.species})`
}




function addPokemon(trainer){
    console.log('gotta catch em all!')
    console.log(trainer.id)
    fetch(POKEMONS_URL, {
        method: 'POST',
        body: JSON.stringify({
            trainer_id: trainer.id
        })
    })
        .then(response => response.json())
        .then(pokemon => {
            console.log(pokemon)
            let uls = document.getElementsByTagName("ul")
            let ul;
            for (let i = 0; ul == undefined; i++){
                if (uls[i].id == trainer.id){
                    ul = uls[i]
                }
            }
            let li = document.createElement("li")
            li.setAttribute('id', `li-${trainer.id}-${pokemon.id}`)
            li.innerText = pokeString(pokemon)
    
            let releaseButton = document.createElement("button")
            releaseButton.setAttribute("class", "release")
            releaseButton.setAttribute("data-pokemon-id", pokemon.id)
            releaseButton.textContent = "Release"
            releaseButton.addEventListener("click", event => (release(pokemon)))
            li.appendChild(releaseButton)
    
            ul.appendChild(li)

        })

}





function release(pokemon) {
    
    let li = document.getElementById(`li-${pokemon.trainer_id}-${pokemon.id}`)
    li.style.display = 'none'

    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: 'DELETE',
        body: JSON.stringify(pokemon)
    })
}