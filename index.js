

document.addEventListener('DOMContentLoaded', function(){

    
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
                                    <a href="#"><button class="btn add-btn" onclick=saveToWatchList('${currentMovie.imdbID}') data-movie-id="${currentMovie.imdbID}">Add</button></a>
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
        
        let form = e.target;
        let formValue = form[0].value
        let urlEncodedSearchString = encodeURIComponent(formValue)

        axios.get("http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString)
            .then(function(response) {

                let searchObject = response.data.Search
                let updatedSearchObject = searchObject.map(function(img) {
                    if (img.Poster === 'N/A') {
                        return {
                            ...img,
                            Poster: "no_image.png"
                        }
                    } else {
                        return img;
                    }
                                        
                })

                let movieHTML = renderMovies(updatedSearchObject);
                document.getElementById("movies-container").innerHTML = movieHTML;
            })
       
    })

});

function saveToWatchList (imdbID) {
    console.log(imdbID)
    axios.get("http://www.omdbapi.com/?apikey=3430a78&i=" + imdbID)
        .then(function(response) {
            let watchlistJSON = localStorage.getItem('watchlist'); //get watchlist array-string
            let watchlist = JSON.parse(watchlistJSON); //make string an array 
    
            // if watchlist is empty, create empty array;
            if (watchlist == null) {
                watchlist = [];
            }
    
            watchlist.push(response.data)
            watchlistJSON = JSON.stringify(watchlist);
            localStorage.setItem('watchlist', watchlistJSON);
    })
    


}
