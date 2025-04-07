// Toggle dark mode
const toggleButton = document.getElementById('toggleMode');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Login validation
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', () => {
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

// Signup validation
const signupButton = document.getElementById('signupButton');
signupButton.addEventListener('click', () => {
    const username = prompt('Choose a username:');
    const password = prompt('Choose a password:');

    if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Signup successful! You can now login.');
    } else {
        alert('Please fill all the fields.');
    }
});

// Subscribe button action
const subscribeButton = document.getElementById('subscribeButton');
subscribeButton.addEventListener('click', () => {
    alert('Thank you for subscribing!');
});

// starting of the corosel 


  // Carousel Data
  const carouselData = [
    {
      image: "https://images2.alphacoders.com/135/thumbbig-1358046.webp", // Replace with real paths
      title: "Unlimited movies, TV shows and more",
      subtitle: "Starts at ₹149. Cancel at any time.",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBQvWgepoCBdPG_E-TL4DwAE2Xyz33WjIZA&s",
      title: "Watch your favorites anytime",
      subtitle: "New releases, old classics, and more.",
    },
    {
      image: "https://i.ytimg.com/vi/WjNVbRJZ8i4/maxresdefault.jpg",
      title: "Greatest of All Time",
      subtitle: "Exclusive content now streaming.",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaMAH3psXHFt_zpmf9jkFldpP-fTri1tf4mg&s",
      title: "Greatest of All Time",
      subtitle: "more and more to come",
    },
    
  ];

  // Populate Carousel
  const carouselContent = document.getElementById("carousel-content");

  carouselData.forEach((item, index) => {
    const activeClass = index === 0 ? "active" : "";
    const slide = `
      <div class="carousel-item ${activeClass}">
        <img src="${item.image}" class="d-block w-100" alt="Slide ${index + 1}">
        <div class="carousel-caption">
          <h1>${item.title}</h1>
          <p>${item.subtitle}</p>
        </div>
      </div>
    `;
    carouselContent.insertAdjacentHTML("beforeend", slide);
  });

//   end of the corousel 


const API_URL = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
        const moviesContainer = document.getElementById("moviesContainer");
        const seeMoreButton = document.getElementById("seeMoreButton");

        let allMovies = []; // To store all the movies fetched
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
                allMovies = data.results; 
                displayMovies();
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

       
        function displayMovies() {
            moviesContainer.innerHTML = ""; // Clear container

            // Display only the movies up to the current visible count
            const moviesToShow = allMovies.slice(0, visibleCount);
            moviesToShow.forEach(movie => {
                const { title, poster_path } = movie;
                const movieCard = document.createElement("div");
                movieCard.classList.add("col-md-2", "movie-card");

                movieCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${poster_path}" class="img-fluid" alt="${title}">
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


        // end of the realaesas 

        const MOVIE_API = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
        const movieGrid = document.getElementById("movieGrid");
        const loadMoreBtn = document.getElementById("loadMoreBtn");

        let movieList = []; // To store all movies fetched
        let currentVisibleCount = 5; // Initially show 5 movies

        // Fetch movies from TMDB API
        async function getMovies() {
            try {
                const response = await fetch(MOVIE_API, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzNjYWVhZmVkNDI5NjU4NmQxNGZiOTI3OWQxNjM1NSIsIm5iZiI6MTczNDA3MTAzNS4wMzAwMDAyLCJzdWIiOiI2NzViZDJmYWY5MzJkYzc3MTYyNmQzMDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jL_Dfqc_04vq-5XnmGnWfyDtOwHeCr5QEQC0QEveCw8",
                        "accept": "application/json"
                    }
                });

                const data = await response.json();
                movieList = data.results; // Save all movies in a variable
                renderMovies();
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        // Render movies dynamically
        function renderMovies() {
            movieGrid.innerHTML = ""; // Clear grid

            // Display only the movies up to the current visible count
            const visibleMovies = movieList.slice(0, currentVisibleCount);
            visibleMovies.forEach(movie => {
                const { title, poster_path } = movie;
                const movieBox = document.createElement("div");
                movieBox.classList.add("col-md-2", "movie-box");

                movieBox.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
                    <div class="movie-heading">${title}</div>
                `;
                movieGrid.appendChild(movieBox);
            });

            // Hide the button after showing all movies
            if (currentVisibleCount >= movieList.length) {
                loadMoreBtn.style.display = "none";
            }
        }

        // Event listener for "See More" button
        loadMoreBtn.addEventListener("click", () => {
            currentVisibleCount = 20; // Increase the visible count to 20
            renderMovies();           // Re-render movies
        });

        // Fetch movies on page load
        getMovies();

        // en dof the top rated 

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }