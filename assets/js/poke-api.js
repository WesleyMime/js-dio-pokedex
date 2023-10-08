
const pokeApi = {}

function convertPokeApiPokemonToSimplePokemon(pokeApiPokemon) {
    const pokemon = new Pokemon()
    pokemon.number = pokeApiPokemon.id
    pokemon.name = pokeApiPokemon.name

    const types = pokeApiPokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeApiPokemon.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiPokemonToDetailedPokemon(pokeApiPokemon) {
    console.log(pokeApiPokemon)

    const pokemon = new Pokemon()
    pokemon.number = pokeApiPokemon.id
    pokemon.name = pokeApiPokemon.name
    const types = pokeApiPokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeApiPokemon.sprites.other.dream_world.front_default
    pokemon.abilities = pokeApiPokemon.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.height = pokeApiPokemon.height
    pokemon.weight = pokeApiPokemon.weight
    pokemon.species = pokeApiPokemon.species.name

    names = pokeApiPokemon.stats.map((statsSlot) => statsSlot.stat.name)
    values = pokeApiPokemon.stats.map((statsSlot) => statsSlot.base_stat)

    for (let index = 0; index < names.length; index++) {
        pokemon.stats.push({ statName: names[index], statValue: values[index]});
        
    };

    return pokemon
}

pokeApi.getSimplePokemon = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiPokemonToSimplePokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getSimplePokemon))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonById = (id = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`

    return fetch(url)
        .then((response) => response.json())
        .then((pokeApiPokemon) => convertPokeApiPokemonToDetailedPokemon(pokeApiPokemon))
}
