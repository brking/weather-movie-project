const apiKey = '3c8e204c';

const movieForm = document.querySelector('form');

movieForm.addEventListener('submit', e => {
    e.preventDefault();

    const movie = movieForm.movie.value.trim();
    movieForm.reset();

    updateMovie(movie)
        .then(data => console.log(data))
        .catch(err => console.log(err));
})


const updateMovie = async(movie) => {
    const movieList = await getMovieList(movie);

    return movieList
}

const getMovieDetails = async (id) => {
    let output = '';
    const base = 'https://www.omdbapi.com/';
    const query = `?apikey=${apiKey}&i=${id}`

    const response = await fetch(base + query);
    const data = await response.json();

    console.log(data);
    output += `
    <div class="container mb-5 mx-auto">
        <div class="card shadow-lg rounded">
            <img src="${data.Poster}" class="time card-img-top">
            <div class="text-muted text-center details">
                <h5 class="my-3">${data.Title}</h5>
                <div class="my-1 p-1"><span class="fw-bold">Genre:</span> ${data.Genre}</div> 
                <div class="my-1 p-1"><span class="fw-bold">Released:</span> ${data.Released}</div> 
                <div class="my-1 p-1"><span class="fw-bold">Rated:</span> ${data.Rated}</div> 
                <div class="my-1 p-1"><span class="fw-bold">IMDB Rating:</span> ${data.imdbRating}</div> 
                <div class="my-1 p-1"><span class="fw-bold">Director:</span> ${data.Director}</div> 
                <div class="my-1 p-1"><span class="fw-bold">Writer:</span> ${data.Writer}</div> 
                <div class="my-1 p-1"><span class="fw-bold">Actors:</span> ${data.Actors}</div> 
                <hr>
                <div class="display-5 m-1 p-1">
                    Plot
                </div>
                    <div class="m-1">${data.Plot}</div>
            </div>
        </div>
    </div>
   `
    $("#movie-details").html(output);
}

const getMovieList = async (searchText) => {
    let output = '';
    const base = "https://www.omdbapi.com/";
    const query = `?apikey=${apiKey}&s=${searchText}`;

    const response = await fetch(base + query);
    const data = await response.json();

    data.Search.forEach((item) => {
        output += `
        <div class="col mb-5">
            <div class="well text-center">
                <img src="${item.Poster}" alt="">
                <h5>${item.Title}</h5>
                <a href="#" onclick="getMovieDetails('${item.imdbID}')" class="btn btn-primary">Movie Details</a>
            </div>
        </div>`
    });

    $("#movie-list").html(output);
}