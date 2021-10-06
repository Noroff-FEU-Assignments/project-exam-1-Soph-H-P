const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postSearchTerm = params.get("search");
const heading = document.querySelector("h1");
const postsContainer = document.querySelector(".posts_container");
const viewMoreButton = document.querySelector(".view_more_button");

const postsUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&search="${postSearchTerm}"&per_page=6`;

const renderSearchResults = async () => {
  const posts = await renderBlogPosts(fetchPosts(postsUrl));
  posts <= 0
    ? ((heading.innerHTML = ` unable to find anything matching "${postSearchTerm}"`),
      viewMoreButton.remove())
    : (heading.innerHTML += ` for "${postSearchTerm}"`);
};

renderSearchResults();

let postsToView = 6;
let offsetPosts = 0;
let viewMoreButtonUrl;
let currentCategory = "search";

viewMoreButton.addEventListener("click", fetchMorePosts);
//Carousel-----------------
const carouselPostsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=8";

renderCarousel(fetchPosts(carouselPostsUrl), "Latest Posts");
