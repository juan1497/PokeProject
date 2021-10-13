window.onload=()=>{
    init();
}
const init=()=>{
    buscador()
    
}
const buscador=()=>{
    document.querySelector("#btnBuscar").addEventListener('click',()=>{
        const ul=document.querySelector(".pokemon")
        let pokemon=document.querySelector("#textoPokemon").value.toLowerCase()
        if(pokemon!=""){
            const getPokemon =async (pokemon)=>{
                try{
                const pokemonUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                const pokemonJson= await pokemonUrl.json();
                let btn=document.querySelector("#ocultarBuscador")
                btn.hidden=false
                btn.addEventListener("click",()=>{
                    document.querySelector(".pokemon li").hidden=true 
                    document.querySelector("#textoPokemon").value=""
                    btn.hidden=true
                 })
                setTimeout(()=>{
                    ul.innerHTML=`
                    <li><h3>${pokemonJson.name}</h3>
                    <img src="${pokemonJson.sprites['front_default']}" alt="${pokemonJson.forms[0].name}"/>
                    <p> Altura: ${pokemonJson.height/10} m</p>
                    <p> Peso: ${pokemonJson.weight/10} Kg</p>
                    <p> ID: ${pokemonJson.id}</p></li>`
                    
                },3500)
                ul.innerHTML=`Buscando a ${pokemonJson.name} en los gimnasios mas proximos`
                ul.hidden=false
                }catch{
                    alert(`el pokemon ${pokemon.toUpperCase()} no lo hemos encontrado en ningun gimnasio`)
                    document.querySelector("#textoPokemon").value=""
                }
            }
            getPokemon(pokemon)
        }else{
            alert("Escribe el nombre de tu pokemon")
        }
    })
}
let btn =document.querySelector("#btnVer")
btn.addEventListener('click',()=>{
    const allPokemons= async(url)=>{
        const pokemonsUrl =await fetch(url);
        const pokemonsJson = await pokemonsUrl.json();
        let [,part,]= await url.split("?")
        let[offset,limit]=part.split("&")
        offset=parseInt(offset.slice(7))
        limit=parseInt(limit.slice(6))+offset
        // console.log(await pokemonsJson.next)

        getPokemons(offset,limit)

        if(pokemonsJson.previous){
            let btn=document.querySelector("#atras")
            setTimeout(()=>{
                btn.hidden=false
            },3500)
            
            btn.value=pokemonsJson.previous
            btn.addEventListener('click',()=>{
                allPokemons(btn.value)
            })
            
        }else{
            let btn=document.querySelector("#atras")
            btn.hidden=true

        }
        if (pokemonsJson.next){
            let btn=document.querySelector("#siguiente")
            setTimeout(()=>{
                btn.hidden=false
            },3500)
            
            btn.value=pokemonsJson.next
            btn.addEventListener('click',()=>{
                window.pageYOffset 
                allPokemons(btn.value)
            })

        }
    }
    let url=document.querySelector("#btnVer").value;
    allPokemons(url)
}) 
const getPokemons=async(offset,limit)=>{
    let pokemons=[]
    
    for (let index = offset; index <limit; index++) {
        if(index>=899&&inde){
            index=10001
        }
        const pokemonUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${index+1}/`)
        const pokemonJson=await pokemonUrl.json();
        pokemons.push(pokemonJson)
    }
    pokemons=pokemons.map(pokemon=>({name:pokemon.name,image:pokemon.sprites["front_default"]}))
    const pokemonsHtml=pokemons.map(
        (element)=>
        `<li><h3>${element.name}</h3>
        <img src="${element.image}" alt="${element.name}"/></li>`
    ).join('');
    setTimeout(()=>{
        document.querySelector('.pokemons').innerHTML=pokemonsHtml
          
    },3500)
    document.querySelector('.pokemons').innerHTML=`<div class="pokeball"></div>`
    let btn=document.querySelector("#ocultar")
    btn.hidden=false
    btn.addEventListener("click",()=>{
        document.querySelectorAll(".pokemons>li").forEach(e=>e.hidden=true)
        btn.hidden=true
        document.querySelector("#siguiente").hidden=true
        document.querySelector("#atras").hidden=true
    })
}






