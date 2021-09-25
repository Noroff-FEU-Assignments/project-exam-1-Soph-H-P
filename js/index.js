//Carousel-----------------
const postsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=8";
const slidingArea = document.querySelector(".sliding_area");
const titleOfCarousel = document.querySelector(".carousel_title");
const leftArrow = document.querySelector(".left_arrow");
const rightArrow = document.querySelector(".right_arrow");
const arrows = document.querySelectorAll(".arrow");

renderCarousel(fetchPosts(postsUrl), "Latest Posts");

leftArrow.addEventListener("click", (e) => {
  slidingArea.scrollLeft -= 200;
});

rightArrow.addEventListener("click", (e) => {
  slidingArea.scrollLeft += 200;
});

//Disable arrows at each end of the scroll area
slidingArea.addEventListener("scroll", (e) => {
  const distanceScrolled = e.target.scrollLeft;
  const maxScrollArea = slidingArea.scrollWidth;
  const startOfContainer = e.target.offsetWidth;
  const endOfContainer = maxScrollArea - startOfContainer;
  distanceScrolled >= endOfContainer ? (rightArrow.disabled = true) : (rightArrow.disabled = false);
  distanceScrolled <= 0 ? (leftArrow.disabled = true) : (leftArrow.disabled = false);
});
