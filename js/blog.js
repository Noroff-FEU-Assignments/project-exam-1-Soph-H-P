const postsContainer = document.querySelector(".posts_container");
const postsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=6";
const viewMoreButton = document.querySelector(".view_more_button");
let totalNumberOfPosts;
let order = "&order=desc";
renderBlogPosts(fetchPosts(postsUrl + order));

//Filter categories buttons

const allCategoriesButton = document.querySelector("#all-categories");
let currentCategory;

allCategoriesButton.addEventListener("click", () => {
  renderBlogPosts(fetchPosts(postsUrl + order));
  currentCategory = null;
  offsetPosts = 0;
  postsToView = 6;
});

let postsToView = 6;
let offsetPosts = 0;
let viewMoreButtonUrl;

const categoryFilterButtons = document.querySelectorAll(".category_filter");
categoryFilterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    postsToView = 6;
    offsetPosts = 0;
    const categoryId = event.target.dataset.category;
    currentCategory = categoryId;
    const categoryUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&categories=${categoryId}&per_page=6`;
    renderBlogPosts(fetchPosts(categoryUrl + order));
  });
});

viewMoreButton.disabled = false;

viewMoreButton.addEventListener("click", fetchMorePosts);

//sortby functions----

const select = document.querySelector("#sort-by");

select.addEventListener("change", (e) => {
  const value = e.target.value;
  value === "oldest"
    ? (order = "&order=asc")
    : value === "alphabetical"
    ? (order = "&order=asc&orderby=title")
    : (order = "&order=desc");
  renderBlogPosts(fetchPosts(postsUrl + order));
  offsetPosts = 0;
  postsToView = 6;
});
