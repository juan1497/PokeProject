
const ul=document.querySelector('.pokemon');
console.log(ul)
const getPokemons= async ()=>{
    const pokemonUrl = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=150")
    const pokemonsJson = await pokemonUrl.json();
    const pokemons=pokemonsJson.results.map((pokemon,idx)=>(
        {
        name:pokemon.name,
        image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idx+1}.png`
        }
    ))
    console.log(" nombre de personajes ",pokemons)
    paintPokemon(pokemons)
}
const paintPokemon=pokemons=>{
    const pokemonsHtml=pokemons.map(
        (element)=>
        `<li><h3>${element.name}</h3>
        <img src="${element.image}" alt="${element.name}"/></li>`
    ).join('');
    ul.innerHTML=pokemonsHtml
}

getPokemons();