const apiKey = "48d33f13";
const apiUrl = "https://www.omdbapi.com/";

// Variable para almacenar el temporizador de la búsqueda automática
let searchTimer;

// Función que se activa cada vez que hay un cambio en el cuadro de búsqueda.
function handleSearchInput() {
    // Cancelar el temporizador existente si existe
    clearTimeout(searchTimer);

    const searchTerm = document.getElementById("search-input").value;

    // Lanzar la búsqueda automáticamente después de 300 milisegundos (ajustable)
    searchTimer = setTimeout(() => {
        searchMovies(searchTerm);
    }, 300);
}

// Función que toma "searchTerm" como parámetro en lugar de obtenerlo directamente del DOM.
//  Esto permite que la búsqueda se inicie automáticamente con un término de búsqueda específico.
function searchMovies(searchTerm) {
    if (searchTerm.length >= 3) {
        const url = `${apiUrl}?apikey=${apiKey}&s=${searchTerm}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayResults(data.Search))
            .catch(error => console.error("Error fetching data:", error));
    }
}

// Otro cambio: pasa searchTerm como parámetro para evitar acceder al DOM directamente
function displayResults(results) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "";

    results.forEach(movie => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        movieItem.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p>${movie.Title} (${movie.Year})</p>
        `;
        movieItem.addEventListener("click", () => showMovieDetail(movie.imdbID));
        resultsContainer.appendChild(movieItem);
    });
}

function showMovieDetail(movieId) {
    const url = `${apiUrl}?apikey=${apiKey}&i=${movieId}`;
    fetch(url)
        .then(response => response.json())
        .then(movie => displayMovieDetail(movie))
        .catch(error => console.error("Error fetching movie details:", error));
}

function displayMovieDetail(movie) {
    const detailContainer = document.getElementById("detail-container");
    detailContainer.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actores:</strong> ${movie.Actors}</p>
        <p><strong>Sinopsis:</strong> ${movie.Plot}</p>
    `;

    // Ocultar el contenedor de resultados y mostrar el contenedor de detalles
    document.getElementById("results-container").style.display = "none";
    detailContainer.style.display = "block";
}

// Inicializar con algunas películas predeterminadas
// searchMovies(); // Comentado para que no se realice la búsqueda inicial

// Asociar la función handleSearchInput al evento de entrada en el cuadro de búsqueda
document.getElementById("search-input").addEventListener("input", handleSearchInput);

