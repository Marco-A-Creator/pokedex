const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
};

function pokemonCardTemplate(pokemon, index) {

    return `
        <div class="card" onclick="openDialog(${index})" style="background-color:${typeColors[pokemon.types[0].type.name]}">
            <p class="pokemon-id">
                #${pokemon.id.toString().padStart(3, "0")}
            </p>

            <img
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                alt="${pokemon.name}"
            >

            <h2>${capitalizeFirstLetter(pokemon.name)}</h2>

            <div class="types">
                ${pokemon.types.map(type => `
                    <span class="type ${type.type.name}">
                        ${capitalizeFirstLetter(type.type.name)}
                    </span>
                `).join("")}
            </div>

        </div>
    `;
}



function dialogTemplate(pokemon) {

    return `
        <div class="dialog-header">

            <p class="pokemon-id">
                #${pokemon.id.toString().padStart(3, "0")}
            </p>

            <h2>${capitalizeFirstLetter(pokemon.name)}</h2>

        </div>

        <img
            src="${pokemon.sprites.other["official-artwork"].front_default}"
            alt="${pokemon.name}"
        >

        <div class="types">
            ${pokemon.types.map(type => `
                <span class="type ${type.type.name}">
                    ${capitalizeFirstLetter(type.type.name)}
                </span>
            `).join("")}
        </div>

        <div class="pokemon-info">

            <p>
                <strong>Größe:</strong>
                ${pokemon.height / 10} m
            </p>

            <p>
                <strong>Gewicht:</strong>
                ${pokemon.weight / 10} kg
            </p>

            <p>
                <strong>Fähigkeiten:</strong>
                ${pokemon.abilities
            .map(ability => capitalizeFirstLetter(ability.ability.name))
            .join(", ")}
            </p>

        </div>

        <div class="stats">

            <h3>Basiswerte</h3>

            ${pokemon.stats.map(stat => `
                <p>
                    <strong>${formatStatName(stat.stat.name)}:</strong>
                    ${stat.base_stat}
                </p>
            `).join("")}

        </div>
    `;
}



/* =========================
   Hilfsfunktionen
========================= */

function capitalizeFirstLetter(text) {

    return text.charAt(0).toUpperCase() + text.slice(1);

}



function formatStatName(stat) {

    switch (stat) {

        case "hp":
            return "HP";

        case "attack":
            return "Angriff";

        case "defense":
            return "Verteidigung";

        case "special-attack":
            return "Spezial-Angriff";

        case "special-defense":
            return "Spezial-Verteidigung";

        case "speed":
            return "Initiative";

        default:
            return stat;
    }

}