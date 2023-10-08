const pokemonList = document.getElementById('pokemonList')
const pokemonDetailed = document.getElementById('pokemonDetailed')
const simpleButton = document.getElementById('simpleButton')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

loadPokemonItens(offset, limit)

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick="detailPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        let newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.innerHTML = 'END'
    } else {
        loadPokemonItens(offset, limit)
    }
})

function detailPokemon(id) {
    pokemonDetailed.innerHTML = ''
    loadMoreButton.innerHTML = '<button id="loadMoreButton" type="button" onClick="showAllPokemons()">Go Back</button>'
    pokeApi.getPokemonById(id).then((pokemon) => {
        console.log(pokemon)
        let newHtml = convertPokemonToHTML(pokemon)
        pokemonDetailed.innerHTML += newHtml
        pokemonList.innerHTML = ""
    })
}

function convertPokemonToHTML(pokemon) {
    return `
        <div class="detailedPokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ul class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ul>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                <ul class="details">
                    <br>
                    <div>Abilities
                        <li>${pokemon.abilities.join(', ')}</li>
                    </div>
                    <div>Height
                        <li>${pokemon.height}</li>
                    </div>
                    <div>Weight
                        <li>${pokemon.weight}</li>
                    </div>
                    <div>Species
                        <li>${pokemon.species}</li>
                    </div>

                    <br>
                    <div>Base Stats
                        ${pokemon.stats.map((stats) => `<li>${stats.statName} ${stats.statValue}</li>`).join('')}
                    </div>
                    <br>
                </ul>
            </div>
        </div>        
    `
}

function showAllPokemons() {
    offset -= limit
    loadMoreButton.innerHTML = '<button id="loadMoreButton" type="button">Load More</button>'
    pokemonDetailed.innerHTML = ""    
    pokemonList.innerHTML = ""
}