

$(document).ready(function(){

    function saveToWatchList (imdbID) {
        let movie = movieData.find(function(currentMovie) {
            return currentMovie.imdbID == imdbID.movieId;
        });
        
        let watchlistJSON = localStorage.getItem('watchlist'); //get watchlist array-string
        let watchlist = JSON.parse(watchlistJSON); //make string an array 

        // if watchlist is empty, create empty array;
        if (watchlist == null) {
            watchlist = [];
        }

        watchlist.push(movie)
        watchlistJSON = JSON.stringify(watchlist);
        localStorage.setItem('watchlist', watchlistJSON);
    
    }

    function clickMoviesContainer(e) {
        if (!e.target.classList.contains('add-btn')) return
        saveToWatchList(e.target.dataset);
    }

    function addEvents () {
        document.getElementById('movies-container').addEventListener('click', clickMoviesContainer)
    }

    function init () {
        addEvents()
    }

    window.addEventListener('DOMContentLoaded', init())

    
    function renderMovies(movieArray) {

        let movieHTML = movieArray.map(function(currentMovie) {
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


    document.getElementById("search-form").addEventListener("submit", function(e){
        e.preventDefault();
        // let searchString = document.getElementById("search-form").value
        let form = e.target;
        let formValue = form[0].value
        // console.dir(form[0].value);
        // console.log('this is search string', searchString)
        let urlEncodedSearchString = encodeURIComponent(formValue)

        axios.get("http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString)
            .then(function(response) {
                // console.log(response);
                let movieHTML = renderMovies(response.data.Search);
                // console.log(movieHTML)
                document.getElementById("movies-container").innerHTML = movieHTML;
            })
       
    })

});
