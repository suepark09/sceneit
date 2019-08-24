
$(document).ready(function() {
    function renderMovies(watchlist) {
        let movieHTML = watchlist.map(function(currentMovie) {
            return `
                <div>
			            <div class="card" style="width: 10rem;">
                            <img class="card-img-top" src="${currentMovie.Poster}" alt="Card image cap">
                            <div class="card-body">
                                <div class="cardtitle-area">
                                    <h5 class="movie-title">${currentMovie.Title}</h5>
                                    <div class="releasedate-container">
                                        <h6>${currentMovie.Year}</h6>
                                    </div>
                                </div>
                                <div class="btn-row">
                                    <a href="#"><button class="btn add-btn" data-movie-id="${currentMovie.imdbID}">Add</button></a>
                                </div>
                            
                            </div>
                        </div>  
                </div>
            `
        })

        return movieHTML.join(" ");
    }

    let watchlist = JSON.parse(localStorage.getItem('watchlist'))
    document.getElementById('movies-container').innerHTML = renderMovies(watchlist);

})