/* =========================
   Navigation Dialog
========================= */

function showNextPokemon() {

    if (currentPokemonIndex >= filteredPokemon.length - 1) {
        return;
    }

    currentPokemonIndex++;
    renderDialog();

}


function showPreviousPokemon() {

    if (currentPokemonIndex <= 0) {
        return;
    }

    currentPokemonIndex--;
    renderDialog();

}


/* =========================
   Tastatursteuerung
========================= */

document.addEventListener("keydown", function (event) {

    const overlay = document.getElementById("overlay");

    // Nur reagieren, wenn Dialog geöffnet ist
    if (overlay.classList.contains("d-none")) {
        return;
    }

    switch (event.key) {

        case "ArrowRight":
            showNextPokemon();
            break;

        case "ArrowLeft":
            showPreviousPokemon();
            break;

        case "Escape":
            closeDialog();
            break;
    }

});


/* =========================
   Hilfsfunktionen
========================= */

function getPokemonByIndex(index) {
    return filteredPokemon[index];
}


function getCurrentPokemon() {
    return filteredPokemon[currentPokemonIndex];
}


function isFirstPokemon() {
    return currentPokemonIndex === 0;
}


function isLastPokemon() {
    return currentPokemonIndex === filteredPokemon.length - 1;
}

/* =========================
   Dialog aktualisieren
========================= */

function renderDialog() {

    function renderDialog() {

        const pokemon = getCurrentPokemon();

        document.getElementById("dialogContent").innerHTML =
            dialogTemplate(pokemon);

        setDialogColor(pokemon);

        renderCurrentTab();

        updateNavigationButtons();
    }
}

/* =========================
   Dialogfarbe setzen
========================= */
function setDialogColor(pokemon) {

    const dialog = document.querySelector(".dialog");

    const mainType = pokemon.types[0].type.name;

    dialog.style.backgroundColor = typeColors[mainType];
}


/* =========================
   Pfeile deaktivieren
========================= */

function updateNavigationButtons() {

    const leftButton = document.querySelector(".left");
    const rightButton = document.querySelector(".right");

    leftButton.disabled = isFirstPokemon();
    rightButton.disabled = isLastPokemon();

    leftButton.style.opacity = isFirstPokemon() ? "0.3" : "1";
    rightButton.style.opacity = isLastPokemon() ? "0.3" : "1";

}


/* =========================
   Scroll zurück
========================= */

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}