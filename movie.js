const API_URL = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
        const moviesContainer = document.getElementById("moviesContainer");
        const seeMoreButton = document.getElementById("seeMoreButton");

        let allMovies = []; // To store all movies fetched
        let visibleCount = 5; // Initially show 5 movies

        // Fetch movies from TMDB API
        async function fetchMovies() {
            try {
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzNjYWVhZmVkNDI5NjU4NmQxNGZiOTI3OWQxNjM1NSIsIm5iZiI6MTczNDA3MTAzNS4wMzAwMDAyLCJzdWIiOiI2NzViZDJmYWY5MzJkYzc3MTYyNmQzMDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jL_Dfqc_04vq-5XnmGnWfyDtOwHeCr5QEQC0QEveCw8",
                        "accept": "application/json"
                    }
                });

                const data = await response.json();
                allMovies = data.results; // Save all movies in a variable
                displayMovies();
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        // Display movies dynamically
        function displayMovies() {
            moviesContainer.innerHTML = ""; // Clear container

            // Display only the movies up to the current visible count
            const moviesToShow = allMovies.slice(0, visibleCount);
            moviesToShow.forEach(movie => {
                const { title, poster_path } = movie;
                const movieCard = document.createElement("div");
                movieCard.classList.add("col-md-2", "movie-card");

                movieCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
                    <div class="movie-title">${title}</div>
                `;
                moviesContainer.appendChild(movieCard);
            });

            // Hide the button after showing all movies
            if (visibleCount >= allMovies.length) {
                seeMoreButton.style.display = "none";
            }
        }

        // Event listener for "See More" button
        seeMoreButton.addEventListener("click", () => {
            visibleCount = 20; // Increase the visible count to 20
            displayMovies();   // Re-render movies
        });

        // Fetch movies on page load
        fetchMovies();

        // end of the upcoming movies 


        const POPULAR_MOVIES_API = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
        const filmGallery = document.getElementById("filmGallery");
        const loadMoreBtn = document.getElementById("loadMoreBtn");

        let moviesList = []; // To store fetched movies
        let maxVisibleMovies = 5; // Show 5 movies initially

        // Fetch the popular movies
        async function fetchPopularFilms() {
            try {
                const response = await fetch(POPULAR_MOVIES_API, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzNjYWVhZmVkNDI5NjU4NmQxNGZiOTI3OWQxNjM1NSIsIm5iZiI6MTczNDA3MTAzNS4wMzAwMDAyLCJzdWIiOiI2NzViZDJmYWY5MzJkYzc3MTYyNmQzMDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jL_Dfqc_04vq-5XnmGnWfyDtOwHeCr5QEQC0QEveCw8",
                        accept: "application/json"
                    }
                });

                const result = await response.json();
                moviesList = result.results; // Store all movie data
                renderFilms();
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        }

        // Render movies on the page
        function renderFilms() {
            filmGallery.innerHTML = ""; // Clear previous content

            // Display movies up to the current maxVisibleMovies count
            const visibleFilms = moviesList.slice(0, maxVisibleMovies);
            visibleFilms.forEach(movie => {
                const { title, poster_path } = movie;

                const filmCard = document.createElement("div");
                filmCard.classList.add("col-md-2", "film-card");

                filmCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
                    <div class="film-title">${title}</div>
                `;
                filmGallery.appendChild(filmCard);
            });

            // Hide the "Load More" button if all movies are displayed
            if (maxVisibleMovies >= moviesList.length) {
                loadMoreBtn.style.display = "none";
            }
        }

        // "Load More" button functionality
        loadMoreBtn.addEventListener("click", () => {
            maxVisibleMovies = 20; // Increase visible movie count to 20
            renderFilms(); // Re-render movies
        });

        // Fetch movies when the page loads
        fetchPopularFilms();