

$(document).ready(function(){

    function saveToWatchList (imdbID) {
        // console.log('saving to watch list')
        let movie = movieData.find(function(currentMovie) {
            return currentMovie.imdbID == imdbID;
        });
        
        let watchlistJSON = localStorage.getItem(watchlist);
        let watchlist = JSON.parse(watchlistJSON)
        // if (watchlist = null) {
        //     console.log('im null')
        // } else {
        //     console.log('not null')
        // }


    }

    function clickMoviesContainer(e) {
        if (!e.target.classList.contains('add-btn')) return
        // console.log(e.target.dataset)
        // console.log('~~~~~~~~~~~~~~~~')
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

           
       

            // Step 1: make it that #movies-container only exists once
            //        and is not over-written
            // Step 2: when the page load, add a single event handler on
            //         #movies-container


            // myFunction() // calling
            // myFunction // reference

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

        document.getElementById("movies-container").innerHTML = renderMovies(movieData);
    })

});
