const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

let allPokemon = [];
let filteredPokemon = [];


let offset = 0;
const limit = 20;

let currentPokemonIndex = 0;



async function init() {
    await loadPokemon();
}



async function loadPokemon() {

    showLoading();

    try {

        const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
        const data = await response.json();

        for (const pokemon of data.results) {

            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            allPokemon.push(pokemonData);

        }

        filteredPokemon = [...allPokemon];

        renderPokemon(filteredPokemon);

        offset += limit;

    } catch (error) {

        alert("Fehler beim Laden der Pokémon.");

    }

    hideLoading();

}



async function loadMorePokemon() {

    await loadPokemon();

}



function renderPokemon(list) {

    const container = document.getElementById("card");

    container.innerHTML = "";

    list.forEach((pokemon) => {

        container.innerHTML += pokemonCardTemplate(
            pokemon,
            allPokemon.indexOf(pokemon)
        );

    });

}



function searchPokemon() {

    const input = document
        .getElementById("search-input")
        .value
        .toLowerCase()
        .trim();

    const message = document.getElementById("not-found");

    if (input.length < 3) {

        filteredPokemon = [...allPokemon];
        renderPokemon(filteredPokemon);

        message.classList.add("d-none");

        return;

    }

    filteredPokemon = allPokemon.filter(pokemon =>

        pokemon.name.toLowerCase().includes(input)

    );

    renderPokemon(filteredPokemon);

    if (filteredPokemon.length === 0) {

        message.textContent = `"${input}" ist kein bekanntes Pokémon.`;
        message.classList.remove("d-none");

    } else {

        message.classList.add("d-none");

    }


}


function openDialog(index) {

    currentPokemonIndex = index;
    currentTab = "about";

    const overlay = document.getElementById("overlay");
    overlay.classList.remove("d-none");

    document.body.classList.add("no-scroll");

    renderDialog();
}


/* =========================
   Dialog aktualisieren
========================= */

function renderDialog() {

    const pokemon = getCurrentPokemon();

    document.getElementById("dialogContent").innerHTML =
        dialogTemplate(pokemon);

    updateNavigationButtons();

}


function closeDialog() {

    document.getElementById("overlay").classList.add("d-none");

    document.body.classList.remove("no-scroll");
}


function showLoading() {

    document.getElementById("load-more-button").disabled = true;
    document.getElementById("load-more-button").innerHTML = "Lade...";

}



function hideLoading() {

    document.getElementById("load-more-button").disabled = false;
    document.getElementById("load-more-button").innerHTML = "Mehr laden";

}