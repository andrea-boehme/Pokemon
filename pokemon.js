let currentPokemon;
let pokemons = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'pikachu'];
let pokemonAsJson = [];


async function loadPokemon(){
    for (let i = 0; i < pokemons.length; i++){
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemons[i]}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokemonAsJson.push(currentPokemon);
        renderPokemonInfo(i);  
    }  
} 


function renderPokemonInfo(i){
    document.getElementById('pokemons-container').innerHTML += `<div onclick= "select(${i})" class= "pokemons bg${i}">
                                                                      <div>${currentPokemon['name']}</div>
                                                                      <img id= "pokemons-image${i}">
                                                                </div>   
                                                                 `;                                                            
    document.getElementById('pokemons-image'+ i).src = currentPokemon['sprites']['other']['home']['front_default'];                                              
}


function select(i){
    document.getElementById('pokemons-container').classList.add('d-none');
    document.getElementById('current-pokemon').classList.remove('d-none');
    
    document.getElementById('current-pokemon').innerHTML = `<div class= "current-pokemon-bg">
                                                                   <div class= "current-pokemon bg${i}">
                                                                        <button onclick= "backToPokemons()">Back</button>
                                                                        <span>${pokemonAsJson[i]['name']}</span>
                                                                        <img id= "pokemons-image" class= "current-pokemons-image">
                            
                                                                        <div class= "info-container">
                                                                           <div class= "info-container-topics">
                                                                                <div onclick= "loadAbout(${i})" id= "about" class= "details">About</div>
                                                                                <div onclick= "loadStats(${i})" id="stats" class= "details">Base Stats</div>
                                                                                <div onclick= "loadEvolution(${i})" id="evolution" class= "details">Evolution</div>
                                                                                <div onclick= "loadMoves(${i})" id="moves" class= "details">Moves</div>   
                                                                           </div>  
                                                                           <div class= "info-container-details" id= "details-content"></div>   
                                                                        </div>
                                                            </div>
                                                            `;

    document.getElementById('pokemons-image').src = pokemonAsJson[i]['sprites']['other']['home']['front_default']; 
    loadAbout(i);
}


function loadAbout(i){
    document.getElementById('about').classList.add('underline');
    document.getElementById('stats').classList.remove('underline');
    document.getElementById('evolution').classList.remove('underline');
    document.getElementById('moves').classList.remove('underline');
    document.getElementById('details-content').innerHTML = `<table id= "details-content">
                                                                <tr>
                                                                    <td>Species:</td>
                                                                    <td>${pokemonAsJson[i]['types'][0]['type']['name']}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Weight:</td>
                                                                    <td>${(pokemonAsJson[i]['weight'])/10} kg</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Height:</td>
                                                                    <td>${(pokemonAsJson[i]['height'])/10} cm</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Abilities:</td>
                                                                    <td>${pokemonAsJson[i]['abilities'][0]['ability']['name']} ${pokemonAsJson[i]['abilities'][1]['ability']['name']}</td>
                                                                </tr>
                                                            </table> `;
                                                            
}


function loadStats(i){
    document.getElementById('stats').classList.add('underline');
    document.getElementById('about').classList.remove('underline');
    document.getElementById('moves').classList.remove('underline');
    document.getElementById('evolution').classList.remove('underline');
    
    document.getElementById('details-content').innerHTML = `<div class= "details-stats">`;
    for (let j = 0; j < 7; j++){
        document.getElementById('details-content').innerHTML += `<div>
                                                                 <table>
                                                                    <tr>
                                                                       <td>${pokemonAsJson[i]['stats'][j]['stat']['name']}:</td>
                                                                       <td>${pokemonAsJson[i]['stats'][j]['base_stat']}</td>
                                                                       <td class="progress">
                                                                          <div class="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                                                       </td>
                                                                 </table> 
                                                                 </div>    
                                                                `;
    }     
    document.getElementById('details-content').innerHTML += `</div>`;                                                   
}


function loadMoves(i){
    document.getElementById('moves').classList.add('underline');
    document.getElementById('about').classList.remove('underline');
    document.getElementById('stats').classList.remove('underline');
    document.getElementById('evolution').classList.remove('underline');
    document.getElementById('details-content').innerHTML = ``;
    for (let j = 0; j < 7; j++){
        document.getElementById('details-content').innerHTML += `<div class= "moves-details" id= "details-content">
                                                                    <div class= "moves">${pokemonAsJson[i]['moves'][j]['move']['name']}</div>
                                                                 </div>
                                                              `;
    }                                                        
}


function backToPokemons(){
    document.getElementById('pokemons-container').classList.remove('d-none');
    document.getElementById('current-pokemon').classList.add('d-none');
}
