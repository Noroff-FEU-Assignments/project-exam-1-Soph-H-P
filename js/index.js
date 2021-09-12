//Carousel-----------------
const postsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=8";
const slidingArea = document.querySelector(".sliding_area");
const titleOfCarousel = document.querySelector(".carousel_title");
const leftArrow = document.querySelector(".left_arrow");
const rightArrow = document.querySelector(".right_arrow");
const arrows = document.querySelectorAll(".arrow");

renderCarousel(fetchPosts(postsUrl), "Latest Posts");

leftArrow.addEventListener("click", () => {
  slidingArea.scrollLeft -= 200;
});

rightArrow.addEventListener("click", () => {
  slidingArea.scrollLeft += 200;
});
