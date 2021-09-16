const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postSearchTerm = params.get("search");
document.querySelector("h1").innerHTML += ` for "${postSearchTerm}"`;
const postsContainer = document.querySelector(".posts_container");
const viewMoreButton = document.querySelector(".view-more-button");

const postsUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&search="${postSearchTerm}"&per_page=6`;

const renderSearchResults = async () => {
  const posts = await renderBlogPosts(fetchPosts(postsUrl));
  console.log(posts);
  if (posts === "0") {
    postsContainer.innerHTML = `<h2 class="sorry_no_results">I am sorry I was unable to find anything that matched "${postSearchTerm}"</h2>`;
  }
};

renderSearchResults();

let postsToView = 6;
let offsetPosts = 0;
let viewMoreButtonUrl;
let currentCategory = "search";

viewMoreButton.addEventListener("click", fetchMorePosts);
//Carousel-----------------
const carouselPostsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=8";
const slidingArea = document.querySelector(".sliding_area");
const titleOfCarousel = document.querySelector(".carousel_title");
const leftArrow = document.querySelector(".left_arrow");
const rightArrow = document.querySelector(".right_arrow");
const arrows = document.querySelectorAll(".arrow");

renderCarousel(fetchPosts(carouselPostsUrl), "Latest Posts");

leftArrow.addEventListener("click", () => {
  slidingArea.scrollLeft -= 200;
});

rightArrow.addEventListener("click", () => {
  slidingArea.scrollLeft += 200;
});